import Link from 'next/link'
import { headers } from 'next/headers'

import { LogoMark } from '@/components/brand/Logo'
import { getDictionary } from '@/i18n'
import { defaultLocale, isLocale } from '@/i18n/config'

/**
 * El 404 no recibe params, asi que el idioma sale de la cabecera que pone el
 * middleware: antes se mostraba siempre en castellano aunque el visitante
 * viniera navegando por /it.
 */
export default async function NotFound() {
  const pathname = (await headers()).get('x-pathname') ?? ''
  const candidate = pathname.split('/')[1]
  const locale = isLocale(candidate) ? candidate : defaultLocale
  const dict = getDictionary(locale)

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-tech absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/3 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-500/15 blur-[110px]" />
      </div>

      <div className="container-page text-center">
        <LogoMark className="mx-auto h-16 w-16 text-brand-500/40" />
        <p className="mt-8 font-display text-7xl font-bold text-brand-500 sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">{dict.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-fg-muted">
          {dict.notFound.subtitle}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 xs:flex-row">
          <Link
            href={`/${locale}/recursos`}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-500 px-8 font-semibold text-white transition-colors hover:bg-brand-400 xs:w-auto"
          >
            {dict.notFound.cta}
          </Link>
          <Link
            href={`/${locale}`}
            className="glass inline-flex h-12 w-full items-center justify-center rounded-full px-8 font-semibold transition-colors hover:text-brand-500 xs:w-auto"
          >
            {dict.notFound.home}
          </Link>
        </div>
      </div>
    </section>
  )
}
