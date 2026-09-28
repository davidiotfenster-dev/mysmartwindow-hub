import type { Metadata } from 'next'
import {
  ArrowRight,
  BellRing,
  Download,
  Lightbulb,
  Lock,
  Puzzle,
  Radar,
  Shapes,
} from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { JsonLd } from '@/components/seo/JsonLd'
import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
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

      <PageHeader
        eyebrow={dict.app.eyebrow}
        title={<GradientTitle text={dict.app.title} />}
        subtitle={dict.app.subtitle}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href={EXTERNAL.appStore} external variant="secondary" size="md">
            <Download className="h-4 w-4" />
            {dict.app.appStore}
          </ButtonLink>
          <ButtonLink href={EXTERNAL.googlePlay} external variant="secondary" size="md">
            <Download className="h-4 w-4" />
            {dict.app.googlePlay}
          </ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <SectionHeading eyebrow={dict.app.downloadTitle} title={dict.app.title} align="center" />

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
