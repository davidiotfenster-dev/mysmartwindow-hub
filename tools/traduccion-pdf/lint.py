# -*- coding: utf-8 -*-
"""Busca sintomas de que dos elementos distintos se han pegado en un bloque.

Una minuscula seguida de mayuscula sin espacio, o un numero pegado a una
palabra, casi siempre significa que se han unido dos celdas que no debian.
"""
import glob, json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
GLUE = re.compile(r'[a-zà-ÿ)][A-ZÀ-Þ]|\d[A-ZÀ-Þ][a-zà-ÿ]')
hits = []
for p in sorted(glob.glob(os.path.join(HERE, 'extract', '*.json'))):
    d = json.load(open(p, encoding='utf-8'))
    for pg in d['pages']:
        for b in pg['blocks']:
            t = ''.join(s['text'] for s in b['segments'])
            for m in GLUE.finditer(t):
                frag = t[max(0, m.start() - 22):m.end() + 22]
                hits.append('%s p%s %s' % (d['id'], pg['n'], frag))
open(os.path.join(HERE, 'lint.txt'), 'w', encoding='utf-8').write('\n'.join(hits))
print('sospechas', len(hits))
