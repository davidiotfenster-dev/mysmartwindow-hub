import es, { type Dictionary } from './dictionaries/es'
import en from './dictionaries/en'
import it from './dictionaries/it'
import { defaultLocale, isLocale, type Locale } from './config'

const dictionaries: Record<Locale, Dictionary> = { es, en, it }

export function getDictionary(locale: string): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale]
}

export type { Dictionary }
export * from './config'
