import { alternates } from '@/lib/seo'
import type { Metadata } from 'next'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { Ecosystems } from '@/components/sections/Ecosystems'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

/**
 * Se regenera cada hora contra el CMS. Sin esto la pagina se queda
 * congelada en la version que se genero al construir la imagen, que es
 * anterior a que hubiera contenido, y no se entera de nada.
 */
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.ecosystems.title,
    description: dict.ecosystems.subtitle,
    alternates: alternates('/ecosistemas', locale),
  }
}

export default async function EcosystemsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <>
      <PageHeader
        eyebrow={dict.ecosystems.eyebrow}
        title={<GradientTitle text={dict.ecosystems.title} />}
        subtitle={dict.ecosystems.subtitle}
      />
      <Ecosystems locale={locale} dict={dict} />
    </>
  )
}
