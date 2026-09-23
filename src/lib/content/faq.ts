import { cache } from 'react'

import { faqs as staticFaqs, type FaqItem } from '@/data/faq'
import { anyEntry, fetchCollectionAllLocales, pickLocalized, zipByDocumentId } from './strapi-client'

export const getFaqs = cache(async (): Promise<FaqItem[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/faq-items', 'resource')
  if (!byLocale) return staticFaqs

  const merged: FaqItem[] = []
  for (const bucket of zipByDocumentId(byLocale).values()) {
    const base = anyEntry(bucket)
    if (!base?.slug) continue
    const resource = base.resource as { slug?: string } | null
    merged.push({
      id: base.slug as string,
      question: pickLocalized(bucket, 'question'),
      answer: pickLocalized(bucket, 'answer'),
      resourceId: resource?.slug,
      href: (base.resourceHref as string) || undefined,
    })
  }

  return merged.length ? merged : staticFaqs
})
