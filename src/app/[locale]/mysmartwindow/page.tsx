import type { Metadata } from 'next'
import { Apple, ArrowRight, BellRing, Lightbulb, Lock, Play, Puzzle, Radar, Shapes } from 'lucide-react'

import { AppPhoneMockup, StoreBadge } from '@/components/app/AppMockup'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { JsonLd } from '@/components/seo/JsonLd'
import { ButtonLink, Eyebrow, Section, SectionHeading } from '@/components/ui/primitives'
import { ChevronRain, Stagger, StaggerItem } from '@/components/ui/motion'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import { EXTERNAL, routes } from '@/lib/navigation'
import { absolute, alternates, breadcrumbSchema, jsonLd } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.app.title,
    description: dict.app.subtitle,
    alternates: alternates('/mysmartwindow', locale),
    openGraph: {
      type: 'website',
      title: dict.app.title,
      description: dict.app.subtitle,
      url: absolute(`/${locale}/mysmartwindow`),
    },
  }
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  const features = [
    { Icon: Shapes, data: dict.app.features.twin },
    { Icon: Lock, data: dict.app.features.lock },
    { Icon: Lightbulb, data: dict.app.features.lighting },
    { Icon: Radar, data: dict.app.features.remote },
    { Icon: BellRing, data: dict.app.features.alerts },
    { Icon: Puzzle, data: dict.app.features.ecosystems },
  ]

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.app.eyebrow, path: `/${locale}/mysmartwindow` },
  ]

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      {/* Cabecera propia a dos columnas -texto + móvil real-, en vez del
          PageHeader genérico de una sola columna: es la app de la marca y
          merece la misma presencia que el hero de portada. */}
      <header className="relative overflow-hidden border-b border-line pb-16 pt-28 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="grid-tech absolute inset-0 mask-fade-b opacity-60" />
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/15 blur-[110px]" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-signal-500/10 blur-[110px]" />
          <ChevronRain count={7} className="opacity-60" />
        </div>

        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="max-w-xl">
              <Eyebrow>{dict.app.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">
                <GradientTitle text={dict.app.title} />
              </h1>
              <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-fg-muted">
                {dict.app.subtitle}
              </p>

              <p className="mt-9 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                {dict.app.downloadTitle}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <StoreBadge
                  href={EXTERNAL.appStore}
                  icon={Apple}
                  kicker="App Store"
                  label={dict.app.appStore}
                />
                <StoreBadge
                  href={EXTERNAL.googlePlay}
                  icon={Play}
                  kicker="Google Play"
                  label={dict.app.googlePlay}
                />
              </div>
            </div>

            <AppPhoneMockup />
          </div>
        </div>
      </header>

      <Section>
        <SectionHeading eyebrow={dict.app.eyebrow} title={dict.app.title} align="center" />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, data }) => (
            <StaggerItem key={data.title} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-bg-elevated/60 p-7 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/10 text-brand-500">
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{data.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-fg-muted">
                  {data.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="border-t border-line">
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-brand-500/6 px-7 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            {dict.app.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-fg-muted">
            {dict.app.ctaText}
          </p>
          <div className="mt-8">
            <ButtonLink href={routes.dispositivos(locale)} size="lg">
              {dict.app.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
