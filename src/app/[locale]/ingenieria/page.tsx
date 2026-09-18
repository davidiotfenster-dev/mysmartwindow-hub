import type { Metadata } from 'next'
import { ArrowRight, Check } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { EngineeringStack } from '@/components/sections/Engineering'
import { JsonLd } from '@/components/seo/JsonLd'
import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
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
    title: dict.engineering.title,
    description: dict.engineering.subtitle,
    alternates: alternates('/ingenieria', locale),
    openGraph: {
      type: 'website',
      title: dict.engineering.title,
      description: dict.engineering.subtitle,
      url: absolute(`/${locale}/ingenieria`),
    },
  }
}

export default async function EngineeringPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  const reasons = [
    dict.engineering.reasons.fit,
    dict.engineering.reasons.single,
    dict.engineering.reasons.evolves,
  ]

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.engineering.eyebrow, path: `/${locale}/ingenieria` },
  ]

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={dict.engineering.eyebrow}
        title={<GradientTitle text={dict.engineering.title} />}
        subtitle={dict.engineering.subtitle}
      />

      <EngineeringStack dict={dict} />

      <Section className="border-t border-line bg-bg-subtle">
        <SectionHeading title={dict.engineering.reasonsTitle} align="center" />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-bg-elevated/60 p-7">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500/10 text-brand-500">
                  <Check className="h-4.5 w-4.5" strokeWidth={2.4} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{reason.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-fg-muted">
                  {reason.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-brand-500/6 px-7 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            {dict.engineering.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-fg-muted">
            {dict.engineering.ctaText}
          </p>
          <div className="mt-8">
            <ButtonLink href={routes.contacto(locale)} size="lg">
              {dict.engineering.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
