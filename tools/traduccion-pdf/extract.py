# -*- coding: utf-8 -*-
"""Extrae el texto de los PDF originales conservando posicion, fuente y color.

Dos cosas que hay que hacer bien o el resultado es basura:

1. Canva parte las frases en un span por palabra. Los spans contiguos con el
   mismo estilo se unen en SEGMENTOS, que es lo que se traduce: frases enteras.
2. Una fila de tabla es un solo "bloque" para PyMuPDF. Si no se separa por
   columnas, las tres celdas acaban pegadas en la primera. Por eso se parten
   los renglones por los huecos horizontales grandes.
"""
import glob
import json
import os
import re
import statistics
import unicodedata

import pymupdf

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'pdf-es')
OUT = os.path.join(HERE, 'extract')
os.makedirs(OUT, exist_ok=True)

LETTERS = re.compile(r'[A-Za-zÀ-ÿ]{2,}')


def same_cell(prev, nxt):
    """Decide si dos trozos seguidos son la misma frase o dos elementos.

    Con el hueco solo no basta: un texto justificado de Canva separa palabras
    casi tanto como un diseno separa dos rotulos. La pista que desempata es el
    espacio que PyMuPDF sintetiza en el texto cuando el hueco le parece una
    separacion de palabras.
    """
    gap = nxt['bbox'][0] - prev['bbox'][2]
    size = max(nxt['size'], prev['size'], 1.0)
    if gap < -1.0:                      # no van en orden de lectura
        return False
    if gap <= max(4.0, size):
        return True
    if gap > size * 2.5:
        return False
    return prev['text'].endswith(' ') or nxt['text'].startswith(' ')


def split_cells(spans):
    """Parte un renglon por los huecos que no son un espacio entre palabras."""
    cells, cur = [], []
    for s in spans:
        if cur and not same_cell(cur[-1], s):
            cells.append(cur)
            cur = []
        cur.append(s)
    if cur:
        cells.append(cur)
    return cells


def rows_of(lines, columns=()):
    """Ordena las celdas y las agrupa en filas por su linea de base.

    En un PDF de Word cada celda de una tabla es una "linea" independiente con
    la misma base, no un trozo de la de al lado. Si no se agrupan asi, una fila
    entera se toma por un parrafo y las tres celdas acaban pegadas.

    `columns` son las sangrias que se repiten por la pagina: una celda que
    empieza justo ahi es una columna de tabla, por poco hueco que la separe de
    la anterior. Es lo unico que distingue una tabla estrecha de un titular que
    Canva ha troceado palabra a palabra.
    """
    cells = [cell for spans in lines for cell in split_cells(spans)]
    cells.sort(key=lambda c: (round(c[0]['origin'][1], 1), c[0]['bbox'][0]))
    rows = []
    for cell in cells:
        y = cell[0]['origin'][1]
        near = rows and abs(rows[-1][0][0]['origin'][1] - y) <= max(1.0, cell[0]['size'] * 0.3)
        if near:
            rows[-1].append(cell)
        else:
            rows.append([cell])
    # Canva saca cada palabra como una "linea" suya: las que solo estan
    # separadas por un espacio normal se vuelven a unir, para no confundir
    # un renglon corriente con una fila de tabla.
    out = []
    for row in rows:
        row.sort(key=lambda c: c[0]['bbox'][0])   # orden de lectura dentro de la fila
        joined = [row[0]]
        for cell in row[1:]:
            at_column = any(abs(cell[0]['bbox'][0] - c) <= 2.0 for c in columns)
            if not at_column and same_cell(joined[-1][-1], cell[0]):
                joined[-1] = joined[-1] + cell
            else:
                joined.append(cell)
        out.append(joined)
    return out


def recurring_columns(blocks_rows):
    """Sangrias en las que arrancan celdas de varios bloques de la pagina.

    Tres bloques distintos empezando en la misma x es la firma de una tabla:
    cada fila es un bloque suyo y las columnas se repiten fila tras fila.
    """
    seen = {}
    for rows in blocks_rows:
        xs = {round(cell[0]['bbox'][0], 1) for row in rows for cell in row}
        for x in xs:
            seen.setdefault(x, 0)
            seen[x] += 1
    return {x for x, n in seen.items() if n >= 3}


def columns_of(rows):
    """Agrupa las celdas en columnas por solapamiento horizontal."""
    cols = []
    for cells in rows:
        for cell in cells:
            x0, x1 = cell[0]['bbox'][0], cell[-1]['bbox'][2]
            found = None
            for col in cols:
                over = min(x1, col['x1']) - max(x0, col['x0'])
                if over > 0.3 * min(x1 - x0, col['x1'] - col['x0']):
                    found = col
                    break
            if found is None:
                found = {'x0': x0, 'x1': x1, 'items': []}
                cols.append(found)
            found['x0'] = min(found['x0'], x0)
            found['x1'] = max(found['x1'], x1)
            found['items'].append(cell)
    cols.sort(key=lambda c: c['x0'])
    return [c['items'] for c in cols]


def align_of(cells):
    """Deduce la alineacion mirando como se apoyan los renglones.

    En un parrafo justificado el ultimo renglon queda corto, asi que el borde
    derecho se comprueba sin el: si no, ninguno se detectaria como justificado.
    """
    if len(cells) < 2:
        return 'left'
    x0 = [c[0]['bbox'][0] for c in cells]
    x1 = [c[-1]['bbox'][2] for c in cells]
    cx = [(a + b) / 2 for a, b in zip(x0, x1)]
    span = lambda v: max(v) - min(v)
    if len(cells) >= 3 and span(x0) <= 1.5 and span(x1[:-1]) <= 2.5:
        return 'justify'
    return min((span(x0), 'left'), (span(x1), 'right'), (span(cx), 'center'))[1]


def build_block(cells, bid):
    """Convierte una lista de celdas (una por renglon) en un bloque."""
    ys = [c[0]['origin'][1] for c in cells]
    deltas = [round(b - a, 1) for a, b in zip(ys, ys[1:]) if b - a > 0.5]
    leading = statistics.median(deltas) if deltas else 0.0

    segs = []
    for ci, cell in enumerate(cells):
        hard = ci > 0 and leading and (ys[ci] - ys[ci - 1]) > leading * 1.55
        for si, s in enumerate(cell):
            key = (s['font'], round(s['size'], 1), s['color'], s['flags'] & 0b11111)
            text = unicodedata.normalize('NFC', s['text'])
            wrapped = si == 0 and ci > 0
            gap = segs and not segs[-1]['t'].endswith(' ') and not text.startswith(' ')
            if segs and segs[-1]['k'] == key:
                prev = segs[-1]['t']
                if hard and si == 0:
                    segs[-1]['t'] = prev + '\n' + text
                    continue
                if wrapped and prev and gap:
                    prev += ' '
                segs[-1]['t'] = prev + text
            else:
                # El salto de renglon separa palabras aunque cambie el estilo:
                # se anota aparte para no tocar el texto, que es la clave con
                # la que se busca la traduccion.
                segs.append({'k': key, 't': text, 'sep': bool(wrapped and gap)})
    segments = [{'text': s['t'], 'font': s['k'][0], 'size': s['k'][1],
                 'color': s['k'][2], 'flags': s['k'][3], 'sep': s.get('sep', False)}
                for s in segs if s['t'].strip()]
    if not segments:
        return None

    rects = [[c[0]['bbox'][0], min(s['bbox'][1] for s in c),
              c[-1]['bbox'][2], max(s['bbox'][3] for s in c)] for c in cells]
    bbox = [min(r[0] for r in rects), min(r[1] for r in rects),
            max(r[2] for r in rects), max(r[3] for r in rects)]
    return {
        'id': bid,
        'bbox': bbox,
        'dir': list(cells[0][0]['dir']),
        'align': align_of(cells),
        'leading': leading,
        'origin': list(cells[0][0]['origin']),
        'nlines': len(cells),
        'rects': rects,
        'translate': bool(LETTERS.search(''.join(s['text'] for s in segments))),
        'segments': segments,
    }


def main():
    blocks = segments = 0
    uniq = set()
    for path in sorted(glob.glob(os.path.join(SRC, '*.pdf'))):
        doc = pymupdf.open(path)
        name = os.path.splitext(os.path.basename(path))[0]
        out = {'id': name, 'pages': []}
        for pno, page in enumerate(doc):
            pg = {'n': pno, 'w': page.rect.width, 'h': page.rect.height, 'blocks': []}
            bi = 0
            raw = []
            for b in page.get_text('dict')['blocks']:
                if b['type'] != 0:
                    continue
                lines = []
                for l in b['lines']:
                    spans = [dict(s, dir=list(l['dir'])) for s in l['spans'] if s['text']]
                    if spans:
                        lines.append(spans)
                if lines:
                    raw.append(lines)
            # Primera pasada solo para ver donde se repiten las sangrias.
            columns = recurring_columns([rows_of(lines) for lines in raw])
            for lines in raw:
                # columns_of devuelve una sola columna cuando los renglones se
                # apoyan unos sobre otros, que es el caso de un parrafo normal.
                # Cuando no se solapan (un indice: rotulo a la izquierda,
                # numero de pagina a la derecha) salen separados, como toca.
                groups = columns_of(rows_of(lines, columns))
                for cells in groups:
                    blk = build_block(cells, 'p%sb%s' % (pno, bi))
                    if not blk:
                        continue
                    pg['blocks'].append(blk)
                    bi += 1
                    blocks += 1
                    segments += len(blk['segments'])
                    if blk['translate']:
                        uniq.update(s['text'] for s in blk['segments']
                                    if LETTERS.search(s['text']))
            out['pages'].append(pg)
        json.dump(out, open(os.path.join(OUT, name + '.json'), 'w', encoding='utf-8'),
                  ensure_ascii=False, indent=1)
        doc.close()
    print('bloques', blocks, 'segmentos', segments)
    print('segmentos traducibles unicos', len(uniq), 'chars', sum(len(u) for u in uniq))


if __name__ == '__main__':
    main()
