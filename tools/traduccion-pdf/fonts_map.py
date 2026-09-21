# -*- coding: utf-8 -*-
"""Que fichero de fuente usar para cada fuente encontrada en los PDF.

Las tipografias de Canva (Montserrat, Lato, Open Sans) se descargan de Google
Fonts. Las de Office (Calibri, Times, Arial, Segoe UI, Georgia) se toman del
propio Windows: son las mismas que el PDF original ya lleva incrustadas, asi
que el texto ocupa exactamente lo mismo y el diseno no se mueve.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
G = os.path.join(HERE, 'fonts', 'out')
W = 'C:/Windows/Fonts'

FONTS = {
    'Montserrat-Thin': f'{G}/Montserrat-Thin.ttf',
    'Montserrat-Light': f'{G}/Montserrat-Light.ttf',
    'Montserrat-Regular': f'{G}/Montserrat-Regular.ttf',
    'Montserrat-Medium': f'{G}/Montserrat-Medium.ttf',
    'Montserrat-SemiBold': f'{G}/Montserrat-SemiBold.ttf',
    'Montserrat-Bold': f'{G}/Montserrat-Bold.ttf',
    'Montserrat-Italic': f'{G}/Montserrat-Italic.ttf',
    'Montserrat-LightItalic': f'{G}/Montserrat-LightItalic.ttf',
    'Montserrat-BoldItalic': f'{G}/Montserrat-BoldItalic.ttf',
    'Lato': f'{G}/Lato-Regular.ttf',
    'Lato-Regular': f'{G}/Lato-Regular.ttf',
    'Lato-Light': f'{G}/Lato-Light.ttf',
    'Lato-Thin': f'{G}/Lato-Thin.ttf',
    'Lato-Bold': f'{G}/Lato-Bold.ttf',
    'Lato,Bold': f'{G}/Lato-Bold.ttf',
    'Lato-Heavy': f'{G}/Lato-Heavy.ttf',
    'Lato-Black': f'{G}/Lato-Black.ttf',
    'Lato-Italic': f'{G}/Lato-Italic.ttf',
    'Lato-BoldItalic': f'{G}/Lato-BoldItalic.ttf',
    'OpenSans-Regular': f'{G}/OpenSans-Regular.ttf',
    'OpenSans-SemiBold': f'{G}/OpenSans-SemiBold.ttf',
    'OpenSans-Bold': f'{G}/OpenSans-Bold.ttf',
    'IBMPlexSansCond': f'{G}/IBMPlexSansCondensed-Regular.ttf',
    'IBMPlexSansCondensed': f'{G}/IBMPlexSansCondensed-Regular.ttf',
    'Calibri': f'{W}/calibri.ttf',
    'Calibri-Bold': f'{W}/calibrib.ttf',
    'Calibri-Italic': f'{W}/calibrii.ttf',
    'Calibri-BoldItalic': f'{W}/calibriz.ttf',
    'Calibri-Light': f'{W}/calibril.ttf',
    'TimesNewRomanPSMT': f'{W}/times.ttf',
    'TimesNewRomanPS-BoldMT': f'{W}/timesbd.ttf',
    'TimesNewRomanPS-ItalicMT': f'{W}/timesi.ttf',
    'TimesNewRomanPS-BoldItalicMT': f'{W}/timesbi.ttf',
    'ArialMT': f'{W}/arial.ttf',
    'Arial-BoldMT': f'{W}/arialbd.ttf',
    'Arial-ItalicMT': f'{W}/ariali.ttf',
    'SegoeUI': f'{W}/segoeui.ttf',
    'SegoeUI-Bold': f'{W}/segoeuib.ttf',
    'SegoeUI-Italic': f'{W}/segoeuii.ttf',
    'Georgia': f'{W}/georgia.ttf',
    'Georgia-Italic': f'{W}/georgiai.ttf',
    'Georgia-Bold': f'{W}/georgiab.ttf',
    'DejaVuSerif-Bold': f'{W}/timesbd.ttf',
    'DejaVuSerif': f'{W}/times.ttf',
}

FALLBACK = f'{W}/arial.ttf'


def font_file(name, flags=0):
    """Resuelve el nombre tal cual aparece en el PDF (con o sin prefijo de
    subconjunto tipo `BAAAAA+`) al fichero que hay que incrustar."""
    n = name.split('+')[-1]
    if n in FONTS:
        return FONTS[n]
    base = n.split(',')[0].split('-')[0]
    bold = bool(flags & 16) or 'bold' in n.lower() or 'black' in n.lower()
    ital = bool(flags & 2) or 'italic' in n.lower() or 'oblique' in n.lower()
    suffix = 'BoldItalic' if (bold and ital) else 'Bold' if bold else 'Italic' if ital else 'Regular'
    for cand in (f'{base}-{suffix}', base, f'{base}-Regular'):
        if cand in FONTS:
            return FONTS[cand]
    serif = bool(flags & 4)
    stem = 'times' if serif else 'arial'
    tail = {'BoldItalic': 'bi', 'Bold': 'bd', 'Italic': 'i', 'Regular': ''}[suffix]
    return f'{W}/{stem}{tail}.ttf'
