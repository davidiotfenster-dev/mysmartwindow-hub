import type { YouTubeVideo } from './youtube'

/**
 * Forma serializable de un video, la que cruza la frontera servidor -> cliente.
 * Vive fuera de los componentes de cliente para poder llamarse desde el servidor.
 */
export interface VideoItem {
  id: string
  title: string
  description?: string
  thumbnail: string
  publishedAt?: string
  durationSeconds?: number
  views?: number
  playlistId?: string
}

export function toVideoItem(video: YouTubeVideo): VideoItem {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    publishedAt: video.publishedAt,
    durationSeconds: video.durationSeconds,
    views: video.views,
  }
}
