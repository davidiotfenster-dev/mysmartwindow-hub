import { alternates } from '@/lib/seo'
import type { Metadata } from 'next'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { DevicesShowcase } from '@/components/sections/DevicesShowcase'
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
    title: dict.devices.title,
    description: dict.devices.subtitle,
    alternates: alternates('/dispositivos', locale),
  }
}

export default async function DevicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <>
      <PageHeader
        eyebrow={dict.devices.eyebrow}
        title={<GradientTitle text={dict.devices.title} />}
        subtitle={dict.devices.subtitle}
      />
      <DevicesShowcase locale={locale} dict={dict} />
    </>
  )
}
