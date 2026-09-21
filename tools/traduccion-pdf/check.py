# -*- coding: utf-8 -*-
"""Compara pagina a pagina el original y la version italiana.

Si a una pagina le falta texto respecto al original es que algo se ha quedado
por el camino; si le sobra mucho, es que algo se ha duplicado.
"""
import glob, os, re, pymupdf
HERE = os.path.dirname(os.path.abspath(__file__))
WORD = re.compile(r'\w+')
bad = []
tot_es = tot_it = 0
for p in sorted(glob.glob(os.path.join(HERE, 'pdf-es', '*.pdf'))):
    name = os.path.basename(p)
    a = pymupdf.open(p)
    b = pymupdf.open(os.path.join(HERE, 'pdf-it', name))
    for i in range(a.page_count):
        na = len(WORD.findall(a[i].get_text()))
        nb = len(WORD.findall(b[i].get_text()))
        tot_es += na
        tot_it += nb
        if na and (nb < na * 0.75 or nb > na * 1.35):
            bad.append('%s p%s  es=%s it=%s' % (name, i, na, nb))
    a.close(); b.close()
print('palabras es=%s it=%s (%.1f%%)' % (tot_es, tot_it, 100.0 * tot_it / tot_es))
print('paginas con desviacion:', len(bad))
open(os.path.join(HERE, 'check.txt'), 'w', encoding='utf-8').write('\n'.join(bad))
for line in bad[:15]:
    print(' ', line)
