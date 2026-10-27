import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // Los manuales del CMS se sirven por /api/media y los PDF de fuera por
        // /api/pdf: cerrar /api/ entero dejaba fuera de los buscadores todo el
        // contenido del centro de recursos. Lo que se cierra son los extremos
        // que no publican nada: formularios y consultas.
        allow: ['/', '/api/media/', '/api/pdf'],
        // /app es el enlace fijo de la app movil a soporte, no una pagina del
        // sitio: ya lleva noindex, esto es solo un cinturon mas. Se cierra
        // exacto (`/app$`) y su subcarpeta: un `/app` pelado es un prefijo y
        // se llevaba por delante /app-datadeletion, /app-mysmartwindow (que
        // redirige) y /app-tyc, que Google indexaba igualmente sin poder
        // leerlas. La busqueda del centro de recursos (?q=) tampoco aporta
        // nada: al no devolver resultados daba un 200 vacio (soft 404).
        disallow: [
          '/api/contacto',
          '/api/newsletter',
          '/api/youtube',
          '/app$',
          '/app/',
          '/*?q=',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
