import { cache } from 'react'

import { partners as staticPartners, type Partner } from '@/data/partners'
import { anyEntry, fetchCollectionAllLocales, mediaUrl, pickLocalized, zipByDocumentId } from './strapi-client'

export const getPartners = cache(async (): Promise<Partner[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/partners', 'logo')
  if (!byLocale) return staticPartners

  const merged: Partner[] = []
  for (const bucket of zipByDocumentId(byLocale).values()) {
    const base = anyEntry(bucket)
    if (!base?.slug) continue
    merged.push({
      id: base.slug as string,
      name: (base.name as string) ?? '',
      url: (base.url as string) ?? '',
      contactUrl: (base.contactUrl as string) ?? '',
      accent: (base.accent as string) ?? '',
      brands: Array.isArray(base.brands) ? (base.brands as string[]) : [],
      tagline: pickLocalized(bucket, 'tagline'),
      description: pickLocalized(bucket, 'description'),
      country: pickLocalized(bucket, 'country'),
      logo: mediaUrl(base.logo),
    })
  }

  return merged.length ? merged : staticPartners
})
