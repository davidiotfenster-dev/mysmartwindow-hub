import { XMLParser } from 'fast-xml-parser'

/**
 * Capa de sincronizacion con el canal de YouTube de MySmartWindow.
 *
 * Doble estrategia, deliberada:
 *
 *  1. Si existe YOUTUBE_API_KEY se usa YouTube Data API v3: catalogo COMPLETO
 *     del canal, duraciones, visualizaciones y las listas de reproduccion
 *     reales con sus videos.
 *  2. Si no existe, se cae automaticamente al feed RSS publico del canal, que
 *     no requiere ninguna clave y devuelve los 15 videos mas recientes.
 *
 * En ambos casos el resultado tiene la misma forma, asi que el resto de la
 * aplicacion no sabe -ni le importa- de donde vienen los datos.
 */

export const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ?? 'UCOYzORrjwX-krZhyK9-NqBQ'
export const CHANNEL_HANDLE = process.env.NEXT_PUBLIC_YOUTUBE_HANDLE ?? 'MySmartWindow'
export const CHANNEL_URL = `https://www.youtube.com/@${CHANNEL_HANDLE}`

/** Revalidacion: una hora. Coste de cuota despreciable. */
const REVALIDATE_SECONDS = 3600

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  /** Segundos. Solo disponible con API key. */
  durationSeconds?: number
  /** Solo disponible con API key o RSS. */
  views?: number
  url: string
}

export interface YouTubePlaylist {
  id: string
  title: string
  description: string
  thumbnail: string
  itemCount: number
  url: string
  videoIds: string[]
}

export interface ChannelData {
  videos: YouTubeVideo[]
  playlists: YouTubePlaylist[]
  /** 'api' | 'rss' | 'none' — se muestra en el pie de la seccion de videos. */
  source: 'api' | 'rss' | 'none'
  fetchedAt: string
}

export function thumbnailFor(videoId: string, quality: 'hq' | 'mq' | 'max' = 'hq'): string {
  const file = quality === 'max' ? 'maxresdefault' : quality === 'mq' ? 'mqdefault' : 'hqdefault'
  return `https://i.ytimg.com/vi/${videoId}/${file}.jpg`
}

export function watchUrl(videoId: string, playlistId?: string): string {
  const base = `https://www.youtube.com/watch?v=${videoId}`
  return playlistId ? `${base}&list=${playlistId}` : base
}

/** Embed sin cookies de terceros. */
export function embedUrl(videoId: string, autoplay = true): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    ...(autoplay ? { autoplay: '1' } : {}),
  })
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}

export function formatDuration(seconds?: number): string | undefined {
  if (!seconds || seconds <= 0) return undefined
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`
}

/** 95 -> "PT1M35S". Formato que exige schema.org VideoObject.duration. */
export function toIsoDuration(seconds?: number): string | undefined {
  if (!seconds || seconds <= 0) return undefined
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `PT${h > 0 ? `${h}H` : ''}${m > 0 ? `${m}M` : ''}${s > 0 ? `${s}S` : ''}`
}

/** PT1M35S -> 95 */
function parseIsoDuration(iso?: string): number | undefined {
  if (!iso) return undefined
  const m = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso)
  if (!m) return undefined
  const [, d, h, min, s] = m
  return Number(d ?? 0) * 86400 + Number(h ?? 0) * 3600 + Number(min ?? 0) * 60 + Number(s ?? 0)
}

/* ==========================================================================
   Estrategia 1 - RSS publico (sin clave)
   ========================================================================== */
async function fetchFromRss(): Promise<YouTubeVideo[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS, tags: ['youtube'] },
    headers: { 'User-Agent': 'MySmartWindowHub/1.0' },
  })
  if (!res.ok) throw new Error(`RSS de YouTube respondio ${res.status}`)

  const xml = await res.text()
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
  const feed = parser.parse(xml)?.feed
  const rawEntries = feed?.entry
  if (!rawEntries) return []

  const entries = Array.isArray(rawEntries) ? rawEntries : [rawEntries]

  return entries.map((e: Record<string, any>): YouTubeVideo => {
    const id = String(e['yt:videoId'])
    const group = e['media:group'] ?? {}
    const views = Number(group['media:community']?.['media:statistics']?.['@_views'])
    return {
      id,
      title: String(e.title ?? group['media:title'] ?? ''),
      description: String(group['media:description'] ?? ''),
      thumbnail: group['media:thumbnail']?.['@_url'] ?? thumbnailFor(id),
      publishedAt: String(e.published ?? ''),
      views: Number.isFinite(views) ? views : undefined,
      url: watchUrl(id),
    }
  })
}

/* ==========================================================================
   Estrategia 2 - YouTube Data API v3 (con clave)
   ========================================================================== */
const API = 'https://www.googleapis.com/youtube/v3'

async function api<T>(path: string, params: Record<string, string>, key: string): Promise<T> {
  const qs = new URLSearchParams({ ...params, key })
  const res = await fetch(`${API}/${path}?${qs}`, {
    next: { revalidate: REVALIDATE_SECONDS, tags: ['youtube'] },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`YouTube API ${path} -> ${res.status} ${body.slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

function bestThumb(thumbs: Record<string, { url: string }> | undefined, fallbackId: string): string {
  return (
    thumbs?.maxres?.url ?? thumbs?.standard?.url ?? thumbs?.high?.url ?? thumbnailFor(fallbackId)
  )
}

async function fetchFromApi(key: string): Promise<{ videos: YouTubeVideo[]; playlists: YouTubePlaylist[] }> {
  // 1. Playlist de subidas del canal
  const channel = await api<any>('channels', { part: 'contentDetails', id: CHANNEL_ID }, key)
  const uploadsId: string | undefined =
    channel?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploadsId) throw new Error('No se encontro la playlist de subidas del canal')

  // 2. Todos los videos (paginado)
  const videoIds: string[] = []
  const partial = new Map<string, Omit<YouTubeVideo, 'durationSeconds' | 'views'>>()
  let pageToken: string | undefined
  let guard = 0
  do {
    const page = await api<any>(
      'playlistItems',
      {
        part: 'snippet,contentDetails',
        playlistId: uploadsId,
        maxResults: '50',
        ...(pageToken ? { pageToken } : {}),
      },
      key
    )
    for (const item of page.items ?? []) {
      const id = item.contentDetails?.videoId
      if (!id || partial.has(id)) continue
      videoIds.push(id)
      partial.set(id, {
        id,
        title: item.snippet?.title ?? '',
        description: item.snippet?.description ?? '',
        thumbnail: bestThumb(item.snippet?.thumbnails, id),
        publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? '',
        url: watchUrl(id),
      })
    }
    pageToken = page.nextPageToken
  } while (pageToken && ++guard < 20)

  // 3. Duraciones y visualizaciones, en lotes de 50
  const stats = new Map<string, { durationSeconds?: number; views?: number }>()
  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50)
    const detail = await api<any>(
      'videos',
      { part: 'contentDetails,statistics', id: chunk.join(',') },
      key
    )
    for (const v of detail.items ?? []) {
      stats.set(v.id, {
        durationSeconds: parseIsoDuration(v.contentDetails?.duration),
        views: v.statistics?.viewCount ? Number(v.statistics.viewCount) : undefined,
      })
    }
  }

  const videos: YouTubeVideo[] = videoIds.map((id) => ({ ...partial.get(id)!, ...stats.get(id) }))

  // 4. Listas de reproduccion del canal + sus videos
  const playlists: YouTubePlaylist[] = []
  const listPage = await api<any>(
    'playlists',
    { part: 'snippet,contentDetails', channelId: CHANNEL_ID, maxResults: '50' },
    key
  )
  for (const p of listPage.items ?? []) {
    let items: string[] = []
    try {
      const pi = await api<any>(
        'playlistItems',
        { part: 'contentDetails', playlistId: p.id, maxResults: '50' },
        key
      )
      items = (pi.items ?? []).map((i: any) => i.contentDetails?.videoId).filter(Boolean)
    } catch {
      // Una lista privada o vacia no debe tumbar el resto
    }
    playlists.push({
      id: p.id,
      title: p.snippet?.title ?? '',
      description: p.snippet?.description ?? '',
      thumbnail: bestThumb(p.snippet?.thumbnails, items[0] ?? ''),
      itemCount: p.contentDetails?.itemCount ?? items.length,
      url: `https://www.youtube.com/playlist?list=${p.id}`,
      videoIds: items,
    })
  }

  return { videos, playlists }
}

/* ==========================================================================
   Punto de entrada unico
   ========================================================================== */
export async function getChannelData(): Promise<ChannelData> {
  const key = process.env.YOUTUBE_API_KEY?.trim()
  const fetchedAt = new Date().toISOString()

  if (key) {
    try {
      const { videos, playlists } = await fetchFromApi(key)
      return { videos, playlists, source: 'api', fetchedAt }
    } catch (error) {
      console.warn('[youtube] La API fallo, se usa el feed RSS:', (error as Error).message)
    }
  }

  try {
    const videos = await fetchFromRss()
    return { videos, playlists: [], source: 'rss', fetchedAt }
  } catch (error) {
    console.warn('[youtube] El feed RSS tambien fallo:', (error as Error).message)
    return { videos: [], playlists: [], source: 'none', fetchedAt }
  }
}

/** Mapa id -> video, para enriquecer el catalogo curado. */
export async function getVideoMap(): Promise<Record<string, YouTubeVideo>> {
  const { videos } = await getChannelData()
  return Object.fromEntries(videos.map((v) => [v.id, v]))
}
