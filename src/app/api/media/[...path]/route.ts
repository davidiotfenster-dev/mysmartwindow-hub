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

  // Un vídeo se pide por tramos: el navegador manda `Range` para arrancar sin
  // bajarlo entero y para saltar por la barra de progreso. Hay que dejar pasar
  // la cabecera hacia el CMS y devolver su respuesta parcial tal cual, o el
  // reproductor descarga el fichero completo antes del primer fotograma —y en
  // iPhone directamente no reproduce, porque exige una respuesta parcial.
  const range = request.headers.get('range')

  let upstream: Response
  try {
    upstream = await fetch(target, {
      headers: range ? { Range: range } : undefined,
      // Los vídeos no caben en la caché de datos de Next, y guardarlos ahí sólo
      // gastaría memoria: la caché que importa es la del navegador, que da el
      // `Cache-Control` de abajo.
      cache: 'no-store',
    })
  } catch {
    return NextResponse.json({ error: 'cms_unreachable' }, { status: 502 })
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'not_found' }, { status: upstream.status })
  }

  // En la carpeta de subidas hay fotos, vídeos de producto y los PDF de los
  // manuales; cualquier otra cosa no se sirve.
  const type = upstream.headers.get('content-type') ?? 'application/octet-stream'
  const allowed =
    type.startsWith('image/') || type.startsWith('video/') || type.startsWith('application/pdf')
  if (!allowed) {
    return NextResponse.json({ error: 'type_not_allowed' }, { status: 415 })
  }

  const headers = new Headers({
    'Content-Type': type,
    // Strapi renombra el fichero con un hash, así que el contenido de una
    // URL no cambia nunca: se puede cachear sin miedo.
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Accept-Ranges': 'bytes',
  })
  for (const header of ['content-length', 'content-range'] as const) {
    const value = upstream.headers.get(header)
    if (value) headers.set(header, value)
  }

  return new NextResponse(upstream.body, { status: upstream.status, headers })
}
