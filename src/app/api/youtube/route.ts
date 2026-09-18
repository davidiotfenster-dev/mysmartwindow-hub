import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

import { getChannelData } from '@/lib/youtube'

/** Estado actual de la sincronizacion con YouTube. */
export async function GET() {
  const data = await getChannelData()
  return NextResponse.json({
    source: data.source,
    fetchedAt: data.fetchedAt,
    videoCount: data.videos.length,
    playlistCount: data.playlists.length,
    videos: data.videos,
    playlists: data.playlists,
  })
}

/**
 * Fuerza una resincronizacion inmediata.
 * Si REVALIDATE_SECRET esta definido, se exige como cabecera `x-revalidate-secret`.
 *
 * Es tambien el webhook que usa Strapi: en Settings -> Webhooks, apuntar a
 * esta URL con los eventos entry.publish/update/unpublish. Sin esto, un
 * cambio en el CMS tarda hasta la revalidacion por tiempo (una hora) en
 * verse en el sitio.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (secret && request.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  revalidateTag('youtube')
  revalidateTag('cms')
  return NextResponse.json({ ok: true, revalidated: ['youtube', 'cms'], at: new Date().toISOString() })
}
