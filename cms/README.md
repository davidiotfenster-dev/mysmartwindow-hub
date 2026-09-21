# CMS de MySmartWindow (Strapi)

Panel de contenidos para el sitio en `../`. Soporte puede publicar y traducir
sin tocar código; el sitio sigue funcionando con el catálogo estático de
`src/data/` si este CMS está apagado o no responde.

> **¿Vas a usar el panel día a día, no a mantener el código?** Este fichero
> es la referencia técnica. La guía para editores, sección por sección, está
> en [`GUIA-DE-CONTENIDOS.md`](GUIA-DE-CONTENIDOS.md).

## Arrancar en local

```bash
npm install
npm run develop
```

Abre <http://localhost:1337/admin> y crea el primer administrador (solo la
primera vez). Luego, en la app de Next.js, añade a `.env.local`:

```bash
STRAPI_URL=http://localhost:1337
```

y reinicia `npm run dev`. Sin esa variable, el sitio usa directamente los
ficheros de `src/data/`.

## Qué se edita aquí

| Contenido | Tipo | Qué es traducible (ES/EN/IT) |
| --- | --- | --- |
| **Recursos** (manuales, vídeos, tarjetas) | `resource` | Título, resumen, SEO |
| **Dispositivos** | `device` | Eslogan, descripción, características, SEO |
| **Categorías** | `category` | Nombre, descripción |
| **Ecosistemas** (Alexa, Google Home...) | `ecosystem` | Descripción |
| **Distribuidores** | `partner` | Eslogan, descripción, país |
| **Noticias** | `news-post` | Título, extracto, cuerpo, etiqueta, SEO |
| **Preguntas frecuentes** | `faq-item` | Pregunta, respuesta |
| **Páginas legales** (aviso legal, privacidad, cookies) | `legal-page` | Título, entradilla, cuerpo, SEO |
| **Ajustes del sitio** | `site-setting` (único) | Descripción de la organización, SEO por defecto |

Cada tipo con SEO trae un bloque opcional (título, descripción, palabras
clave, imagen social): si se rellena, sustituye al que el sitio genera solo a
partir del contenido; si se deja vacío, no cambia nada.

**Lo que NO se edita aquí** (vive en el código porque son estructura, no
contenido): los identificadores de categoría y dispositivo (`slug`: cambiarlos
rompe las URLs existentes y el enlazado interno), las etiquetas de tipo de
recurso (manual/vídeo/tarjeta) y los enlaces del footer a redes sociales y al
sitio corporativo.

Los **textos legales sí se editan aquí** (`legal-page`), y son el único
contenido con una regla de seguridad extra: aunque se borren del CMS o Strapi
no responda, el sitio sigue publicando la versión de `src/data/legal/`. Una
web no se puede quedar sin aviso legal por una caída del panel.

## Importar el catálogo de partida

La primera vez, o para resetear el contenido a lo que hay en el repositorio:

1. Crea un token en **Settings → API Tokens → Create new API Token**, tipo
   **Full access**.
2. Desde la carpeta del sitio (no esta):

   ```bash
   STRAPI_API_TOKEN=xxxx node scripts/seed-cms.mjs
   ```

Es idempotente: vuelve a ejecutarlo tras cambiar `src/data/*.ts` y actualiza
en vez de duplicar.

## Cómo lee el sitio este contenido

`src/lib/content/*.ts` en la app de Next.js pide cada colección en los tres
idiomas (`?locale=es|en|it`), los combina por `documentId` y cae a los
ficheros de `src/data/` si Strapi no responde o el slug no existe todavía.
Los `slug` de aquí **deben coincidir** con los `id` de esos ficheros: es la
clave que conecta ambos mundos y la que mantiene las URLs estables.

## Ver los cambios al instante (sin esperar a la revalidación por tiempo)

Por defecto el sitio relee el CMS una vez por hora (`revalidate: 3600`). Un
webhook avisa al sitio en cuanto se toca algo, y el cambio aparece al momento.

**Ya está creado y funcionando en local**: se llama **«Refrescar la web»** y
apunta a `http://localhost:3000/api/youtube`. Se ve en **Settings → Webhooks**.

> **Al desplegar hay que cambiarle la URL**, porque `localhost` no existe fuera
> de este ordenador: entra en Settings → Webhooks → «Refrescar la web» y pon
> `https://tu-dominio.com/api/youtube`. Si no se cambia, los cambios del CMS
> seguirán tardando hasta una hora en verse.

Si algún día hay que recrearlo (**Settings → Webhooks → Create new webhook**):

- URL: `https://tu-dominio.com/api/youtube`
- Eventos: `Entry create/update/delete/publish/unpublish` y los de `Media`
- Si el sitio tiene `REVALIDATE_SECRET` puesto, añade la cabecera `x-revalidate-secret` con ese valor

(El nombre de la ruta viene de que originalmente era solo para YouTube; ahora
también invalida la caché del CMS. Ver `src/app/api/youtube/route.ts`.)

## Producción

Ver **[../DEPLOY.md](../DEPLOY.md)** para la guía completa paso a paso:
Docker Compose, dominio + subdominio, SQLite vs Postgres y copias de
seguridad.
