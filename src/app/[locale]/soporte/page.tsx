import { absolute, alternates, breadcrumbSchema, jsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqs } from '@/data/faq'
import { localeMeta } from '@/i18n/config'
import type { Metadata } from 'next'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { Faq } from '@/components/sections/Faq'
import { Values } from '@/components/sections/Values'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.nav.soporte,
    description: dict.faq.subtitle,
    alternates: alternates('/soporte', locale),
  }
}

export default async function SupportPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  // FAQPage: es lo que hace que las respuestas puedan salir desplegadas en Google
  const faqSchema = {
    '@type': 'FAQPage',
    '@id': absolute(`/${locale}/soporte#faq`),
    inLanguage: localeMeta[locale].htmlLang,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question[locale],
      acceptedAnswer: { '@type': 'Answer', text: item.answer[locale] },
    })),
  }

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.nav.soporte, path: `/${locale}/soporte` },
  ]

  return (
    <>
      <JsonLd data={jsonLd(faqSchema, breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={dict.faq.eyebrow}
        title={<GradientTitle text={dict.nav.soporte} />}
        subtitle={dict.values.support.description}
      />
      <Faq locale={locale} dict={dict} />
      <div className="border-t border-line bg-bg-subtle">
        <Values dict={dict} />
      </div>
    </>
  )
}
