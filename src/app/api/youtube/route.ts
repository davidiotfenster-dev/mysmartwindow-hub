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
 * Sirve tambien como webhook para Strapi en la fase 2.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (secret && request.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  revalidateTag('youtube')
  return NextResponse.json({ ok: true, revalidated: 'youtube', at: new Date().toISOString() })
}
