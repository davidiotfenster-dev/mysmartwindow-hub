# -*- coding: utf-8 -*-
"""Un unico PDF de revision: cada pagina, el original y el italiano al lado.

Se incrustan las paginas como vectores (no como imagen), asi que el fichero
pesa poco y se puede ampliar sin que se pixele.
"""
import glob
import os

import pymupdf

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'REVISION-es-it.pdf')
GUTTER = 18

rev = pymupdf.open()
for path in sorted(glob.glob(os.path.join(HERE, 'pdf-es', '*.pdf'))):
    name = os.path.basename(path)
    a = pymupdf.open(path)
    b = pymupdf.open(os.path.join(HERE, 'pdf-it', name))
    for i in range(a.page_count):
        src = a[i].rect
        page = rev.new_page(width=src.width * 2 + GUTTER, height=src.height + 26)
        page.insert_text((6, 16), '%s  ·  pagina %d' % (name[:-4], i + 1),
                         fontname='helv', fontsize=9, color=(0.35, 0.35, 0.35))
        page.show_pdf_page(pymupdf.Rect(0, 26, src.width, src.height + 26), a, i)
        page.show_pdf_page(pymupdf.Rect(src.width + GUTTER, 26,
                                        src.width * 2 + GUTTER, src.height + 26), b, i)
    a.close()
    b.close()
rev.save(OUT, garbage=4, deflate=True)
print(OUT, rev.page_count, 'paginas', os.path.getsize(OUT) // 1024, 'kB')
rev.close()
