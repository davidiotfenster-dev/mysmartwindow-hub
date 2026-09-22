import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink, Mail, MapPin } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { JsonLd } from '@/components/seo/JsonLd'
import { Badge, ButtonLink, Section } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { getPartners } from '@/lib/content'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import { absolute, alternates, breadcrumbSchema, jsonLd } from '@/lib/seo'

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
    title: dict.partners.title,
    description: dict.partners.subtitle,
    alternates: alternates('/distribuidores', locale),
  }
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const partners = await getPartners()

  // ItemList de organizaciones: describe la relación de distribución para buscadores
  const listSchema = {
    '@type': 'ItemList',
    '@id': absolute(`/${locale}/distribuidores#list`),
    name: dict.partners.title,
    itemListElement: partners.map((partner, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: partner.name,
        url: partner.url,
        description: partner.description[locale],
      },
    })),
  }

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.partners.title, path: `/${locale}/distribuidores` },
  ]

  return (
    <>
      <JsonLd data={jsonLd(listSchema, breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={dict.partners.eyebrow}
        title={<GradientTitle text={dict.partners.title} />}
        subtitle={dict.partners.subtitle}
      />

      <Section>
        {/* Aviso claro: no hay compra online, es B2B a través del distribuidor */}
        <div className="mb-10 rounded-2xl border border-amber-500/25 bg-amber-500/8 px-5 py-4 text-[0.88rem] leading-relaxed text-fg-muted">
          {dict.partners.noOnlineNotice}
        </div>

        <Stagger className="grid gap-6 md:grid-cols-2">
          {partners.map((partner) => (
            <StaggerItem key={partner.id} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/70 p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_26px_60px_-32px_rgb(0_0_0/0.35)]">
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: partner.accent }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {partner.logo ? (
                      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white p-2 ring-1 ring-line/60">
                        <Image
                          src={partner.logo}
                          alt={`Logo de ${partner.name}`}
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      </span>
                    ) : null}
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-tight">
                        {partner.name}
                      </h2>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] uppercase tracking-[0.12em] text-fg-subtle">
                        <MapPin className="h-3 w-3" />
                        {partner.country[locale]}
                      </p>
                    </div>
                  </div>
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: partner.accent }}
                    aria-hidden="true"
                  />
                </div>

                <p className="relative mt-3 font-semibold text-fg">{partner.tagline[locale]}</p>

                <p className="relative mt-3 text-[0.9rem] leading-relaxed text-fg-muted">
                  {partner.description[locale]}
                </p>

                {partner.brands.length > 0 && (
                  <div className="relative mt-6 border-t border-line pt-5">
                    <p className="mb-2.5 text-[0.7rem] uppercase tracking-[0.14em] text-fg-subtle">
                      {dict.partners.brandsLabel}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.brands.map((brand) => (
                        <Badge key={brand} tone="neutral">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative mt-6 flex flex-wrap gap-2.5 pt-1">
                  <ButtonLink href={partner.url} external size="sm">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {dict.partners.visitSite}
                  </ButtonLink>
                  <ButtonLink href={partner.contactUrl} external size="sm" variant="outline">
                    <Mail className="h-3.5 w-3.5" />
                    {dict.partners.contact}
                  </ButtonLink>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  )
}
