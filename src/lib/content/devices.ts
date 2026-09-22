import { cache } from 'react'

import { devices as staticDevices, deviceIds, type Device, type DeviceId } from '@/data/taxonomy'
import type { Locale } from '@/i18n/config'
import {
  anyEntry,
  fetchCollectionAllLocales,
  mediaUrl,
  mediaUrls,
  pickLocalized,
  seoOverrideLocalized,
  zipByDocumentId,
  type StrapiEntry,
} from './strapi-client'

function toFeatures(bucket: Partial<Record<Locale, StrapiEntry>>) {
  const base = anyEntry(bucket)
  const count = Array.isArray(base?.features) ? (base!.features as unknown[]).length : 0

  return Array.from({ length: count }, (_, i) => ({
    es: ((bucket.es?.features as { text?: string }[] | undefined)?.[i]?.text as string) ?? '',
    en: ((bucket.en?.features as { text?: string }[] | undefined)?.[i]?.text as string) ?? '',
    it: ((bucket.it?.features as { text?: string }[] | undefined)?.[i]?.text as string) ?? '',
  })).map((feature) => ({
    es: feature.es || feature.en || feature.it,
    en: feature.en || feature.es || feature.it,
    it: feature.it || feature.es || feature.en,
  }))
}

export const getDevices = cache(async (): Promise<Device[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/devices', '*')
  if (!byLocale) return staticDevices

  const merged: Device[] = []
  for (const bucket of zipByDocumentId(byLocale).values()) {
    const base = anyEntry(bucket)
    if (!base?.slug) continue
    merged.push({
      id: base.slug as DeviceId,
      name: (base.name as string) ?? '',
      url: (base.url as string) || undefined,
      hidden: Boolean(base.hidden),
      tagline: pickLocalized(bucket, 'tagline'),
      description: pickLocalized(bucket, 'description'),
      features: toFeatures(bucket),
      photo: mediaUrl(base.photo) ?? staticDevices.find((d) => d.id === base.slug)?.photo,
      gallery: mediaUrls(base.gallery),
      videos: mediaUrls(base.videos),
      seo: seoOverrideLocalized(bucket),
    })
  }

  if (!merged.length) return staticDevices

  // Strapi los devuelve por id de fila, que cambia cada vez que se edita una ficha:
  // se ordenan por el catálogo del código para que el escaparate sea estable.
  const order = (id: string) => {
    const index = deviceIds.indexOf(id as DeviceId)
    return index === -1 ? deviceIds.length : index
  }
  return merged.sort((a, b) => order(a.id) - order(b.id))
})

export const getVisibleDevices = cache(async (): Promise<Device[]> => {
  const list = await getDevices()
  return list.filter((d) => !d.hidden)
})

export const getDeviceMap = cache(async (): Promise<Record<DeviceId, Device>> => {
  const list = await getDevices()
  return Object.fromEntries(list.map((d) => [d.id, d])) as Record<DeviceId, Device>
})
