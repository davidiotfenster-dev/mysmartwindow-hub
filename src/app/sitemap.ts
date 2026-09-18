import type { MetadataRoute } from 'next'
import { locales, localeMeta, type Locale } from '@/i18n/config'
import { news } from '@/data/news'
import { resources } from '@/data/resources'
import { visibleDevices } from '@/data/taxonomy'
import { SITE_URL } from '@/lib/seo'

const staticPaths = [
  '',
  '/recursos',
  '/videos',
  '/dispositivos',
  '/ecosistemas',
  '/noticias',
  '/soporte',
  '/contacto',
]

/** Cada entrada declara sus equivalentes en los otros idiomas. */
function withAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [localeMeta[l].htmlLang, `${SITE_URL}/${l}${path}`])
    ),
  }
}

function entry(
  locale: Locale,
  path: string,
  priority: number,
  changeFrequency: 'weekly' | 'monthly' | 'yearly',
  lastModified: Date = new Date()
) {
  return {
    url: `${SITE_URL}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: withAlternates(path),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = locales.flatMap((locale) =>
    staticPaths.map((path) =>
      entry(
        locale,
        path,
        path === '' ? 1 : path === '/recursos' ? 0.9 : 0.7,
        path === '' ? 'weekly' : 'monthly'
      )
    )
  )

  // Las 63 fichas de recurso: el grueso del valor SEO del sitio
  const resourcePages = locales.flatMap((locale) =>
    resources.map((r) =>
      entry(
        locale,
        `/recursos/${r.id}`,
        r.featured ? 0.8 : 0.6,
        'monthly',
        r.updated ? new Date(r.updated) : new Date()
      )
    )
  )

  const devicePages = locales.flatMap((locale) =>
    visibleDevices.map((d) => entry(locale, `/dispositivos/${d.id}`, 0.8, 'monthly'))
  )

  const posts = locales.flatMap((locale) =>
    news.map((post) =>
      entry(locale, `/noticias/${post.slug}`, 0.6, 'yearly', new Date(post.publishedAt))
    )
  )

  return [...pages, ...resourcePages, ...devicePages, ...posts]
}
