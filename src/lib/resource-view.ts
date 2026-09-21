import type { Resource } from '@/data/resources'
import type { Category, CategoryId, Device, DeviceId, ResourceType } from '@/data/taxonomy'
import { getCategoryMap, getDeviceMap } from '@/lib/content'
import type { Locale } from '@/i18n/config'
import { formatDuration, thumbnailFor, watchUrl, type YouTubeVideo } from './youtube'

/**
 * Proyeccion plana y ya traducida de un recurso.
 *
 * Se calcula en el servidor para que los componentes de cliente (buscador,
 * tarjetas, modales) reciban strings listos y no tengan que cargar con los
 * diccionarios ni con la taxonomia completa.
 */
export interface ResourceView {
  id: string
  type: ResourceType
  category: CategoryId
  categoryName: string
  device: DeviceId
  deviceName: string
  title: string
  summary: string
  url?: string
  youtubeId?: string
  playlistId?: string
  watchUrl?: string
  thumbnail?: string
  duration?: string
  views?: number
  updated?: string
  broken: boolean
  featured: boolean
  tags: string[]
  /** true cuando los metadatos del video vienen en vivo de YouTube. */
  live: boolean
}

export function toResourceView(
  resource: Resource,
  locale: Locale,
  videos: Record<string, YouTubeVideo> = {},
  categoryMap: Record<CategoryId, Category>,
  deviceMap: Record<DeviceId, Device>
): ResourceView {
  const live = resource.youtubeId ? videos[resource.youtubeId] : undefined

  return {
    id: resource.id,
    type: resource.type,
    category: resource.category,
    categoryName: categoryMap[resource.category]?.name[locale] ?? resource.category,
    device: resource.device,
    deviceName: deviceMap[resource.device]?.name ?? resource.device,
    // El titulo curado manda: es el que esta categorizado y traducido.
    title: resource.title[locale],
    // `||` y no `??`: un recurso sin resumen llega con la cadena vacía, no con
    // nulo. La descripción de YouTube sólo sirve de red en español, que es el
    // idioma del canal: en italiano o inglés vale más una tarjeta sin texto
    // que una frase en otro idioma.
    summary:
      resource.summary?.[locale] ||
      (locale === 'es' ? live?.description?.split('\n')[0]?.slice(0, 180) : '') ||
      '',
    url: resource.url,
    youtubeId: resource.youtubeId,
    playlistId: resource.playlistId,
    watchUrl: resource.youtubeId ? watchUrl(resource.youtubeId, resource.playlistId) : undefined,
    thumbnail: resource.youtubeId ? (live?.thumbnail ?? thumbnailFor(resource.youtubeId)) : undefined,
    duration: formatDuration(live?.durationSeconds),
    views: live?.views,
    // La fecha en vivo de YouTube gana a la inferida del catalogo.
    updated: live?.publishedAt ?? resource.updated,
    broken: Boolean(resource.broken),
    featured: Boolean(resource.featured),
    tags: resource.tags ?? [],
    live: Boolean(live),
  }
}

export async function toResourceViews(
  list: Resource[],
  locale: Locale,
  videos: Record<string, YouTubeVideo> = {}
): Promise<ResourceView[]> {
  const [categoryMap, deviceMap] = await Promise.all([getCategoryMap(), getDeviceMap()])
  return list.map((r) => toResourceView(r, locale, videos, categoryMap, deviceMap))
}
