import { cache } from 'react'

import { news as staticNews, type NewsPost } from '@/data/news'
import {
  anyEntry,
  fetchCollectionAllLocales,
  mediaUrl,
  pickLocalized,
  seoOverride,
  zipByDocumentId,
} from './strapi-client'

export const getNews = cache(async (): Promise<NewsPost[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/news-posts', 'cover,seo.ogImage')
  const list: NewsPost[] = []

  if (byLocale) {
    for (const bucket of zipByDocumentId(byLocale).values()) {
      const base = anyEntry(bucket)
      if (!base?.slug || !base.postDate) continue
      list.push({
        slug: base.slug as string,
        title: pickLocalized(bucket, 'title'),
        excerpt: pickLocalized(bucket, 'excerpt'),
        body: pickLocalized(bucket, 'body'),
        tag: pickLocalized(bucket, 'tag'),
        publishedAt: base.postDate as string,
        readingMinutes: Number(base.readingMinutes ?? 3),
        gradient: (base.gradient as string) || 'from-brand-500/25 via-transparent to-signal-500/15',
        featured: Boolean(base.featured),
        cover: mediaUrl(base.cover),
        seo: seoOverride(base),
      })
    }
  }

  const source = list.length ? list : staticNews
  return [...source].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
})

export async function getNewsPost(slug: string): Promise<NewsPost | undefined> {
  const list = await getNews()
  return list.find((post) => post.slug === slug)
}
