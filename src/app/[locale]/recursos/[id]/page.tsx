import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Download, ExternalLink, Eye, Youtube } from 'lucide-react'

import { JsonLd } from '@/components/seo/JsonLd'
import { Badge, ButtonLink, Section } from '@/components/ui/primitives'
import { PdfViewer } from '@/components/resources/PdfViewer'
import { resourceTypeMeta } from '@/data/taxonomy'
import { getCategoryMap, getDeviceMap, getResourceById, getResources } from '@/lib/content'
import { getDictionary } from '@/i18n'
import { locales, localeMeta, type Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
import { toResourceView } from '@/lib/resource-view'
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
import { embedUrl, getVideoMap, toIsoDuration, watchUrl } from '@/lib/youtube'
import { formatDate, formatViews } from '@/lib/utils'
import { pdfProxyUrl } from '@/lib/base-path'

export const revalidate = 3600

/** Una página por recurso y por idioma: recursos × 3 idiomas, URLs indexables. */
export async function generateStaticParams() {
  const resources = await getResources()
  return locales.flatMap((locale) => resources.map((r) => ({ locale, id: r.id })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  const resource = await getResourceById(id)
  if (!resource) return {}

  const [dict, categoryMap, deviceMap] = await Promise.all([
    getDictionary(locale),
    getCategoryMap(),
    getDeviceMap(),
  ])
  const category = categoryMap[resource.category].name[locale]
  const device = deviceMap[resource.device]
  const typeLabel = resourceTypeMeta[resource.type].short[locale]

  // La plantilla del layout ya añade " · MySmartWindow": no lo repetimos aquí.
  // Y si el propio título ya nombra el dispositivo, tampoco lo duplicamos.
  const base = resource.title[locale]
  const mentionsDevice = base.toLowerCase().includes(device.name.toLowerCase())
  const deviceBit = device.id === 'general' || mentionsDevice ? '' : `${device.name} · `
  const generatedTitle = `${base} — ${deviceBit}${typeLabel}`

  // `||`, no `??`: cuando el recurso no tiene resumen en el CMS el campo llega
  // como cadena vacía, no como nulo, y con `??` la página se quedaba sin
  // meta description.
  const generatedDescription =
    resource.summary?.[locale] ||
    `${typeLabel} de ${category} para ${device.id === 'general' ? 'dispositivos MySmartWindow' : device.name}. ${dict.explorer.subtitle}`

  const title = resolveTitle(resource.seo, generatedTitle)
  const description = resolveDescription(resource.seo, generatedDescription)

  return {
    title,
    description,
    alternates: alternates(`/recursos/${id}`, locale),
    openGraph: {
      type: resource.type === 'video' ? 'video.other' : 'article',
      title: resolveTitle(resource.seo, resource.title[locale]),
      description,
      url: absolute(`/${locale}/recursos/${id}`),
      ...(resource.seo?.ogImage
        ? { images: [{ url: resource.seo.ogImage }] }
        : resource.youtubeId
          ? { images: [{ url: `https://i.ytimg.com/vi/${resource.youtubeId}/maxresdefault.jpg` }] }
          : {}),
    },
    keywords: [
      resource.title[locale],
      category,
      device.id === 'general' ? 'MySmartWindow' : device.name,
      ...(resource.tags ?? []),
      ...(resource.seo?.keywords ? resource.seo.keywords.split(',').map((k) => k.trim()) : []),
    ],
  }
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}) {
  const { locale, id } = await params
  const [resource, resources, dict, videoMap, categoryMap, deviceMap] = await Promise.all([
    getResourceById(id),
    getResources(),
    getDictionary(locale),
    getVideoMap(),
    getCategoryMap(),
    getDeviceMap(),
  ])
  if (!resource) notFound()

  const view = toResourceView(resource, locale, videoMap, categoryMap, deviceMap)

  const category = categoryMap[resource.category]
  const device = deviceMap[resource.device]
  const isVideo = view.type === 'video'
  const typeLabel = resourceTypeMeta[view.type].label[locale]

  // Relacionados: misma categoría primero, luego mismo dispositivo
  const related = resources
    .filter((r) => r.id !== resource.id)
    .map((r) => ({
      r,
      score: (r.category === resource.category ? 2 : 0) + (r.device === resource.device ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => toResourceView(x.r, locale, videoMap, categoryMap, deviceMap))

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.explorer.title, path: `/${locale}/recursos` },
    { name: category.name[locale], path: `/${locale}/recursos?cat=${category.id}` },
    { name: view.title, path: `/${locale}/recursos/${id}` },
  ]

  /* ---- Datos estructurados: VideoObject para vídeos, TechArticle para PDFs ---- */
  const contentSchema = isVideo
    ? {
        '@type': 'VideoObject',
        '@id': absolute(`/${locale}/recursos/${id}#video`),
        name: view.title,
        description: view.summary || view.title,
        thumbnailUrl: [`https://i.ytimg.com/vi/${view.youtubeId}/maxresdefault.jpg`],
        uploadDate: view.updated,
        duration: toIsoDuration(videoMap[view.youtubeId!]?.durationSeconds),
        embedUrl: embedUrl(view.youtubeId!, false),
        contentUrl: watchUrl(view.youtubeId!),
        inLanguage: localeMeta[locale].htmlLang,
        publisher: { '@type': 'Organization', name: ORG_NAME, url: ORG_URL },
        ...(typeof view.views === 'number'
          ? {
              interactionStatistic: {
                '@type': 'InteractionCounter',
                interactionType: { '@type': 'WatchAction' },
                userInteractionCount: view.views,
              },
            }
          : {}),
      }
    : {
        '@type': 'TechArticle',
        '@id': absolute(`/${locale}/recursos/${id}#article`),
        headline: view.title,
        description: view.summary || view.title,
        inLanguage: localeMeta[locale].htmlLang,
        datePublished: view.updated,
        dateModified: view.updated,
        author: { '@type': 'Organization', name: ORG_NAME, url: ORG_URL },
        publisher: { '@type': 'Organization', name: ORG_NAME, url: ORG_URL },
        about: category.name[locale],
        ...(device.id !== 'general' ? { keywords: device.name } : {}),
        ...(view.url ? { associatedMedia: { '@type': 'MediaObject', contentUrl: view.url } } : {}),
      }

  return (
    <>
      <JsonLd data={jsonLd(contentSchema, breadcrumbSchema(crumbs))} />

      <article>
        {/* ---------- Cabecera ---------- */}
        <header className="relative overflow-hidden border-b border-line pb-10 pt-28 sm:pb-14 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="grid-tech absolute inset-0 mask-fade-b opacity-60" />
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/15 blur-[110px]" />
          </div>

          <div className="container-page">
            {/* Migas de pan visibles, no sólo en el JSON-LD */}
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
                <li className="truncate text-fg-muted">{view.title}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone={isVideo ? 'signal' : view.type === 'manual' ? 'brand' : 'amber'}>
                {typeLabel}
              </Badge>
              <Badge tone="neutral">{category.name[locale]}</Badge>
              {device.id !== 'general' && <Badge tone="neutral">{device.name}</Badge>}
            </div>

            <h1 className="mt-5 max-w-4xl text-3xl sm:text-4xl lg:text-5xl">{view.title}</h1>

            {view.summary && (
              <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-fg-muted">
                {view.summary}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.78rem] text-fg-subtle">
              {view.updated && (
                <span>
                  {dict.common.updated} {formatDate(view.updated, locale)}
                </span>
              )}
              {typeof view.views === 'number' && (
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {formatViews(view.views, locale)} {dict.common.views}
                </span>
              )}
              {view.duration && <span>{view.duration}</span>}
            </div>
          </div>
        </header>

        {/* ---------- Contenido ---------- */}
        <div className="container-page py-10 sm:py-14">
          <div className="mx-auto max-w-4xl">
            {isVideo && view.youtubeId ? (
              <div className="overflow-hidden rounded-3xl border border-line bg-ink-950">
                <div className="aspect-video w-full">
                  <iframe
                    src={embedUrl(view.youtubeId, false)}
                    title={view.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            ) : view.broken ? (
              <div className="rounded-3xl border border-dashed border-amber-500/40 bg-amber-500/5 px-6 py-14 text-center">
                <p className="font-display text-xl font-bold">{dict.common.unavailable}</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-fg-muted">
                  {dict.common.unavailableHint}
                </p>
                <ButtonLink href={routes.contacto(locale)} size="sm" className="mt-6">
                  {dict.faq.contactUs}
                </ButtonLink>
              </div>
            ) : view.url ? (
              <PdfViewer url={view.url} title={view.title} dict={dict} />
            ) : null}

            {/* Acciones */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {isVideo && view.watchUrl && (
                <ButtonLink href={view.watchUrl} external>
                  <Youtube className="h-4.5 w-4.5" />
                  {dict.common.watchOnYoutube}
                </ButtonLink>
              )}
              {!isVideo && view.url && !view.broken && (
                <>
                  <ButtonLink href={pdfProxyUrl(view.url)} external download>
                    <Download className="h-4 w-4" />
                    {dict.common.download}
                  </ButtonLink>
                  <ButtonLink href={view.url} external variant="outline">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {dict.common.open}
                  </ButtonLink>
                </>
              )}
              <ButtonLink
                href={`${routes.recursos(locale)}?cat=${category.id}`}
                variant="ghost"
                className="ml-auto"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {category.name[locale]}
              </ButtonLink>
            </div>

            {/* Contexto textual: es lo que hace que la página valga para buscadores */}
            <div className="mt-12 border-t border-line pt-10">
              <h2 className="font-display text-xl font-bold">{category.name[locale]}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
                {category.description[locale]}
              </p>

              {device.id !== 'general' && (
                <>
                  <h2 className="mt-8 font-display text-xl font-bold">{device.name}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
                    {device.description[locale]}
                  </p>
                  <Link
                    href={routes.dispositivo(locale, device.id)}
                    className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-brand-500 hover:text-brand-400"
                  >
                    {device.name}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )}
            </div>

            {/* Relacionados: enlazado interno, que es lo que reparte autoridad */}
            {related.length > 0 && (
              <div className="mt-12 border-t border-line pt-10">
                <h2 className="font-display text-xl font-bold">{dict.news.related}</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`${routes.recursos(locale)}/${item.id}`}
                        className="group flex h-full flex-col rounded-2xl border border-line p-5 transition-all hover:-translate-y-0.5 hover:border-brand-500/40"
                      >
                        <Badge
                          tone={
                            item.type === 'video'
                              ? 'signal'
                              : item.type === 'manual'
                                ? 'brand'
                                : 'amber'
                          }
                          className="self-start"
                        >
                          {resourceTypeMeta[item.type].short[locale]}
                        </Badge>
                        <span className="mt-3 font-display font-bold leading-snug transition-colors group-hover:text-brand-500">
                          {item.title}
                        </span>
                        <span className="mt-2 text-[0.78rem] text-fg-subtle">
                          {item.categoryName}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Section className="border-t border-line bg-bg-subtle !py-14">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-bold">{dict.faq.stillNeedHelp}</h2>
            <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-fg-muted">
              {dict.contact.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              <ButtonLink href={routes.recursos(locale)} variant="outline">
                {dict.explorer.title}
              </ButtonLink>
              <ButtonLink href={routes.contacto(locale)}>{dict.faq.contactUs}</ButtonLink>
            </div>
          </div>
        </Section>
      </article>
    </>
  )
}
