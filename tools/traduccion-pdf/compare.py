# -*- coding: utf-8 -*-
"""Genera una imagen con el original a la izquierda y la version italiana a la
derecha, para revisar de un vistazo que el diseno no se ha movido."""
import os, sys
import pymupdf

HERE = os.path.dirname(os.path.abspath(__file__))


def build(doc_id, pages, out, dpi=80):
    a = pymupdf.open(os.path.join(HERE, 'pdf-es', doc_id + '.pdf'))
    b = pymupdf.open(os.path.join(HERE, 'pdf-it', doc_id + '.pdf'))
    tiles = []
    for n in pages:
        tiles.append((a[n].get_pixmap(dpi=dpi), b[n].get_pixmap(dpi=dpi)))
    w = max(t[0].width + t[1].width for t in tiles) + 24
    h = sum(max(t[0].height, t[1].height) + 12 for t in tiles)
    canvas = pymupdf.Pixmap(pymupdf.csRGB, pymupdf.IRect(0, 0, w, h), False)
    canvas.clear_with(220)
    y = 0
    for pa, pb in tiles:
        pa.set_origin(0, y); canvas.copy(pa, pa.irect)
        pb.set_origin(pa.width + 20, y); canvas.copy(pb, pb.irect)
        y += max(pa.height, pb.height) + 12
    canvas.save(out)
    print(out, canvas.width, canvas.height)


if __name__ == '__main__':
    doc = sys.argv[1]
    pages = [int(x) for x in sys.argv[2].split(',')]
    build(doc, pages, os.path.join(HERE, 'png', sys.argv[3]))
