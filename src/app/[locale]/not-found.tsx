import { NotFoundContent } from '@/components/layout/NotFoundContent'
import { getDictionary } from '@/i18n'
import { locales, type Locale } from '@/i18n/config'

/**
 * El 404 no recibe params, asi que el idioma lo elige NotFoundContent a partir
 * de la direccion: antes se mostraba siempre en castellano aunque el visitante
 * viniera navegando por /it.
 */
export default function NotFound() {
  const texts = Object.fromEntries(
    locales.map((locale) => [locale, getDictionary(locale).notFound])
  ) as Record<Locale, ReturnType<typeof getDictionary>['notFound']>

  return <NotFoundContent texts={texts} />
}
