import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ClipboardCheck, Compass, Network, Palette, ShieldCheck, Target } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { JsonLd } from '@/components/seo/JsonLd'
import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { getDictionary } from '@/i18n'
import { localeMeta, type Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
import { absolute, alternates, breadcrumbSchema, jsonLd, SITE_URL } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.consulting.title,
    description: dict.consulting.subtitle,
    alternates: alternates('/ingenieria/consultoria', locale),
    openGraph: {
      type: 'website',
      title: dict.consulting.title,
      description: dict.consulting.subtitle,
      url: absolute(`/${locale}/ingenieria/consultoria`),
    },
  }
}

export default async function ConsultingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const page = dict.consultingPage

  const services = [
    { key: 'needs', icon: Compass, ...page.services.needs },
    { key: 'goals', icon: Target, ...page.services.goals },
    { key: 'compliance', icon: ShieldCheck, ...page.services.compliance },
    { key: 'materials', icon: ClipboardCheck, ...page.services.materials },
    { key: 'network', icon: Network, ...page.services.network },
    { key: 'design', icon: Palette, ...page.services.design },
  ] as const

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.engineering.eyebrow, path: `/${locale}/ingenieria` },
    { name: dict.consulting.title, path: `/${locale}/ingenieria/consultoria` },
  ]

  // `Service` con su catalogo: es lo que permite responder «quien hace
  // consultoria de IoT» citando esta pagina, y no solo la portada.
  const serviceSchema = {
    '@type': 'Service',
    '@id': absolute(`/${locale}/ingenieria/consultoria#service`),
    name: dict.consulting.title,
    description: dict.consulting.subtitle,
    serviceType: 'IoT innovation consulting',
    inLanguage: localeMeta[locale].htmlLang,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'España' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: page.servicesTitle,
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.description },
      })),
    },
  }

  return (
    <>
      <JsonLd data={jsonLd(serviceSchema, breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={dict.consulting.eyebrow}
        title={<GradientTitle text={dict.consulting.title} />}
        subtitle={dict.consulting.subtitle}
      />

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-500">
            {page.lead}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{page.leadTitle}</h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-fg-muted">{page.leadText}</p>
        </div>
      </Section>

      <Section className="border-t border-line bg-bg-subtle">
        <SectionHeading title={page.servicesTitle} align="center" />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, icon: Icon, title, description }) => (
            <StaggerItem key={key} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-bg-elevated/60 p-7">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500/10 text-brand-500">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-fg-muted">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/paginas/consultoria-iot.jpg"
              alt={dict.consulting.title}
              fill
              sizes="(max-width: 1024px) 100vw, 32rem"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{page.aboutTitle}</h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-fg-muted">{page.aboutText}</p>
            <h3 className="mt-8 font-display text-lg font-bold">{page.precisionTitle}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{page.precisionText}</p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line bg-bg-subtle">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{page.closingTitle}</h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-fg-muted">{page.closingText}</p>
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-brand-500/6 px-7 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            {dict.consulting.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-fg-muted">
            {dict.consulting.ctaText}
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
