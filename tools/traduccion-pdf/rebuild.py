# -*- coding: utf-8 -*-
"""Reconstruye cada PDF en italiano sin tocar el diseno.

Idea: se borra SOLO el texto de los parrafos que cambian (las imagenes y los
graficos vectoriales se quedan intactos) y se vuelve a componer el parrafo en
el mismo sitio, con la misma tipografia, tamano, color y alineacion. Si el
italiano no cabe, se reduce el cuerpo poco a poco antes de desbordar.
"""
import glob
import json
import os
import re
import sys

import pymupdf
from fonts_map import font_file

HERE = os.path.dirname(os.path.abspath(__file__))
GAP = 3.0          # aire minimo que se deja frente a un obstaculo
EDGE = 6.0         # margen minimo hasta el borde de la pagina
SCALES = [1.0, 0.98, 0.95, 0.92, 0.89, 0.86, 0.82, 0.78, 0.74, 0.70]

FLAT = re.compile(r'[^0-9A-Za-zÀ-ÿ]+')

_fonts = {}
_drawings = {}
_flat = {}
warnings = []


def translated_flat(texts):
    """Los originales que se han traducido, sin espacios ni puntuacion.

    Sirve para reconocer un resto de castellano aunque Canva lo haya escrito
    con los espacios descolocados.
    """
    if id(texts) not in _flat:
        _flat[id(texts)] = {FLAT.sub('', es).lower() for es, it in texts.items()
                            if it != es and len(FLAT.sub('', es)) >= 20}
    return _flat[id(texts)]


def font_of(name, flags):
    path = font_file(name, flags)
    if path not in _fonts:
        _fonts[path] = pymupdf.Font(fontfile=path)
    return _fonts[path]


def rgb(c):
    return ((c >> 16 & 255) / 255.0, (c >> 8 & 255) / 255.0, (c & 255) / 255.0)


def tokenize(segments, texts):
    """Convierte los segmentos en parrafos de palabras.

    Una palabra puede llevar varios estilos ("**Modo** normal:" es una sola
    palabra con dos trozos), asi que no se puede cortar por segmento: se corta
    por espacios reales del texto y cada trozo conserva su estilo. Asi no
    aparecen espacios donde el original no los tenia.
    """
    paras, words, pieces = [], [], []
    pending_sep = [False]

    def flush():
        if pieces:
            words.append((pending_sep[0], list(pieces)))
            del pieces[:]
            pending_sep[0] = False

    for seg in segments:
        style = (seg['font'], seg['size'], seg['color'], seg['flags'])
        body = texts.get(seg['text'], seg['text'])
        if seg.get('sep'):
            flush()
            pending_sep[0] = True
        for i, chunk in enumerate(body.split('\n')):
            if i:
                flush()
                pending_sep[0] = False
                paras.append(list(words))
                del words[:]
            for tok in re.findall(r'\s+|\S+', chunk):
                if tok.isspace():
                    flush()
                    pending_sep[0] = True
                else:
                    pieces.append((style, tok))
    flush()
    if words:
        paras.append(list(words))
    return [p for p in paras if p]


def wrap(paras, width, scale):
    """Ajuste de linea greedy.

    Cada linea sale como (palabras, ancho, ultima_del_parrafo); lo ultimo hace
    falta para no justificar el renglon final, que va corto a proposito.
    """
    lines, over = [], False
    for para in paras:
        cur, curw = [], 0.0
        for sep, pieces in para:
            ww = sum(font_of(st[0], st[3]).text_length(t, st[1] * scale) for st, t in pieces)
            head = pieces[0][0]
            sw = font_of(head[0], head[3]).text_length(' ', head[1] * scale) if (cur and sep) else 0.0
            if cur and curw + sw + ww > width + 0.05:
                lines.append((cur, curw, False))
                cur, curw, sw = [], 0.0, 0.0
            if not cur and ww > width + 0.05:
                over = True
            cur.append((pieces, sw > 0, sw, ww))
            curw += sw + ww
        if cur:
            lines.append((cur, curw, True))
    return lines, over


def container(page, me, area):
    """El recuadro de color mas ajustado que envuelve al bloque, si lo hay.

    Un rotulo sobre una pastilla de color no puede crecer mas que la pastilla:
    el recuadro no se estira, asi que el texto tiene que caber dentro.
    """
    key = (page.parent.name, page.number)
    if key not in _drawings:
        _drawings[key] = [d['rect'] for d in page.get_drawings() if d.get('fill') is not None]
    best = None
    for r in _drawings[key]:
        if r.get_area() > area * 0.4 or r.get_area() < 1:
            continue
        if r.x0 - 1 <= me.x0 and r.x1 + 1 >= me.x1 and r.y0 - 1 <= me.y0 and r.y1 + 1 >= me.y1:
            if best is None or r.get_area() < best.get_area():
                best = r
    return best


def page_limits(page, blocks, idx):
    """Hasta donde puede crecer un bloque antes de chocar con otra cosa."""
    me = pymupdf.Rect(blocks[idx]['bbox'])
    area = page.rect.width * page.rect.height
    obs = [pymupdf.Rect(b['bbox']) for j, b in enumerate(blocks) if j != idx]
    for img in page.get_images(full=True):
        for r in page.get_image_rects(img[0]):
            if r.get_area() < area * 0.4:
                obs.append(r)
    right, left, bottom = page.rect.width - EDGE, EDGE, page.rect.height - EDGE
    # Del recuadro se respeta el ancho, no el alto: si el texto necesita un
    # renglon mas se lo damos, que para eso esta el limite del bloque de abajo.
    box = container(page, me, area)
    if box is not None:
        right, left = min(right, box.x1), max(left, box.x0)
    for o in obs:
        if o.y1 > me.y0 + 1 and o.y0 < me.y1 - 1:          # se solapan en vertical
            if o.x0 >= me.x1 - 1:
                right = min(right, o.x0 - GAP)
            if o.x1 <= me.x0 + 1:
                left = max(left, o.x1 + GAP)
        if o.x1 > me.x0 + 1 and o.x0 < me.x1 - 1 and o.y0 >= me.y1 - 1:
            bottom = min(bottom, o.y0 - GAP)
    return max(left, 0.0), max(right, me.x1), max(bottom, me.y1)


def compose(page, block, texts, limits):
    """Calcula las lineas finales del bloque y donde va cada palabra.

    Un parrafo de varias lineas conserva su ancho: cambiar la medida se nota
    mas que un cuerpo un pelin menor. Solo si asi no cabe se le deja crecer
    hasta el primer obstaculo, y como ultimo recurso se reduce el cuerpo.
    """
    x0, _y0, x1, _y1 = block['bbox']
    left, right, bottom = limits
    align = block['align']
    if block['nlines'] == 1 and align == 'left':
        centre = (x0 + x1) / 2
        if abs(centre - page.rect.width / 2) < page.rect.width * 0.02:
            align = 'center'
    if align == 'center':
        c = (x0 + x1) / 2
        room = 2 * min(c - left, right - c)
    elif align == 'right':
        room = x1 - left
    else:
        room = right - x0
    own = x1 - x0
    room = max(room, own)
    paras = tokenize(block['segments'], texts)
    sizes = [s['size'] for s in block['segments']] or [11]
    base_lead = block['leading'] or max(sizes) * 1.28
    baseline = block['origin'][1]

    # Un rotulo de un solo renglon no se parte: si el italiano es mas largo se
    # reduce el cuerpo hasta que entra. Partirlo en dos lineas lo sacaria de su
    # pastilla de color o lo metaria encima de lo que tiene debajo.
    if block['nlines'] == 1 and len(paras) == 1:
        for scale in SCALES + [0.66, 0.62]:
            lines, _over = wrap(paras, 1e6, scale)
            if len(lines) == 1 and lines[0][1] <= room + 0.05:
                return lines, scale, base_lead, align, room, (x0, x1, baseline), True
        lines, _over = wrap(paras, 1e6, 0.62)
        return lines, 0.62, base_lead, align, room, (x0, x1, baseline), False

    tries = [(own, SCALES[:4]), (room, SCALES), (own, SCALES)]
    for width, scales in tries:
        for scale in scales:
            lines, over = wrap(paras, width, scale)
            lead = base_lead * (scale if scale < 1 else 1)
            deep = baseline + (len(lines) - 1) * lead + max(sizes) * scale * 0.25
            if not over and deep <= bottom:
                return lines, scale, lead, align, width, (x0, x1, baseline), True
    width = tries[-1][0]
    lines, _over = wrap(paras, width, SCALES[-1])
    return lines, SCALES[-1], base_lead * SCALES[-1], align, width, (x0, x1, baseline), False


def draw(page, writers, plan):
    lines, scale, lead, align, width, (x0, x1, baseline), _ok = plan
    for i, (line, lw, last) in enumerate(lines):
        y = baseline + i * lead
        if align == 'center':
            x = (x0 + x1) / 2 - lw / 2
        elif align == 'right':
            x = x1 - lw
        else:
            x = x0
        extra = 0.0
        if align == 'justify' and not last:
            gaps = sum(1 for p in line if p[2])
            if gaps:
                extra = max(0.0, width - lw) / gaps
        for pieces, sep, sw, _ww in line:
            x += sw + (extra if sep else 0.0)
            for style, text in pieces:
                f = font_of(style[0], style[3])
                writers.setdefault(style[2], pymupdf.TextWriter(page.rect)).append(
                    (x, y), text, font=f, fontsize=style[1] * scale)
                x += f.text_length(text, style[1] * scale)


def rebuild(doc_id, src, dst, data, texts):
    doc = pymupdf.open(src)
    changed_total = 0
    for pg in data['pages']:
        page = doc[pg['n']]
        blocks = pg['blocks']
        todo, keep = [], []
        for i, b in enumerate(blocks):
            new = ''.join(texts.get(s['text'], s['text']) for s in b['segments'])
            old = ''.join(s['text'] for s in b['segments'])
            rotated = b['dir'] != [1.0, 0.0]
            if b['translate'] and new != old and not rotated:
                todo.append(i)
            else:
                keep.append(b)
                if b['translate'] and rotated and new != old:
                    warnings.append('%s p%s girado sin traducir: %r' % (doc_id, pg['n'], old[:60]))
        if not todo:
            continue
        # El borrado se lleva cualquier glifo que toque el rectangulo, asi que
        # los bloques vecinos alcanzados se recomponen tambien (con su texto
        # original). Se repite hasta que no aparecen nuevos afectados.
        hit = set(todo)
        while True:
            zone = [pymupdf.Rect(r) + (0, 0.3, 0, -0.3) for j in hit for r in blocks[j]['rects']]
            more = {j for j, b in enumerate(blocks) if j not in hit
                    and any(pymupdf.Rect(r).intersects(z + (-0.6, -0.6, 0.6, 0.6))
                            for r in b['rects'] for z in zone)}
            if not more:
                break
            hit |= more
        repair = sorted(hit - set(todo))
        for j in repair:
            joined = ''.join(s['text'] for s in blocks[j]['segments'])
            warnings.append('%s p%s recompuesto sin traducir: %r' % (doc_id, pg['n'], joined[:50]))

        links = page.get_links()
        for j in sorted(hit):
            for r in blocks[j]['rects']:
                page.add_redact_annot(pymupdf.Rect(r) + (0, 0.3, 0, -0.3), fill=None)
        page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                              graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                              text=pymupdf.PDF_REDACT_TEXT_REMOVE)
        # Algunas paginas de Canva recortan un parrafo que en realidad sigue
        # mas alla del recuadro. Al limpiar desaparece ese recorte y asoma el
        # resto del castellano, asi que se barre antes de escribir el italiano.
        # Todo el castellano que esta pagina tenia y ya se ha sustituido, de
        # corrido: un resto puede abarcar varios parrafos a la vez.
        es_pagina = FLAT.sub('', ''.join(
            t['text'] for i in todo for t in blocks[i]['segments'])).lower()
        # Se repasa palabra a palabra: hay restos que la extraccion por
        # bloques ya no ve, pero siguen impresos y se cruzarian con el italiano.
        it_pagina = FLAT.sub('', ''.join(
            texts.get(t['text'], t['text']) for i in todo for t in blocks[i]['segments'])).lower()
        ghosts = []
        for x0, y0, x1, y1, word, *_ in page.get_text('words'):
            w = FLAT.sub('', word).lower()
            if len(w) >= 5 and w in es_pagina and w not in it_pagina:
                ghosts.append((x0, y0, x1, y1))
        if ghosts:
            warnings.append('%s p%s restos borrados: %s' % (doc_id, pg['n'], len(ghosts)))
            for r in ghosts:
                page.add_redact_annot(pymupdf.Rect(r) + (0, 0.3, 0, -0.3), fill=None)
            page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                                  graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                                  text=pymupdf.PDF_REDACT_TEXT_REMOVE)
        writers = {}
        for j in repair:
            draw(page, writers, compose(page, blocks[j], {}, page_limits(page, blocks, j)))
        for i in todo:
            b = blocks[i]
            plan = compose(page, b, texts, page_limits(page, blocks, i))
            if not plan[-1]:
                joined = ''.join(s['text'] for s in b['segments'])
                warnings.append('%s p%s no cabe al 70%%: %r' % (doc_id, pg['n'], joined[:60]))
            draw(page, writers, plan)
            changed_total += 1
        for color, tw in writers.items():
            tw.write_text(page, color=rgb(color))
        # Comprobacion final: ninguna palabra de los bloques intactos se ha
        # podido perder por el camino. Se compara palabra a palabra porque al
        # reescribir cambia el orden en que se extrae el texto de la pagina.
        after = ' '.join(page.get_text().split())
        for j, b in enumerate(blocks):
            if j in hit:
                continue
            for s in b['segments']:
                lost = [w for w in re.findall(r'\w{4,}', s['text']) if w not in after]
                if lost:
                    warnings.append('%s p%s PERDIDO %r de %r'
                                    % (doc_id, pg['n'], lost[:4], s['text'][:50]))
        for link in links:
            try:
                page.insert_link(link)
            except Exception:
                pass
    try:
        doc.subset_fonts(verbose=False)
    except Exception as exc:
        warnings.append('%s subset_fonts: %s' % (doc_id, exc))
    doc.save(dst, garbage=4, deflate=True, clean=True)
    doc.close()
    return changed_total


def main():
    texts = {}
    tpath = os.path.join(HERE, 'translations.json')
    if os.path.exists(tpath):
        texts = json.load(open(tpath, encoding='utf-8'))
    only = sys.argv[1] if len(sys.argv) > 1 else None
    out = os.path.join(HERE, 'pdf-it')
    os.makedirs(out, exist_ok=True)
    total = 0
    for path in sorted(glob.glob(os.path.join(HERE, 'extract', '*.json'))):
        data = json.load(open(path, encoding='utf-8'))
        if only and only not in data['id']:
            continue
        src = os.path.join(HERE, 'pdf-es', data['id'] + '.pdf')
        dst = os.path.join(out, data['id'] + '.pdf')
        n = rebuild(data['id'], src, dst, data, texts)
        total += n
        print('%-58s bloques=%-5s %s kB' % (data['id'], n, os.path.getsize(dst) // 1024))
    print('bloques recompuestos', total)
    if warnings:
        open(os.path.join(HERE, 'warnings.txt'), 'w', encoding='utf-8').write('\n'.join(warnings))
        print('avisos', len(warnings), '-> warnings.txt')


if __name__ == '__main__':
    main()
