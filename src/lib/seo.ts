import type { Metadata } from 'next'
import { locales, localeMeta, type Locale } from '@/i18n/config'

/**
 * Utilidades de SEO.
 *
 * El objetivo es que cada pieza de contenido tenga su propia URL indexable,
 * sus alternativas de idioma correctas y datos estructurados. El portal
 * original enlaza cada manual directamente al PDF y cada video a youtube.com,
 * asi que no posiciona ninguno de los dos: todo el valor se lo queda YouTube.
 */

/**
 * Origen público del sitio. En producción DEBE apuntar al dominio real: de él
 * salen las URLs canónicas, el sitemap y las alternativas de idioma. Si se
 * queda en localhost, los buscadores reciben URLs inservibles.
 */
const siteUrlEnv = process.env.NEXT_PUBLIC_SITE_URL
if (
  process.env.NODE_ENV === 'production' &&
  (!siteUrlEnv || /localhost|127\.0\.0\.1/.test(siteUrlEnv))
) {
  // Sin esto el fallo es mudo: el sitio despliega y funciona, pero publica un
  // sitemap y unas canonicas que no llevan a ninguna parte. Se comprueba que
  // este puesta Y que no sea localhost, porque el valor de ejemplo del
  // docker-compose lo es y pasaria desapercibido.
  throw new Error(
    `NEXT_PUBLIC_SITE_URL tiene que ser la direccion publica del sitio, y vale ${siteUrlEnv ?? '(nada)'}. ` +
      'Se incrusta al construir la imagen: corrigela en el build arg del servicio web de docker-compose.yml y vuelve a construir.'
  )
}

const ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '')

export const SITE_URL = `${ORIGIN}${BASE}`

export const SITE_NAME = 'MySmartWindow'
export const ORG_NAME = 'IoT Fenster'
export const ORG_URL = 'https://www.iotfenster.com'

export function absolute(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Alternativas de idioma completas.
 *
 * El sitio original declara es-ES, en-GB, es y en — pero se deja fuera el
 * italiano pese a publicar /it/, y no declara x-default. Aqui van los tres
 * idiomas y el x-default apuntando al español.
 */
export function alternates(path: string, locale: Locale): Metadata['alternates'] {
  const suffix = path.replace(/^\/+/, '')
  const forLocale = (l: Locale) => `/${l}${suffix ? `/${suffix}` : ''}`

  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[localeMeta[l].htmlLang] = forLocale(l)
    languages[l] = forLocale(l)
  }
  languages['x-default'] = forLocale('es')

  return { canonical: forLocale(locale), languages }
}

/** Recorta a la longitud recomendada sin partir palabras. */
export function clamp(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 1).replace(/[\s,;:.—-]+\S*$/, '')}…`
}

/**
 * Bloque de SEO editable desde el CMS (componente `shared.seo` en Strapi).
 * Cuando el editor lo rellena, sustituye al titulo/descripcion generados
 * automaticamente a partir del contenido.
 */
export interface SeoOverride {
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  ogImage?: string
}

/** El bloque SEO es distinto en cada idioma: se guarda uno por locale. */
export type LocalizedSeo = Partial<Record<Locale, SeoOverride>>

/** El override del CMS manda; si no existe o esta vacio, se usa el generado. */
export function resolveTitle(override: SeoOverride | undefined, generated: string, max = 70): string {
  return clamp(override?.metaTitle || generated, max)
}

export function resolveDescription(
  override: SeoOverride | undefined,
  generated: string,
  max = 155
): string {
  return clamp(override?.metaDescription || generated, max)
}

/* ==========================================================================
   Datos estructurados
   ========================================================================== */

export function organizationSchema(description?: string) {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: ORG_NAME,
    url: ORG_URL,
    description:
      description ||
      'Ingeniería electrónica e IoT para fabricantes de cerramientos: domótica para ventanas, puertas, persianas y toldos.',
    sameAs: [
      'https://www.linkedin.com/company/iotfenster/',
      'https://www.youtube.com/@MySmartWindow',
    ],
    logo: absolute('/icon.svg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avda. Isaac Peral s/n, Parque Tecnológico Fuente Álamo',
      addressLocality: 'Fuente Álamo de Murcia',
      addressRegion: 'Murcia',
      postalCode: '30320',
      addressCountry: 'ES',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@iotfenster.com',
      availableLanguage: ['es', 'en', 'it'],
    },
  }
}

export function websiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: absolute(`/${locale}`),
    name: `${SITE_NAME} — ${ORG_NAME}`,
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { '@id': `${SITE_URL}/#organization` },
    // Permite el cuadro de busqueda de sitio en Google
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absolute(`/${locale}/recursos?q={search_term_string}`),
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

/** Envuelve uno o varios nodos en un @graph con el contexto correcto. */
export function jsonLd(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
