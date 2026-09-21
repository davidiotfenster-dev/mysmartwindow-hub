# -*- coding: utf-8 -*-
"""Fichero de trabajo para traducir: un id estable por cadena unica, agrupadas
por documento/pagina/bloque para no traducir a ciegas."""
import glob, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
LETTERS = re.compile(r'[A-Za-zÀ-ÿ]{2,}')

ids = {}
out, emitted, cur = [], set(), None
for path in sorted(glob.glob(os.path.join(HERE, 'extract', '*.json'))):
    d = json.load(open(path, encoding='utf-8'))
    for p in d['pages']:
        for b in p['blocks']:
            if not b['translate']:
                continue
            rows = []
            for s in b['segments']:
                t = s['text']
                if not LETTERS.search(t):
                    continue
                if t not in ids:
                    ids[t] = 't%04d' % len(ids)
                rows.append((ids[t], t, s['font'], s['size']))
            if not rows or all(r[0] in emitted for r in rows):
                continue
            if d['id'] != cur:
                cur = d['id']
                out.append(f'\n===== {cur}')
            out.append(f"-- {b['id']} ({b['align']})")
            for tid, t, font, size in rows:
                rep = ' REP' if tid in emitted else ''
                out.append(f"{tid}\t{font} {size}{rep}\t«{t}»")
                emitted.add(tid)

open(os.path.join(HERE, 'to-translate.txt'), 'w', encoding='utf-8').write('\n'.join(out))
json.dump({v: k for k, v in ids.items()},
          open(os.path.join(HERE, 'source-strings.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=0)
print('cadenas unicas', len(ids), 'bytes', os.path.getsize(os.path.join(HERE, 'to-translate.txt')))
