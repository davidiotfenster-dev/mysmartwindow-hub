---
name: subir-recurso
description: Sube uno o varios PDF (manuales, catálogos, tarjetas resumen, fichas técnicas) al Centro de Recursos de MySmartWindow — los lee de verdad, decide categoría/tipo/dispositivo, escribe título+resumen+SEO en cada idioma a partir del contenido real, los publica en el CMS de producción y verifica que quedan bien en vivo. Úsala en cuanto el usuario pida subir, publicar o añadir un PDF/manual/catálogo al sitio o al Centro de Recursos, aunque no lo diga con esas palabras exactas (p. ej. "sube esto", "esto hay que ponerlo en la web", "añade este documento").
---

# Subir un recurso (PDF) al Centro de Recursos

Este sitio (mysmartwindow-hub) tiene un patrón ya probado para dar de alta un
documento nuevo en el CMS de producción (Strapi, en `cms.iotfenster.com`) y
publicarlo en `iotfenster.com/{locale}/recursos/{slug}`. Esta skill lo recoge
para no tener que reconstruirlo cada vez ni volver a tropezar con los mismos
fallos que ya se dieron una vez.

Lo importante no es el script en sí -eso es mecánico-, sino las dos partes
donde hace falta criterio: **leer el documento de verdad** antes de decidir
cómo se presenta, y **preguntar en vez de asumir** cuando algo no encaja.

## 1. Lee el/los PDF, no los mires por encima

Usa `Read` con el parámetro `pages` en lotes de hasta 20 páginas para los PDF
grandes. El objetivo es entender de qué dispositivo o tema trata, qué
apartados tiene y si hay algo que un título genérico no transmitiría. Un
título tipo "Documento PDF" o "Catálogo" a secas no vale — tiene que reflejar
lo que el documento cubre de verdad (p. ej. "Catálogo CONNECT MySmartWindow:
C-WALL, EVO, PULSAR y BLU-CONNECT", no solo "Catálogo").

Si vienen varios PDF que se supone son el mismo documento en distintos
idiomas, compara que el contenido coincide y **comprueba el idioma leyendo el
texto real**, nunca por el nombre del fichero. Ya pasó una vez que un fichero
con `_PT` en el nombre resultó ser portugués de verdad -eso fue lo fácil-,
pero el nombre de fichero es indicativo, no una prueba.

## 2. El sitio solo tiene tres idiomas: es, en, it

No hay portugués, ni ningún otro idioma, en ningún sitio del código ni del
CMS. Si algún PDF viene en un idioma que no es de los tres, o falta alguno de
los tres para un documento que sí debería tenerlos, **pregunta con
`AskUserQuestion` qué hacer** en vez de decidir tú:

- No subas nada en un idioma que el sitio no soporta.
- No inventes ni traduzcas a máquina un documento que solo tienes en otro
  idioma -sobre todo si toca texto legal o técnico- salvo que el usuario lo
  pida explícitamente sabiendo que es una traducción automática.
- Si falta un idioma de los tres, no pasa nada: el campo `file` es
  localizado y el sitio ya cae automáticamente al primer idioma disponible
  si uno no tiene fichero propio (`pickLocalizedMedia` en
  `src/lib/content/strapi-client.ts`). No hace falta rellenar ese hueco a
  mano, pero si el título/resumen en ese idioma sí conviene escribirlo
  (aunque el PDF no esté traducido, la ficha de la web sí puede estarlo),
  dilo y pregunta si procede.

## 3. Decide los metadatos, pero propónselos al usuario si hay duda real

Necesitas, para cada documento:

- **slug**: termina en `-manual`, `-tarjeta` o `-video` según el tipo (p. ej.
  `catalogo-connect-mysmartwindow-manual`). Es la URL pública, no se cambia
  después sin dejar un enlace roto.
- **type**: `manual` | `video` | `tarjeta`. Un PDF normal es casi siempre
  `manual`.
- **category**: uno de los slugs existentes -mira
  `src/data/taxonomy.ts` para la lista completa y sus nombres, hoy son
  `administracion`, `conectividad`, `app`, `dispositivos`, `ecosistemas`,
  `instalacion`, `soporte`, `seguridad`, `vinculacion`. Si el documento es
  general (no de un aparato concreto), `ecosistemas` suele encajar.
- **device**: el slug de un dispositivo real, o `general` si no es de uno
  concreto.
- **title** / **summary**: por idioma, del contenido real leído en el paso 1.
- **tags**: unas pocas palabras clave relevantes.

Si algo de esto no está claro por el contenido del PDF (p. ej. no sabes si es
`administracion` o `soporte`, o si merece `featured: true`), pregúntalo en
vez de adivinar - es más rápido corregir antes de publicar que después.

## 4. Escribe el SEO

Por cada idioma: `metaTitle` (máximo 70 caracteres, termina bien con
`| IoT Fenster`) y `metaDescription` (máximo 160 caracteres). Basado en el
contenido real, no una plantilla vacía tipo "Descarga este documento".

## 5. Sube con un script temporal, de un solo uso

Strapi solo permite crear ficheros nuevos por `/api/upload` -no hay forma de
"actualizar" uno existente-, y los campos que **no** son de un idioma
concreto (`category`, `device`, `type`, `hidden`, `featured`...) hay que
escribirlos en las **tres** llamadas PUT (es, en, it), no solo en la
española. Esto no es capricho: Strapi no los sincroniza solo porque el
schema los marque como "no localizado" -eso solo cambia cómo se ve en el
panel de administración-, y si un campo compartido solo se escribe en un
idioma, el día que ese idioma no sea "el más reciente" ese dato desaparece
de la web entera sin ningún aviso. Ya pasó de verdad una vez (62 de 63
recursos perdieron su categoría y el catálogo entero desapareció del
sitio), y el arreglo de fondo vive en `anyEntry()`
(`src/lib/content/strapi-client.ts`) — pero el script de subida tiene que
seguir escribiendo bien igualmente, no depender solo de ese parche.

Usa exactamente el patrón de `upsert()` que ya existe y está bien en
`scripts/seed-cms.mjs` (lee ese fichero para copiar la función tal cual, no
la reescribas de memoria). El patrón para category/device, y para subir el
propio fichero, es:

```js
// 1. Busca el documentId de la categoria y el dispositivo (son relaciones)
const catRes = await api(`/api/categories?${qs({ 'filters[slug][$eq]': 'ecosistemas', locale: 'es' })}`)
const categoryId = catRes.data[0]?.documentId
// (mismo patron con /api/devices para el dispositivo)

// 2. Crea/actualiza la ficha con upsert() (copiado de seed-cms.mjs), con
//    title/summary/seo por idioma y los campos compartidos (type, category,
//    device, tags, updatedOn...) en `shared`

// 3. Sube el PDF y enganchalo, un idioma a la vez:
const cuerpo = new FormData()
cuerpo.append('files', new Blob([contenido], { type: 'application/pdf' }), nombreFichero)
const [subida] = await api('/api/upload', { method: 'POST', body: cuerpo })
await api(`/api/resources/${documentId}?locale=${locale}`, {
  method: 'PUT',
  body: JSON.stringify({ data: { file: subida.id } }),
})
```

Detalles prácticos:
- Crea el script en `scripts/_algo-temp.mjs` (el guion bajo lo marca como
  temporal), ejecútalo con
  `STRAPI_URL=https://cms.iotfenster.com STRAPI_API_TOKEN=<token> node scripts/_algo-temp.mjs`,
  y **bórralo en cuanto termine** -no se deja como parte del repo, es de un
  solo uso-.
- El token lo tiene que dar el usuario (variable de entorno
  `STRAPI_API_TOKEN`); si no lo tienes en la conversación, pídeselo.
- No es necesario tocar `src/data/resources.ts` ni ningún fichero del
  repositorio para esto: el recurso vive en el CMS, igual que si alguien lo
  diera de alta a mano desde el panel.

## 6. Verifica en vivo, no solo que el script no dio error

Para cada idioma subido, pide la página publicada
(`https://www.iotfenster.com/{locale}/recursos/{slug}`) y comprueba:
- El título de la pestaña coincide con el `metaTitle` que escribiste.
- El enlace de descarga responde `200` con `content-type: application/pdf`
  (una petición `HEAD` o `fetch` al href del botón "Descargar"/"Abrir"
  basta).
- El idioma mostrado es el que toca (compara la URL del PDF entre locales:
  cada idioma con fichero propio debe tener un nombre de archivo distinto
  en `/api/media/uploads/...`; si dos idiomas comparten el mismo nombre, es
  que cayeron al mismo fallback, que puede ser lo esperado si de verdad
  falta ese idioma).

## 7. Cierra con un resumen claro

Dile al usuario, sin dar nada por hecho: qué se subió, en qué idiomas tiene
PDF propio y en cuáles cae a un idioma de respaldo, la categoría y tipo
elegidos, y que lo has comprobado en vivo (no solo que el script terminó
sin error).

## Reglas que no cambian nunca

- **Nunca borres nada del CMS sin permiso explícito del usuario para ESA
  acción concreta**, aunque el usuario ya te haya autorizado a borrar en
  otro contexto antes. Es una regla del proyecto, no de esta skill en
  particular.
- **Nunca inventes contenido.** Si al PDF le falta algo que necesitas para
  un campo, pregunta.
- El título y el resumen reflejan el contenido real visto al leer el
  documento -nunca una plantilla genérica.
