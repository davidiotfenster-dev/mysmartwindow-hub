import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export interface NavItem {
  href: string
  label: string
  /** Enlace fuera de esta demo, al sitio corporativo. */
  external?: boolean
  children?: NavItem[]
}

/** Las rutas comparten slug en los tres idiomas: enlaces estables y compartibles. */
export const routes = {
  home: (l: Locale) => `/${l}`,
  recursos: (l: Locale) => `/${l}/recursos`,
  videos: (l: Locale) => `/${l}/videos`,
  dispositivos: (l: Locale) => `/${l}/dispositivos`,
  dispositivo: (l: Locale, id: string) => `/${l}/dispositivos/${id}`,
  ingenieria: (l: Locale) => `/${l}/ingenieria`,
  ecosistemas: (l: Locale) => `/${l}/ecosistemas`,
  noticias: (l: Locale) => `/${l}/noticias`,
  noticia: (l: Locale, slug: string) => `/${l}/noticias/${slug}`,
  soporte: (l: Locale) => `/${l}/soporte`,
  contacto: (l: Locale) => `/${l}/contacto`,
  distribuidores: (l: Locale) => `/${l}/distribuidores`,
} as const

export const EXTERNAL = {
  corporate: 'https://www.iotfenster.com',
  clientArea: 'https://www.iotfenster.com/area-cliente/',
  privacy: 'https://www.iotfenster.com/politica-de-privacidad/',
  legal: 'https://www.iotfenster.com/aviso-legal',
  linkedin: 'https://www.linkedin.com/company/iotfenster/',
  youtube: 'https://www.youtube.com/@MySmartWindow',
  tiktok: 'https://www.tiktok.com/@iotfenster',
} as const

export function mainNav(locale: Locale, dict: Dictionary): NavItem[] {
  return [
    { href: routes.recursos(locale), label: dict.nav.recursos },
    { href: routes.videos(locale), label: dict.nav.videos },
    { href: routes.dispositivos(locale), label: dict.nav.dispositivos },
    { href: routes.ingenieria(locale), label: dict.nav.ingenieria },
    { href: routes.ecosistemas(locale), label: dict.nav.ecosistemas },
    { href: routes.distribuidores(locale), label: dict.nav.distribuidores },
    { href: routes.noticias(locale), label: dict.nav.noticias },
    { href: routes.soporte(locale), label: dict.nav.soporte },
  ]
}

/** Cambia el idioma conservando la ruta actual. */
export function switchLocalePath(pathname: string, next: Locale): string {
  const segments = pathname.split('/')
  if (segments.length > 1) segments[1] = next
  return segments.join('/') || `/${next}`
}
