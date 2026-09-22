import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, CalendarClock } from 'lucide-react'

import { JsonLd } from '@/components/seo/JsonLd'
import { LegalContent, legalHeadings } from '@/components/legal/LegalContent'
import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { getLegalPage, getLegalPages } from '@/lib/content'
import { getDictionary } from '@/i18n'
import { locales, localeMeta, type Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
import {
  absolute,
  alternates,
  breadcrumbSchema,
  jsonLd,
  resolveDescription,
  resolveTitle,
  SITE_URL,
} from '@/lib/seo'
import { formatDate } from '@/lib/utils'

/**
 * Se regenera cada hora contra el CMS. Sin esto la pagina se queda
 * congelada en la version que se genero al construir la imagen, que es
 * anterior a que hubiera contenido, y no se entera de nada.
 */
export const revalidate = 3600

export async function generateStaticParams() {
  const pages = await getLegalPages()
  return locales.flatMap((locale) => pages.map((page) => ({ locale, slug: page.id })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const page = await getLegalPage(slug)
  if (!page) return {}

  return {
    title: resolveTitle(page.seo, page.title[locale]),
    description: resolveDescription(page.seo, page.intro[locale]),
    alternates: alternates(`/legal/${slug}`, locale),
    openGraph: { type: 'article', title: page.title[locale], description: page.intro[locale] },
  }
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const [dict, page, allPages] = await Promise.all([
    getDictionary(locale),
    getLegalPage(slug),
    getLegalPages(),
  ])
  if (!page) notFound()

  const body = page.body[locale]
  const headings = legalHeadings(body)
  const others = allPages.filter((item) => item.id !== page.id)

  const toc = (
    <ol className="mt-4 space-y-2 lg:mt-5">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className="block text-[0.82rem] leading-snug text-fg-muted transition-colors hover:text-brand-500"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  )

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: page.title[locale], path: `/${locale}/legal/${slug}` },
  ]

  return (
    <>
      <JsonLd
        data={jsonLd(
          {
            '@type': 'WebPage',
            '@id': absolute(`/${locale}/legal/${slug}`),
            name: page.title[locale],
            description: page.intro[locale],
            inLanguage: localeMeta[locale].htmlLang,
            dateModified: page.lastUpdated,
            isPartOf: { '@id': `${SITE_URL}/#website` },
          },
          breadcrumbSchema(crumbs)
        )}
      />

      <PageHeader
        eyebrow={dict.legal.eyebrow}
        title={<GradientTitle text={page.title[locale]} />}
        subtitle={page.intro[locale]}
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[0.78rem] text-fg-subtle">
          <CalendarClock className="h-3.5 w-3.5 text-brand-500" />
          {dict.legal.lastUpdated}: {formatDate(page.lastUpdated, locale)}
        </p>
      </PageHeader>

      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          {/* Índice: en pantallas grandes acompaña al scroll; en móvil va arriba,
              plegado, para no empujar el texto una pantalla entera hacia abajo. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {/* En movil va plegado, para no empujar el texto una pantalla entera
                hacia abajo; en escritorio acompana al scroll, siempre abierto.
                Son dos bloques y no un <details> con `display: contents`
                porque un <details> cerrado oculta sus hijos pase lo que pase
                con el display, y el indice se quedaba en blanco. */}
            <details className="rounded-2xl border border-line p-4 lg:hidden">
              <summary className="cursor-pointer list-none font-display text-[0.8rem] font-bold uppercase tracking-[0.14em] text-fg-muted">
                {dict.legal.contents}
                <span className="float-right text-brand-500">▾</span>
              </summary>
              <nav aria-label={dict.legal.contents}>{toc}</nav>
            </details>

            <nav aria-labelledby="legal-toc-title" className="hidden lg:block">
              <h2
                id="legal-toc-title"
                className="font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-fg-subtle"
              >
                {dict.legal.contents}
              </h2>
              {toc}
            </nav>
          </aside>

          {/* `min-w-0`: sin el, la tabla ancha de la politica de cookies estira
              la columna del grid y saca toda la pagina del viewport en movil,
              en vez de desplazarse dentro de su propio contenedor. */}
          <article className="min-w-0 max-w-3xl">
            <LegalContent body={body} />

            <div className="mt-16 border-t border-line pt-8">
              <h2 className="font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                {dict.legal.related}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {others.map((item) => (
                  <Link
                    key={item.id}
                    href={routes.legal(locale, item.id)}
                    className="group rounded-2xl border border-line p-4 transition-all hover:-translate-y-0.5 hover:border-brand-500/40"
                  >
                    <p className="font-display text-[0.95rem] font-bold transition-colors group-hover:text-brand-500">
                      {item.title[locale]}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-brand-500">
                      {dict.common.readMore}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
