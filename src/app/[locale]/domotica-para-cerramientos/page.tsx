import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Lightbulb, Sparkles, Wifi } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { JsonLd } from '@/components/seo/JsonLd'
import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { getDictionary } from '@/i18n'
import { localeMeta, type Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
import { absolute, alternates, breadcrumbSchema, jsonLd, ORG_NAME, ORG_URL, SITE_URL } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.homeAutomation.title,
    description: dict.homeAutomation.subtitle,
    alternates: alternates('/domotica-para-cerramientos', locale),
    openGraph: {
      type: 'article',
      title: dict.homeAutomation.title,
      description: dict.homeAutomation.subtitle,
      url: absolute(`/${locale}/domotica-para-cerramientos`),
      images: [{ url: absolute('/paginas/domotica-cabecera.jpg') }],
    },
  }
}

export default async function HomeAutomationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const page = dict.homeAutomationPage

  const pillars = [
    { key: 'vision', icon: Lightbulb, ...page.pillars.vision },
    { key: 'design', icon: Sparkles, ...page.pillars.design },
    { key: 'connectivity', icon: Wifi, ...page.pillars.connectivity },
  ] as const

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.homeAutomation.title, path: `/${locale}/domotica-para-cerramientos` },
  ]

  /**
   * `Article` mas la pregunta respondida en un `FAQPage`. El marcado de
   * preguntas ya no da resultados destacados en Google, pero el par
   * pregunta-respuesta en el texto visible sigue siendo lo que un buscador
   * con IA extrae y cita, y esta pagina existe justo para responder «que es
   * la domotica para cerramientos».
   */
  const articleSchema = {
    '@type': 'Article',
    '@id': absolute(`/${locale}/domotica-para-cerramientos#article`),
    headline: dict.homeAutomation.title,
    description: dict.homeAutomation.subtitle,
    url: absolute(`/${locale}/domotica-para-cerramientos`),
    image: absolute('/paginas/domotica-cabecera.jpg'),
    inLanguage: localeMeta[locale].htmlLang,
    author: { '@type': 'Organization', name: ORG_NAME, url: ORG_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: dict.homeAutomation.title,
  }

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: page.whatTitle,
        acceptedAnswer: { '@type': 'Answer', text: `${page.whatText} ${page.whatText2}` },
      },
      {
        '@type': 'Question',
        name: page.remoteTitle,
        acceptedAnswer: { '@type': 'Answer', text: `${page.remoteText} ${page.remoteText2}` },
      },
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd(articleSchema, faqSchema, breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={dict.homeAutomation.eyebrow}
        title={<GradientTitle text={dict.homeAutomation.title} />}
        subtitle={dict.homeAutomation.subtitle}
      />

      <Section>
        <SectionHeading title={page.pillarsTitle} align="center" />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map(({ key, icon: Icon, title, description }) => (
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

      {/* La pregunta como encabezado y la respuesta justo debajo: es lo que un
          buscador extrae para responder, y de paso se lee mejor. */}
      <Section className="border-t border-line bg-bg-subtle">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{page.whatTitle}</h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-fg-muted">{page.whatText}</p>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-fg-muted">{page.whatText2}</p>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-500">
              {page.controlTitle}
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{page.remoteTitle}</h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-fg-muted">{page.remoteText}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">{page.remoteText2}</p>

            <div className="mt-8">
              <ButtonLink href={routes.dispositivos(locale)} variant="outline">
                {page.devicesCta}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/paginas/domotica-control.jpg"
              alt={page.remoteTitle}
              fill
              sizes="(max-width: 1024px) 100vw, 32rem"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-bg-subtle">
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-brand-500/6 px-7 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            {dict.homeAutomation.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-fg-muted">
            {dict.homeAutomation.ctaText}
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
