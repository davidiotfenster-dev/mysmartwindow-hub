# Guía del panel de contenidos (Strapi)

Para quien va a publicar y traducir contenido del día a día, sin tocar código.
Si buscas la parte técnica (cómo se conecta con el sitio, cómo desplegarlo),
eso está en [`README.md`](README.md) y en [`../DEPLOY.md`](../DEPLOY.md).

## Entrar

`https://cms.tudominio.com/admin` (o `http://localhost:1337/admin` en local)
— usuario y contraseña que os haya dado quien montó el sitio.

## El panel, por partes

A la izquierda tienes el menú principal:

- **Content Manager**: aquí se edita todo — el catálogo de recursos, dispositivos,
  noticias, etc. Es donde vas a pasar el 90% del tiempo.
- **Media Library**: la biblioteca de imágenes y ficheros subidos.
- **Marketplace / Plugins**: no toques esto salvo que sepas lo que haces.
- **Settings**: idiomas, usuarios, tokens de API — la parte más "técnica"; el
  detalle está más abajo, en *Cosas que no deberías cambiar*.

Dentro de **Content Manager**, en la barra lateral izquierda, hay una entrada
por cada tipo de contenido. Es lo que se explica a continuación, una por una.

---

## Recursos (`Resource`)

Los manuales, vídeos y tarjetas del centro de recursos. El más grande: 63 en
el catálogo de partida.

| Campo | Qué es | ¿Traducible? |
| --- | --- | --- |
| `type` | manual / video / tarjeta | No |
| `category` | a qué categoría pertenece (relación) | No |
| `device` | a qué dispositivo pertenece (relación, o "general" si aplica a todos) | No |
| `title` | el título que se ve en la web | **Sí** |
| `summary` | resumen corto, bajo el título | **Sí** |
| `url` | enlace al PDF (solo manuales/tarjetas) | No |
| `youtubeId` | el ID del vídeo de YouTube (solo vídeos) — ver más abajo | No |
| `featured` | si aparece destacado en la portada | No |
| `tags` | palabras clave extra para el buscador interno | No |
| `seo` | ver el apartado *SEO*, más abajo | Sí (dentro del bloque) |

**El `youtubeId` no es la URL completa.** Es solo el código que va después de
`v=` en la URL de YouTube. Por ejemplo, en
`https://www.youtube.com/watch?v=tZ1aSM4zxdI` el ID es `tZ1aSM4zxdI`.

**¿Los vídeos que subo a YouTube aparecen solos?** Depende de qué quieras
decir con "aparecer":

- **En la página `/videos`, sección "Últimos del canal": sí, automático.**
  Cualquier vídeo nuevo del canal de YouTube aparece ahí sin tocar nada, en
  cuanto se sincroniza (cada hora).
- **Como ficha propia dentro del catálogo de recursos (con su categoría, su
  dispositivo, su título traducido a los tres idiomas): no, eso es manual.**
  Es a propósito — es lo que hace que el título y la categoría estén bien
  cuidados en vez de ser lo que sea que pusiste de nombre al vídeo en
  YouTube. Para categorizarlo: crea un `Resource` nuevo, `type: video`, pega
  el `youtubeId`, rellena título/categoría/dispositivo, y publica. Tarda un
  minuto.

Una vez categorizado, la miniatura, la duración y las visitas **sí** se
sincronizan solas con YouTube — de eso no hay que ocuparse nunca.

---

## Dispositivos (`Device`)

Los 9 aparatos del ecosistema (CONNECT-2, C-WALL...).

| Campo | Qué es | ¿Traducible? |
| --- | --- | --- |
| `name` | el nombre del dispositivo (p.ej. "CONNECT-2") | No |
| `tagline` | frase corta bajo el nombre | **Sí** |
| `description` | el párrafo de descripción | **Sí** |
| `features` | lista de características (cada línea es traducible) | **Sí** |
| `url` | enlace a la ficha de producto externa, si existe | No |
| `photo` | foto de portada, la que abre el carrete | No |
| `gallery` | más fotos del dispositivo, en el orden que quieras | No |
| `videos` | vídeos propios del dispositivo (no los de YouTube) | No |
| `seo` | ver *SEO* | Sí |

Para añadir o quitar una característica de la lista `features`, usa los
botones `+` / la papelera junto a cada línea — pero hazlo **en cada idioma**,
uno por uno (ver *Cómo funciona la traducción*, más abajo).

### El carrete de fotos y vídeos

`photo`, `gallery` y `videos` forman un mismo carrete en la ficha del
dispositivo: la portada primero, después las fotos y al final los vídeos, con
una tira de miniaturas para pasar de una a otra. Con una sola foto y ningún
vídeo la ficha se ve igual que siempre, sin miniaturas.

Ni las fotos ni los vídeos se traducen: la misma imagen vale para los tres
idiomas.

**Fotos**: súbelas como salgan de la cámara. El sitio las reescala al tamaño
que necesita cada hueco y las convierte a formatos modernos, así que no hay
que prepararlas ni comprimirlas a mano.

**Vídeos**: aquí sí importa lo que subas. El sitio no puede recomprimir un
vídeo, sólo evita descargarlo hasta que alguien le da al play — quien no lo
mira no lo paga. Sube MP4 de 1080p como mucho; un vídeo de producto de un par
de minutos debería quedarse por debajo de 50 MB. Si sale mucho más pesado,
compensa reducirlo antes de subirlo.

> Los vídeos del canal de YouTube no van aquí: ésos se gestionan como recursos
> de tipo *Vídeo* y salen en su propia sección, más abajo en la misma ficha.

---

## Categorías (`Category`)

Las 9 categorías del centro de recursos (Instalación, Conectividad...).

Solo se edita **nombre, descripción e icono**. El identificador interno de
cada categoría (el que forma parte de las URLs, tipo `/recursos?cat=instalacion`)
**no aparece aquí** y no se puede cambiar desde el panel — vive en el código
a propósito, porque tocarlo rompería enlaces que ya existen.

---

## Ecosistemas (`Ecosystem`)

Alexa, Google Home, IFTTT, Aidoo. Solo la **descripción** es traducible; el
nombre, el proveedor (`vendor`) y el color de la insignia son fijos.

---

## Distribuidores (`Partner`)

Los distribuidores oficiales (VBH, PROCOMSA...) de la página "Dónde comprar".
Eslogan, descripción y país son traducibles; el logo se sube desde aquí
mismo (campo `logo`, Media Library).

---

## Noticias (`NewsPost`)

El blog. Título, extracto, cuerpo y etiqueta son traducibles. El campo
`postDate` decide el orden en que aparecen (la más reciente primero) — no
tiene por qué coincidir con cuándo le das a publicar.

`cover` te deja subir una imagen de portada real; si la dejas vacía, se usa
un degradado de color en su lugar (no pasa nada si no la rellenas).

---

## Preguntas frecuentes (`FaqItem`)

Pregunta y respuesta son traducibles. El campo `resource` es opcional: si
la respuesta hace referencia a un manual o vídeo concreto, enlázalo aquí y
aparecerá un botón "Ver más" debajo de la respuesta en la web.

---

## Páginas legales (`LegalPage`)

Los tres documentos legales del sitio: **aviso legal**, **política de
privacidad** y **política de cookies**. Salen enlazados en el pie de página,
en el aviso de cookies y en la casilla de consentimiento del formulario de
contacto.

| Campo | Qué es | ¿Traducible? |
| --- | --- | --- |
| `slug` | El identificador de la URL. **No lo toques** (ver abajo) | No |
| `title` | El título grande de la página | **Sí** |
| `intro` | La frase que va bajo el título, antes del texto | **Sí** |
| `body` | El documento completo | **Sí** |
| `lastUpdated` | La fecha de «Última actualización» que se muestra arriba | No |
| `seo` | Ver el apartado *SEO* | Sí (dentro del bloque) |

**Cambia siempre `lastUpdated` cuando toques el texto.** Es la fecha que ve
el usuario y la que demuestra, si algún día hay una reclamación, desde
cuándo está publicada esa versión.

### Cómo se escribe el `body`

El cuerpo admite un Markdown sencillo. Esto es todo lo que entiende:

| Escribes | Sale |
| --- | --- |
| `## 1. Título del apartado` | Un apartado, que además aparece solo en el índice lateral |
| `### Subapartado` | Un subtítulo dentro del apartado |
| `- Una cosa` | Un punto de una lista |
| `**importante**` | Texto en **negrita** |
| `[texto](/es/contacto)` | Un enlace a otra página del sitio |
| `[texto](https://www.aepd.es)` | Un enlace externo, que se abre en otra pestaña |

También se pueden hacer tablas, poniendo una fila por línea y separando las
columnas con barras verticales. La segunda línea, con los guiones, es
obligatoria:

```
| Dato | Valor |
| --- | --- |
| CIF | B30780191 |
```

Cualquier otra cosa (HTML, imágenes, código) se muestra como texto tal cual:
es a propósito, para que nadie pueda inyectar código en las páginas que
justamente tienen que ser las más fiables del sitio.

### El índice lateral se hace solo

No hay que escribirlo. Cada `## Apartado` del cuerpo aparece automáticamente
en la columna de la izquierda, con su enlace. Si renumeras o renombras un
apartado, el índice se actualiza solo.

### Enlaces entre documentos

Enlaza siempre a las páginas de **este** sitio, nunca a las del portal
antiguo (`iotfenster.com/aviso-legal` y similares), que desaparecerán:

- Política de privacidad: `/es/legal/politica-de-privacidad`
- Aviso legal: `/es/legal/aviso-legal`
- Política de cookies: `/es/legal/politica-de-cookies`

Cambia el `/es/` por `/en/` o `/it/` en las versiones inglesa e italiana.

### Lo que no debes hacer

- **No cambies el `slug`.** Los tres slugs están escritos en el código del
  pie de página y del aviso de cookies. Si lo cambias, esos enlaces se van a
  una página que no existe.
- **No borres una página ni la despubliques.** Si lo haces, el sitio no se
  queda sin aviso legal —vuelve automáticamente al texto guardado en el
  código—, pero entonces tus cambios en el panel dejan de verse y es fácil
  volverse loco buscando por qué.
- **No crees páginas nuevas aquí esperando que salgan en el pie.** El pie
  enlaza esos tres documentos y solo esos. Para añadir un cuarto hay que
  tocar el código.

---

## Ajustes del sitio (`SiteSettings`)

Es un tipo **único** (no hay una lista, hay una sola ficha): datos globales
como la descripción de la organización y el SEO por defecto de toda la web.
La mayoría de las veces no hace falta tocarlo.

Aquí también se configura el contacto de la web:

| Campo | Para qué sirve |
| --- | --- |
| `salesEmail` | El correo que se muestra en "Consulta comercial" (precios, catálogo, disponibilidad). Por defecto `info@iotfenster.com`. |
| `supportEmail` | El correo que se muestra en "Soporte técnico" (incidencias de dispositivos ya instalados). Por defecto `soporte@iotfenster.com`. |
| `whatsappNumber` | El número de WhatsApp Business, solo dígitos con prefijo de país (ej. `34600111222`, sin `+` ni espacios). Es **el mismo número** para comercial y soporte. |
| `salesWhatsappMessage` | El mensaje que sale precargado al pulsar "Consulta comercial" por WhatsApp. Traducible. |
| `supportWhatsappMessage` | El mensaje que sale precargado al pulsar "Soporte / incidencias" por WhatsApp. Traducible. |

Comercial y soporte usan el mismo número de WhatsApp: lo que los diferencia
es el mensaje que le llega ya escrito a quien responde, así que conviene
que cada mensaje deje claro de qué trata (uno habla de precios, el otro de
una incidencia). Si `whatsappNumber` está vacío, el botón de WhatsApp
sencillamente no aparece en la web.

---

## El bloque SEO

Varios tipos (`Resource`, `Device`, `NewsPost`, `LegalPage`, `SiteSettings`) llevan un
bloque `seo` opcional con estos campos:

| Campo | Para qué sirve |
| --- | --- |
| `metaTitle` | El título que ve Google en los resultados de búsqueda |
| `metaDescription` | El resumen de dos líneas bajo el título en Google |
| `keywords` | Palabras clave adicionales (cada vez tienen menos peso en Google, pero no está de más) |
| `ogImage` | La imagen que se ve al compartir el enlace en WhatsApp, redes, etc. |

**Si lo dejas todo vacío, no pasa nada malo**: el sitio genera un título y
una descripción razonables a partir del propio contenido de la ficha. Rellena
este bloque solo cuando quieras un titular de Google distinto al automático
— por ejemplo, para meter una palabra clave concreta por la que os interese
posicionar.

---

## Subir imágenes y documentos

**Media Library** (menú de la izquierda) acepta imágenes, PDF, Word, audio y
vídeo. Ahí es donde subes fotos de dispositivo, logos de distribuidor,
portadas de noticia e imágenes para redes sociales — esos campos ya tienen
un botón "subir" que abre la Media Library directamente.

**Para los PDF de manuales, es un único paso**: en la ficha del `Resource`,
el campo **`file`** (el primero) es un selector de fichero directo, igual
que `photo` o `cover`. Click → **Añadir activos** → sube el PDF → Guardar →
Publicar. No hace falta pasar por Media Library ni copiar ninguna URL.

El campo `url` de texto sigue existiendo, pero es solo para cuando el PDF
**ya vive en otro sitio** y quieres enlazarlo sin subir una copia (por
ejemplo, los manuales originales que siguen alojados en iotfenster.com). Si
rellenas los dos, gana el que has subido en `file`.

---

## Cómo funciona la traducción

Arriba a la derecha, dentro de cada ficha, hay un selector de idioma
(ES / EN / IT). **Cada idioma es una copia independiente de los campos
traducibles** — cambiar el español no traduce solo el inglés ni el italiano;
hay que entrar en cada idioma y escribirlo.

Los campos que **no** son traducibles (identificadores, relaciones, colores,
booleanos...) se comparten automáticamente entre los tres idiomas: los
rellenas una vez y ya están en los tres.

## Publicar vs guardar borrador

Cada ficha tiene dos botones: **Guardar** (queda como borrador, nadie más lo
ve) y **Publicar** (sale ya en la web, tras la siguiente sincronización —
hasta una hora, o al momento si alguien fuerza una recompilación). Si editas
algo que ya estaba publicado, tienes que darle a publicar otra vez para que
el cambio salga a la web; guardarlo solo no basta.

## Cosas que no deberías cambiar

- **Settings → API Tokens**: son las llaves que usa el sitio (y el script de
  importación) para leer el contenido. No las borres ni las regeneres sin
  avisar a quien mantiene el sitio — el sitio dejaría de ver el contenido
  hasta que se actualice el token en el servidor.
- **Settings → Internationalization**: los tres idiomas ya están configurados
  (español por defecto). No añadas ni quites idiomas sin coordinarlo — el
  sitio solo sabe mostrar ES/EN/IT.
- **El campo `slug`** de cualquier tipo: es el identificador que forma parte
  de la URL pública. Cambiarlo rompe el enlace que ya esté compartido o
  indexado en Google.
