import { cache } from 'react'

import { legalDocuments as staticLegal, type LegalDocument } from '@/data/legal'
import {
  anyEntry,
  fetchCollectionAllLocales,
  pickLocalized,
  seoOverride,
  zipByDocumentId,
  type SeoOverrideRaw,
} from './strapi-client'

export interface LegalPage extends LegalDocument {
  seo?: SeoOverrideRaw
}

/**
 * Páginas legales (aviso legal, privacidad, cookies).
 *
 * A diferencia del resto del catálogo, aquí el respaldo estático no es solo
 * una comodidad de desarrollo: un sitio no puede quedarse sin aviso legal
 * porque el CMS no conteste. Si Strapi no devuelve una página, o la devuelve
 * sin cuerpo, se sirve la de `src/data/legal/`.
 */
export const getLegalPages = cache(async (): Promise<LegalPage[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/legal-pages', 'seo.ogImage')

  const fromCms = new Map<string, LegalPage>()
  if (byLocale) {
    for (const bucket of zipByDocumentId(byLocale).values()) {
      const base = anyEntry(bucket)
      if (!base?.slug) continue

      const body = pickLocalized(bucket, 'body')
      // Una página legal sin cuerpo no sirve de nada: mejor la estática.
      if (!body.es.trim()) continue

      fromCms.set(base.slug as string, {
        id: base.slug as string,
        title: pickLocalized(bucket, 'title'),
        intro: pickLocalized(bucket, 'intro'),
        body,
        lastUpdated: (base.lastUpdated as string) || new Date().toISOString().slice(0, 10),
        seo: seoOverride(base),
      })
    }
  }

  // El orden y el conjunto de documentos los fija el código: así, añadir una
  // página en el CMS no la cuela en el pie de página sin enlazarla a
  // conciencia, y quitarla por error no deja el sitio sin aviso legal.
  return staticLegal.map((fallback) => fromCms.get(fallback.id) ?? fallback)
})

export async function getLegalPage(slug: string): Promise<LegalPage | undefined> {
  const pages = await getLegalPages()
  return pages.find((page) => page.id === slug)
}
