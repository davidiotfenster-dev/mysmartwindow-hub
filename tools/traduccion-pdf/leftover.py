# -*- coding: utf-8 -*-
"""Busca texto original que haya sobrevivido al borrado en la version italiana."""
import glob, json, os, re, pymupdf
HERE = os.path.dirname(os.path.abspath(__file__))
texts = json.load(open(os.path.join(HERE, 'translations.json'), encoding='utf-8'))
FLAT = re.compile(r'[^0-9A-Za-zÀ-ÿ]+')
hits = []
for path in sorted(glob.glob(os.path.join(HERE, 'extract', '*.json'))):
    data = json.load(open(path, encoding='utf-8'))
    doc = pymupdf.open(os.path.join(HERE, 'pdf-it', data['id'] + '.pdf'))
    for pg in data['pages']:
        page_text = FLAT.sub('', doc[pg['n']].get_text()).lower()
        for b in pg['blocks']:
            for s in b['segments']:
                es = s['text']
                it = texts.get(es)
                if not it or it == es:
                    continue
                flat = FLAT.sub('', es).lower()
                if len(flat) >= 20 and flat in page_text:
                    hits.append('%s p%s  %r' % (data['id'], pg['n'], es[:70]))
                    break
    doc.close()
open(os.path.join(HERE, 'leftover.txt'), 'w', encoding='utf-8').write('\n'.join(hits))
print('restos de castellano:', len(hits))
for h in hits[:20]:
    print(' ', h)
