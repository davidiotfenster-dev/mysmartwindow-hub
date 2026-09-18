import { Suspense } from 'react'
import { ArrowRight } from 'lucide-react'

import { Hero } from '@/components/sections/Hero'
import { Pillars } from '@/components/sections/Pillars'
import { CategoryGrid } from '@/components/sections/CategoryGrid'
import { LatestVideos } from '@/components/sections/LatestVideos'
import { DevicesShowcase } from '@/components/sections/DevicesShowcase'
import { EngineeringTeaser } from '@/components/sections/Engineering'
import { Ecosystems } from '@/components/sections/Ecosystems'
import { Values } from '@/components/sections/Values'
import { NewsTeaser } from '@/components/sections/NewsTeaser'
import { Faq } from '@/components/sections/Faq'
import { ButtonLink } from '@/components/ui/primitives'
import { ChevronRain } from '@/components/ui/motion'
import { VideoRailSkeleton } from '@/components/videos/VideoRailSkeleton'
import { getCategories, getFaqs, getResources } from '@/lib/content'
import { getDictionary } from '@/i18n'
import { routes } from '@/lib/navigation'
import type { Locale } from '@/i18n/config'

export const revalidate = 3600

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const [dict, categories, resources, faqs] = await Promise.all([
    getDictionary(locale),
    getCategories(),
    getResources(),
    getFaqs(),
  ])

  const stats = {
    manuals: resources.filter((r) => r.type === 'manual').length,
    videos: resources.filter((r) => r.type === 'video').length,
    cards: resources.filter((r) => r.type === 'tarjeta').length,
    categories: categories.length,
  }

  return (
    <>
      <Hero locale={locale} dict={dict} stats={stats} />
      {/* Los dispositivos son lo primero: son el producto, el resto es apoyo */}
      <DevicesShowcase locale={locale} dict={dict} />
      <Pillars locale={locale} dict={dict} />
      <EngineeringTeaser locale={locale} dict={dict} />
      <CategoryGrid locale={locale} dict={dict} />

      {/* El carril de vídeos depende de YouTube: no bloquea el resto de la página */}
      <Suspense fallback={<VideoRailSkeleton />}>
        <LatestVideos locale={locale} dict={dict} />
      </Suspense>

      <Ecosystems locale={locale} dict={dict} />
      <Values dict={dict} />
      <NewsTeaser locale={locale} dict={dict} />
      <Faq locale={locale} dict={dict} faqs={faqs} />

      {/* Llamada final */}
      <section className="relative overflow-hidden border-t border-line py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-80 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-brand-500/18 blur-[110px]" />
          <div className="grid-tech absolute inset-0 opacity-50" />
          <ChevronRain count={8} />
        </div>

        <div className="container-page text-center">
          <h2 className="mx-auto max-w-3xl text-3xl sm:text-5xl">
            {dict.hero.title} <span className="text-gradient">{dict.hero.titleAccent}</span>{' '}
            {dict.hero.titleEnd}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-fg-muted">
            {dict.explorer.subtitle}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 xs:flex-row">
            <ButtonLink href={routes.recursos(locale)} size="lg" className="w-full xs:w-auto">
              {dict.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={routes.contacto(locale)}
              size="lg"
              variant="secondary"
              className="w-full xs:w-auto"
            >
              {dict.nav.contacto}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
