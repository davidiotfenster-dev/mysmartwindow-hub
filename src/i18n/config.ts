export const locales = ['es', 'en', 'it'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

/** Cualquier cadena que exista en los tres idiomas del sitio. */
export type Localized = Record<Locale, string>

export const localeMeta: Record<Locale, { label: string; flag: string; htmlLang: string }> = {
  es: { label: 'Español', flag: '🇪🇸', htmlLang: 'es-ES' },
  en: { label: 'English', flag: '🇬🇧', htmlLang: 'en-GB' },
  it: { label: 'Italiano', flag: '🇮🇹', htmlLang: 'it-IT' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Devuelve la traduccion, con fallback a español si falta. */
export function t(value: Localized | string, locale: Locale): string {
  if (typeof value === 'string') return value
  return value[locale] || value[defaultLocale]
}
