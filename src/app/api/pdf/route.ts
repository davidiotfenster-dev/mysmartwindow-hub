import { NextResponse } from 'next/server'

/**
 * Proxy de PDFs.
 *
 * Incrustar directamente un PDF alojado en otro dominio falla a menudo: el
 * origen puede bloquear el framing y muchos navegadores se niegan a mostrarlo.
 * Sirviendolo desde nuestro propio origen el visor del navegador funciona.
 *
 * La lista blanca de hosts es obligatoria: sin ella esto seria un SSRF abierto.
 */
const ALLOWED_HOSTS = new Set(['www.iotfenster.com', 'iotfenster.com'])

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get('url')
  if (!raw) {
    return NextResponse.json({ error: 'missing_url' }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(raw)
  } catch {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 })
  }

  if (target.protocol !== 'https:' || !ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: 'host_not_allowed' }, { status: 403 })
  }
  if (!target.pathname.toLowerCase().endsWith('.pdf')) {
    return NextResponse.json({ error: 'not_a_pdf' }, { status: 403 })
  }

  const upstream = await fetch(target.toString(), {
    headers: { 'User-Agent': 'MySmartWindowHub/1.0' },
    next: { revalidate: 86400 },
  })

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'upstream_error', status: upstream.status }, { status: 502 })
  }

  const fileName = decodeURIComponent(target.pathname.split('/').pop() ?? 'documento.pdf')

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${fileName.replace(/["\\]/g, '')}"`,
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
