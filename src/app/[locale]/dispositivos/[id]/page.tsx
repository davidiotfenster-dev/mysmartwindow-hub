import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'

import { JsonLd } from '@/components/seo/JsonLd'
import { LogoMark } from '@/components/brand/Logo'
import { Badge, ButtonLink, Section, SectionHeading } from '@/components/ui/primitives'
import { DeviceGallery } from '@/components/devices/DeviceGallery'
import { ResourceRail } from '@/components/resources/ResourceRail'
import { resourceTypeMeta } from '@/data/taxonomy'
import { getCategoryMap, getDeviceMap, getDevices, getResources } from '@/lib/content'
import { getDictionary } from '@/i18n'
import { fill } from '@/lib/utils'
import { locales, localeMeta, type Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
import { toResourceViews } from '@/lib/resource-view'
import {
  absolute,
  alternates,
  breadcrumbSchema,
  jsonLd,
  ORG_NAME,
  ORG_URL,
  resolveDescription,
  resolveTitle,
} from '@/lib/seo'
import { getVideoMap } from '@/lib/youtube'

export const revalidate = 3600

export async function generateStaticParams() {
  const devices = await getDevices()
  return locales.flatMap((locale) => devices.map((d) => ({ locale, id: d.id })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  const [devices, resources] = await Promise.all([getDevices(), getResources()])
  const device = devices.find((d) => d.id === id)
  if (!device) return {}
  const dict = getDictionary(locale)

  const count = resources.filter((r) => r.device === device.id).length
  // La plantilla del layout ya añade " · MySmartWindow"
  const generatedTitle = `${device.name} — ${device.tagline[locale]}`
  const generatedDescription = `${device.description[locale]} ${fill(
    count === 1 ? dict.seoMeta.deviceResource : dict.seoMeta.deviceResources,
    { count }
  )}`

  const title = resolveTitle(device.seo?.[locale], generatedTitle)
  const description = resolveDescription(device.seo?.[locale], generatedDescription)

  return {
    title,
    description,
    alternates: alternates(`/dispositivos/${id}`, locale),
    openGraph: {
      type: 'website',
      title: resolveTitle(device.seo?.[locale], `${device.name} — ${device.tagline[locale]}`),
      description,
      url: absolute(`/${locale}/dispositivos/${id}`),
      ...(device.seo?.[locale]?.ogImage ? { images: [{ url: device.seo[locale]!.ogImage! }] } : device.photo ? { images: [{ url: device.photo }] } : {}),
    },
    keywords: [device.name, 'MySmartWindow', 'IoT Fenster', ...dict.seoMeta.keywords],
  }
}

export default async function DevicePage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}) {
  const { locale, id } = await params
  const [devices, deviceMap, resources, dict, videoMap, categoryMap] = await Promise.all([
    getDevices(),
    getDeviceMap(),
    getResources(),
    getDictionary(locale),
    getVideoMap(),
    getCategoryMap(),
  ])
  const device = devices.find((d) => d.id === id)
  if (!device) notFound()

  const own = resources.filter((r) => r.device === device.id)
  const views = await toResourceViews(own, locale, videoMap)

  const byType = {
    manual: views.filter((r) => r.type === 'manual'),
    video: views.filter((r) => r.type === 'video'),
    tarjeta: views.filter((r) => r.type === 'tarjeta'),
  }

  // Categorías que cubre este dispositivo, para enlazar hacia el explorador
  const coveredCategories = Array.from(new Set(own.map((r) => r.category))).map(
    (c) => categoryMap[c]
  )

  // La portada abre el carrete y las fotos del CMS van detrás, sin repetirla.
  const photos = [device.photo, ...(device.gallery ?? [])].filter(
    (src, i, all): src is string => Boolean(src) && all.indexOf(src) === i
  )

  const others = devices.filter((d) => d.id !== device.id).slice(0, 4)

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.devices.title, path: `/${locale}/dispositivos` },
    { name: device.name, path: `/${locale}/dispositivos/${id}` },
  ]

  const productSchema = {
    '@type': 'Product',
    '@id': absolute(`/${locale}/dispositivos/${id}#product`),
    name: device.name,
    description: device.description[locale],
    category: dict.seoMeta.productCategory,
    brand: { '@type': 'Brand', name: ORG_NAME },
    manufacturer: { '@type': 'Organization', name: ORG_NAME, url: ORG_URL },
    inLanguage: localeMeta[locale].htmlLang,
    // En los datos estructurados la URL tiene que ser absoluta: la lee Google,
    // no el navegador (las de Open Graph las completa Next con metadataBase).
    ...(device.photo ? { image: absolute(device.photo) } : {}),
    additionalProperty: device.features.map((f) => ({
      '@type': 'PropertyValue',
      name: f[locale],
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd(productSchema, breadcrumbSchema(crumbs))} />

      {/* ---------- Cabecera ---------- */}
      <header className="relative overflow-hidden border-b border-line pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="grid-tech absolute inset-0 mask-fade-b opacity-60" />
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/15 blur-[110px]" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-signal-500/10 blur-[110px]" />
        </div>

        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.78rem] text-fg-subtle">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {crumbs.slice(0, -1).map((crumb) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  <Link href={crumb.path} className="transition-colors hover:text-brand-500">
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li className="text-fg-muted">{device.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl">{device.name}</h1>
              <p className="mt-3 font-display text-lg font-semibold text-brand-500 sm:text-xl">
                {device.tagline[locale]}
              </p>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-fg-muted">
                {device.description[locale]}
              </p>

              {device.features.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
                  {device.features.map((feature) => (
                    <li
                      key={feature.es}
                      className="inline-flex items-center gap-2 text-[0.88rem] text-fg-muted"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-brand-500" strokeWidth={3} />
                      {feature[locale]}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-2.5">
                <ButtonLink href={`${routes.recursos(locale)}?dispositivo=${device.id}`}>
                  {dict.devices.resourcesFor}
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                {/* La ficha comercial vivía en el WordPress corporativo, que se
                    retira: sus especificaciones, fotos y vídeos pasarán a esta
                    misma página, así que el botón hacia fuera sobra. */}
              </div>
            </div>

            <div className="space-y-5">
              <DeviceGallery
                name={device.name}
                photos={photos}
                videos={device.videos ?? []}
                playLabel={dict.common.watch}
              />

              {/* Resumen de material disponible */}
              <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 p-7">
                {!device.photo && (
                  <LogoMark className="pointer-events-none absolute -right-6 -top-4 h-28 w-28 text-brand-500/6" />
                )}
                <p className="relative font-display text-sm font-bold uppercase tracking-[0.16em] text-fg-subtle">
                  {dict.devices.resourcesFor}
                </p>
                <dl className="relative mt-5 space-y-3.5">
                  {(['manual', 'video', 'tarjeta'] as const).map((type) => (
                    <div key={type} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[0.9rem] text-fg-muted">
                        {resourceTypeMeta[type].label[locale]}
                      </dt>
                      <dd className="font-display text-2xl font-bold text-brand-500">
                        {byType[type].length}
                      </dd>
                    </div>
                  ))}
                </dl>

                {coveredCategories.length > 0 && (
                  <div className="relative mt-6 border-t border-line pt-5">
                    <p className="text-[0.72rem] uppercase tracking-[0.12em] text-fg-subtle">
                      {dict.common.category}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {coveredCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`${routes.recursos(locale)}?cat=${category.id}&dispositivo=${device.id}`}
                        >
                          <Badge tone="neutral" className="transition-colors hover:border-brand-500/50">
                            {category.name[locale]}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Variantes del dispositivo ---------- */}
      {device.variants && device.variants.length > 0 && (
        <Section className="border-b border-line bg-bg-subtle !py-10">
          <SectionHeading eyebrow={device.name} title={{ es: 'Modelos disponibles', en: 'Available models', it: 'Modelli disponibili' }[locale] || 'Modelos disponibles'} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {device.variants.map((vId) => {
              const variant = deviceMap[vId]
              if (!variant) return null
              return (
                <Link
                  key={variant.id}
                  href={routes.dispositivo(locale, variant.id)}
                  className="group rounded-2xl border border-line bg-bg-elevated/60 p-5 transition-all hover:-translate-y-1 hover:border-brand-500/40"
                >
                  <p className="font-display text-lg font-bold transition-colors group-hover:text-brand-500">
                    {variant.name}
                  </p>
                  <p className="mt-1.5 text-[0.8rem] text-fg-muted">{variant.tagline[locale]}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-brand-500 transition-transform group-hover:translate-x-1">
                    {dict.common.open}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </Section>
      )}

      {/* ---------- Recursos del dispositivo ---------- */}
      {views.length === 0 ? (
        <Section>
          <p className="rounded-3xl border border-dashed border-line px-6 py-16 text-center text-fg-muted">
            {dict.devices.noResources}
          </p>
        </Section>
      ) : (
        (['manual', 'video', 'tarjeta'] as const).map((type) =>
          byType[type].length > 0 ? (
            <Section key={type} className="border-b border-line !py-14">
              <SectionHeading
                eyebrow={device.name}
                title={resourceTypeMeta[type].label[locale]}
                action={
                  <ButtonLink
                    href={`${routes.recursos(locale)}?dispositivo=${device.id}&tipo=${type}`}
                    variant="outline"
                    size="sm"
                  >
                    {dict.common.viewAll}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </ButtonLink>
                }
              />
              <ResourceRail resources={byType[type]} locale={locale} dict={dict} className="mt-8" />
            </Section>
          ) : null
        )
      )}

      {/* ---------- Otros dispositivos ---------- */}
      <Section className="bg-bg-subtle">
        <SectionHeading eyebrow={dict.devices.eyebrow} title={dict.devices.title} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((other) => (
            <Link
              key={other.id}
              href={routes.dispositivo(locale, other.id)}
              className="group rounded-2xl border border-line bg-bg-elevated/60 p-5 transition-all hover:-translate-y-1 hover:border-brand-500/40"
            >
              <p className="font-display text-lg font-bold transition-colors group-hover:text-brand-500">
                {other.name}
              </p>
              <p className="mt-1.5 text-[0.8rem] text-fg-muted">{other.tagline[locale]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-brand-500 transition-transform group-hover:translate-x-1">
                {dict.common.open}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
