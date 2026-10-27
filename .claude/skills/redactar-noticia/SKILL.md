---
name: redactar-noticia
description: Redacta un artículo para el blog (Noticias) de iotfenster.com, optimizado para SEO, listo para copiar campo a campo en el CMS (ES y EN). Úsala en cuanto el usuario pida un artículo, una noticia o un post para la web, o pase material de partida (post de LinkedIn, ficha técnica, manual, nota de prensa, notas sueltas o solo un tema), aunque no diga "noticia" (p. ej. "convierte este post de LinkedIn en artículo", "haz un post sobre el EVO", "esto hay que sacarlo en el blog").
---

# Redactar un artículo para el blog

Este proyecto crea artículos para el blog de iotfenster.com, optimizados para
SEO. La mayoría parten de publicaciones de LinkedIn de IoT Fenster, pero
también pueden partir de otro material: fichas técnicas, manuales, notas,
ideas sueltas, notas de prensa o un simple tema. Amplía siempre con las fichas
técnicas y manuales de Contexto. Nunca inventes datos técnicos, cifras ni
funcionalidades: si falta algo, pregunta.

## Contexto: de dónde sale en este repositorio

"Contexto" son estos sitios; léelos de verdad antes de escribir, no de memoria:

- **Fichas técnicas y manuales**: PDF en `documentos-es/` (y `documentos-it/`).
  Se leen con `Read` y el parámetro `pages`. Busca el del producto del que
  trata el artículo (p. ej. `connect-evo-documentacion-de-funcionalidades-manual.pdf`).
- **Nombres de producto y terminología**: `src/data/taxonomy.ts` (lista de
  dispositivos con su nombre oficial: CONNECT EVO, C-WALL, C-PULSAR…). Usa
  siempre el nombre tal cual está ahí.
- **Noticias ya publicadas**: `src/data/news.ts` y lo que haya en el CMS, para
  no repetir ángulo y para enlazar entre artículos.
- **Fotos de producto**: `imagenes/dispositivos/`.
- **Enlaces internos**: las rutas válidas están en `src/lib/navigation.ts`.
  Las más útiles:
  - Dispositivo: `/{locale}/dispositivos/{id}` con id `connect-1`, `connect-2`,
    `connect-evo`, `c-pulsar`, `c-wall`, `c-wall-sky`, `c-wall-shutter`,
    `remote-witooth`, `sensor-rc33`.
  - `/{locale}/mysmartwindow` (la app), `/{locale}/ecosistemas`,
    `/{locale}/domotica-para-cerramientos`, `/{locale}/recursos`,
    `/{locale}/videos`, `/{locale}/soporte`, `/{locale}/distribuidores`,
    `/{locale}/contacto`, `/{locale}/noticias/{slug}`.
  - No inventes una URL: si no está en estas rutas o no la has comprobado, no
    la uses.

## Según el material de partida

- **Post de LinkedIn**: úsalo como gancho y tono. El artículo web debe ir
  bastante más allá: el post es corto y emocional, el artículo tiene que
  explicar, detallar y posicionar en Google.
- **Ficha técnica, manual o nota**: conviértelo en un artículo divulgativo
  orientado a beneficios para el usuario, no en una copia de las
  especificaciones.
- **Solo un tema o idea**: propón primero en 3-4 líneas el enfoque y el
  ángulo, y espera mi visto bueno antes de redactar.
- **Varias fuentes a la vez**: combínalas en un único artículo coherente.

## Antes de escribir

Define y muéstrame en una línea: palabra clave principal, 3-5 secundarias y la
intención de búsqueda (qué buscaría en Google alguien que debería encontrar
este artículo). Prioriza búsquedas reales de cliente ("persiana inteligente",
"domótica para ventanas", "sensor calidad del aire") además del nombre del
producto.

## Entrega: un bloque por campo del CMS, listo para copiar y pegar

Los campos marcados (ES+EN) se entregan en español y en inglés. Muestra cada
campo con su nombre exacto como título, en un bloque de código independiente
para poder copiarlo. El orden y los nombres son los del panel de Strapi
(Noticia).

- **slug**: único para ambos idiomas, neutro y basado en el tema o producto.
  Minúsculas, sin tildes, con guiones, 3-5 palabras, sin fechas.
  Ej.: `evo-iot-fenster`. Comprueba que no exista ya otra noticia con ese slug.
- **title** (ES+EN): máx. 60 caracteres, palabra clave principal al principio,
  atractivo para hacer clic.
- **excerpt** (ES+EN): 140-160 caracteres, resume el beneficio principal e
  incluye la palabra clave. Debe funcionar como texto de vista previa.
- **body** (ES+EN): en Markdown.
  - No repetir el título como H1: empieza con la entradilla y usa `##` y `###`
    para subtítulos.
  - 800-1.200 palabras.
  - Palabra clave principal en las primeras 100 palabras y en al menos un `##`.
  - Secundarias repartidas de forma natural, sin repetir en exceso.
  - Párrafos de 2-4 líneas, listas donde ayuden a leer.
  - Datos concretos (tamaños, conectividad, funciones) siempre de las fuentes.
  - 2-3 enlaces internos a productos o artículos de la web (de la lista de
    rutas de Contexto) con texto de enlace descriptivo, nunca "haz clic aquí".
    Se escriben relativos y **con el prefijo del idioma del propio texto**:
    `/es/dispositivos/connect-evo` en el cuerpo español y
    `/en/dispositivos/connect-evo` en el inglés (las rutas son las mismas en
    los tres idiomas; solo cambia el prefijo).
  - Sección final `## Preguntas frecuentes` con 3-5 preguntas reales de cliente
    y respuestas cortas (posiciona en Google y en buscadores con IA). En
    inglés, `## Frequently asked questions`.
  - Cierre con llamada a la acción clara.
  - **Solo Markdown básico**: `##`/`###`, listas con `-` o `1.`, **negrita**,
    *cursiva*, enlaces, `>` citas e imágenes `![alt](url)`. La web no pinta
    tablas ni HTML: no los uses. Una imagen dentro del texto solo se puede
    poner si ya está subida a la Media Library; si propones una, di cuál y
    dónde irá, y el `alt` va dentro del propio Markdown.
- **tag** (ES+EN): una sola etiqueta de esta lista fija:
  Lanzamientos / Producto / Tecnología / Casos de uso / Empresa.
  En inglés: Launches / Product / Technology / Use cases / Company.
- **postDate**: fecha que yo indique, o la de hoy (formato `AAAA-MM-DD`).
- **readingMinutes**: palabras del body ES / 200, redondeado hacia arriba.
- **gradient**: no tocar salvo que lo pida.
- **cover**: indica qué imagen recomiendas y un nombre de archivo SEO
  (ej.: `evo-iot-fenster-dispositivo-ventana.jpg`). Mejor apaisada, 1200×675
  (16:9); una foto vertical también se ve entera, pero rinde menos. El texto
  alternativo de la portada lo pone la web con el propio título del artículo,
  así que no hace falta darlo aparte (el `alt` de la Media Library no se usa
  en la página).
- **featured**: `TRUE` solo para lanzamientos de producto; `FALSE` en el resto.
- **seo** (ES+EN):
  - **metaTitle**: máx. 60 caracteres (el CMS permite 70, pero Google corta a
    partir de ~60). Palabra clave principal al principio y "| IoT Fenster" al
    final si cabe.
  - **metaDescription**: 140-155 caracteres (el CMS permite 160, pero Google
    corta antes). Palabra clave + beneficio + llamada a la acción. Distinta
    del excerpt.
  - **keywords**: 5-8 palabras clave separadas por comas, de más a menos
    importante, adaptadas a cada idioma.
  - **ogImage**: imagen para cuando se comparte el enlace en LinkedIn,
    WhatsApp, etc. Recomienda cuál usar, a 1200×630 px, con nombre de archivo
    SEO.

## Idiomas

Se entrega en español e inglés, como arriba. El sitio tiene también italiano:
si un artículo no tiene versión italiana, quien entra en italiano ve el texto
en español. No lo traduzcas por tu cuenta; si lo pido, se añade como tercer
idioma con las mismas reglas (adaptación natural, no literal).

## Estilo

Español cercano y profesional, tuteando. Sin hashtags ni emojis. Nombres de
producto y terminología según `src/data/taxonomy.ts` y las fichas de Contexto;
usa siempre el mismo nombre de producto en título, slug y body. La versión en
inglés debe ser una adaptación natural para búsquedas en inglés, no una
traducción literal: ajusta la palabra clave a cómo se busca en inglés. Usa
inglés británico.

## Comprobación final

Antes de entregar, verifica y corrige: longitudes de title, excerpt, metaTitle
y metaDescription; palabra clave presente en title, excerpt, primeras 100
palabras, un `##` y metaDescription; que no haya datos que no estén en las
fuentes; que todos los enlaces internos sean rutas reales de Contexto y lleven
el prefijo de su idioma. Indica al final, en una línea, si has cambiado algo al
verificar.

## Publicar

Esta skill **entrega los textos para copiar y pegar en el panel**; no publica
nada en el CMS por su cuenta. Si el usuario pide expresamente que lo subas tú,
sigue el procedimiento de `subir-recurso` para hablar con Strapi (script
temporal, token que da el usuario) y confirma antes de escribir en producción.

## Cuando diga "aprobado"

Entrega la versión final completa, campo a campo, en ES y EN.
