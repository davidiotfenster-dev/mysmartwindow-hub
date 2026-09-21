# -*- coding: utf-8 -*-
"""Une los lotes de traduccion en translations.json.

El diccionario final va del TEXTO ORIGINAL al texto italiano, no de un
identificador: asi una reextraccion de los PDF no puede descolocar nada.
Los lotes de it/ se escribieron contra el mapa de ids `source-strings-OLD`,
que se conserva solo para traducirlos a texto.

Lo que no aparece traducido se deja tal cual: marcas, correos, direcciones
web y codigos no se tocan, y el bloque ni siquiera se recompone.
"""
import glob
import json
import os
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ids = json.load(open(os.path.join(HERE, 'source-strings-OLD.json'), encoding='utf-8'))
actual = set(json.load(open(os.path.join(HERE, 'source-strings.json'), encoding='utf-8')).values())

out, huerfanos, raros = {}, [], []
for path in sorted(glob.glob(os.path.join(HERE, 'it', '*.json'))):
    for key, value in json.load(open(path, encoding='utf-8')).items():
        es = ids.get(key)
        if es is None:
            huerfanos.append(key)
            continue
        if es in out and out[es] != value:
            print('DUPLICADO', key, file=sys.stderr)
        out[es] = value
        if any('CYRILLIC' in unicodedata.name(c, '') or 'GREEK' in unicodedata.name(c, '')
               for c in value):
            raros.append(key)

# Lotes escritos ya con el texto original como clave (los ultimos retoques).
for path in sorted(glob.glob(os.path.join(HERE, 'it-texto', '*.json'))):
    out.update(json.load(open(path, encoding='utf-8')))

json.dump(out, open(os.path.join(HERE, 'translations.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=0)

sin = sorted(actual - set(out))
caducadas = sorted(set(out) - actual)
report = ['traducidas %s / %s cadenas del catalogo actual' % (len(actual & set(out)), len(actual)),
          'ids huerfanos: %s' % huerfanos,
          'alfabetos raros: %s' % raros,
          'traducciones que ya no se usan: %s' % len(caducadas)]
report += ['--- SIN TRADUCIR (%s) ---' % len(sin)] + sin
report += ['--- CADUCADAS ---'] + caducadas
open(os.path.join(HERE, 'merge-report.txt'), 'w', encoding='utf-8').write('\n'.join(report))
for line in report[:4]:
    print(line)
