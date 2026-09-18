import { cache } from 'react'

import { ecosystems as staticEcosystems, type Ecosystem } from '@/data/ecosystems'
import { anyEntry, fetchCollectionAllLocales, pickLocalized, zipByDocumentId } from './strapi-client'

export const getEcosystems = cache(async (): Promise<Ecosystem[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/ecosystems', '*')
  if (!byLocale) return staticEcosystems

  const merged: Ecosystem[] = []
  for (const bucket of zipByDocumentId(byLocale).values()) {
    const base = anyEntry(bucket)
    if (!base?.slug) continue
    merged.push({
      id: base.slug as string,
      name: (base.name as string) ?? '',
      vendor: (base.vendor as string) ?? '',
      match: Array.isArray(base.match) ? (base.match as string[]) : [],
      color: (base.color as string) ?? '',
      description: pickLocalized(bucket, 'description'),
    })
  }

  return merged.length ? merged : staticEcosystems
})
