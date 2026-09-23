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
        // sitio: ya lleva noindex, esto es solo un cinturon mas.
        disallow: ['/api/contacto', '/api/newsletter', '/api/youtube', '/app'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
