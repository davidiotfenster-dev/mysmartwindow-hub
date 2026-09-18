import { NextResponse } from 'next/server'

/**
 * Proxy de las imágenes subidas en el CMS.
 *
 * Strapi puede vivir en una dirección que sólo existe puertas adentro -en
 * Docker es `http://cms:1337`-. Eso vale para que el servidor lea el
 * contenido, pero no para una URL que tiene que abrir alguien de fuera: el
 * navegador del visitante, o el robot de WhatsApp y LinkedIn cuando generan
 * la vista previa de un enlace compartido.
 *
 * Sirviéndolas desde aquí, toda imagen del CMS tiene una URL del propio
 * dominio del sitio, que siempre es alcanzable, y deja de importar dónde esté
 * el CMS ni si está publicado hacia fuera.
 */
const strapiOrigin = (() => {
  try {
    return process.env.STRAPI_URL ? new URL(process.env.STRAPI_URL) : null
  } catch {
    return null
  }
})()

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!strapiOrigin) {
    return NextResponse.json({ error: 'cms_not_configured' }, { status: 404 })
  }

  const { path } = await params

  // Sólo la carpeta de subidas: sin esto, esto sería un proxy abierto a
  // cualquier ruta del CMS, incluida su API de administración.
  if (path[0] !== 'uploads' || path.some((segment) => segment.includes('..'))) {
    return NextResponse.json({ error: 'not_allowed' }, { status: 403 })
  }

  const target = new URL(path.map(encodeURIComponent).join('/'), strapiOrigin)

  let upstream: Response
  try {
    upstream = await fetch(target, { next: { revalidate: 3600 } })
  } catch {
    return NextResponse.json({ error: 'cms_unreachable' }, { status: 502 })
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'not_found' }, { status: upstream.status })
  }

  // En la carpeta de subidas hay fotos y los PDF de los manuales; cualquier
  // otra cosa no se sirve.
  const type = upstream.headers.get('content-type') ?? 'application/octet-stream'
  if (!type.startsWith('image/') && !type.startsWith('application/pdf')) {
    return NextResponse.json({ error: 'type_not_allowed' }, { status: 415 })
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': type,
      // Strapi renombra el fichero con un hash, así que el contenido de una
      // URL no cambia nunca: se puede cachear sin miedo.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
