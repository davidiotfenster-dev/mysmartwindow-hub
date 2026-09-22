import { cache } from 'react'

import { resources as staticResources, type Resource } from '@/data/resources'
import type { CategoryId, DeviceId, ResourceType } from '@/data/taxonomy'
import {
  anyEntry,
  fetchCollectionAllLocales,
  mediaUrl,
  pickLocalized,
  pickLocalizedMedia,
  seoOverrideLocalized,
  zipByDocumentId,
  type StrapiEntry,
} from './strapi-client'

function relationSlug(entry: StrapiEntry | undefined, key: string): string | undefined {
  const relation = entry?.[key] as { slug?: string } | null | undefined
  return relation?.slug
}

export const getResources = cache(async (): Promise<Resource[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/resources', 'category,device,file,seo.ogImage')
  if (!byLocale) return staticResources

  const merged: Resource[] = []
  for (const bucket of zipByDocumentId(byLocale).values()) {
    const base = anyEntry(bucket)
    if (!base?.slug || !base.type) continue

    const category = relationSlug(base, 'category') as CategoryId | undefined
    if (!category) continue

    // Un recurso sin dispositivo no se tira a la basura: se queda en `general`,
    // que existe justo para el material que no es de un aparato concreto.
    // Antes se descartaba, asi que borrar un dispositivo del CMS se llevaba por
    // delante sus manuales, en silencio y sin avisar a nadie.
    const device = (relationSlug(base, 'device') as DeviceId | undefined) ?? 'general'

    merged.push({
      id: base.slug as string,
      type: base.type as ResourceType,
      category,
      device,
      title: pickLocalized(bucket, 'title'),
      summary: pickLocalized(bucket, 'summary'),
      // El PDF subido en el CMS manda; si no hay, se usa el enlace externo (o el catalogo estatico).
      url: mediaUrl(base.file) ?? ((base.url as string) || undefined),
      // Y si el documento esta traducido, cada idioma se lleva el suyo.
      urlByLocale: pickLocalizedMedia(bucket, 'file'),
      youtubeId: (base.youtubeId as string) || undefined,
      playlistId: (base.playlistId as string) || undefined,
      updated: (base.updatedOn as string) || undefined,
      broken: Boolean(base.broken),
      featured: Boolean(base.featured),
      tags: Array.isArray(base.tags) ? (base.tags as string[]) : [],
      seo: seoOverrideLocalized(bucket),
    })
  }

  return merged.length ? merged : staticResources
})

export async function getResourceById(id: string): Promise<Resource | undefined> {
  const list = await getResources()
  return list.find((r) => r.id === id)
}

export async function getFeaturedResources(limit = 6): Promise<Resource[]> {
  const list = await getResources()
  return list.filter((r) => r.featured).slice(0, limit)
}

/** IDs de YouTube presentes en el catalogo, para enriquecerlos con la API/RSS. */
export async function getCatalogVideoIds(): Promise<string[]> {
  const list = await getResources()
  return Array.from(
    new Set(list.filter((r) => r.type === 'video' && r.youtubeId).map((r) => r.youtubeId!))
  )
}

export async function countByCategory(): Promise<
  Record<string, { manual: number; video: number; tarjeta: number; total: number }>
> {
  const list = await getResources()
  const out: Record<string, { manual: number; video: number; tarjeta: number; total: number }> = {}
  for (const r of list) {
    out[r.category] ??= { manual: 0, video: 0, tarjeta: 0, total: 0 }
    out[r.category][r.type] += 1
    out[r.category].total += 1
  }
  return out
}
