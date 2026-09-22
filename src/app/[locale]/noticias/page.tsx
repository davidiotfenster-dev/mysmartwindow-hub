import { alternates } from '@/lib/seo'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/primitives'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { getNews } from '@/lib/content'
import { getDictionary } from '@/i18n'
import { routes } from '@/lib/navigation'
import { formatDate } from '@/lib/utils'
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
    title: dict.news.title,
    description: dict.news.subtitle,
    alternates: alternates('/noticias', locale),
  }
}

export default async function NewsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const [dict, posts] = await Promise.all([getDictionary(locale), getNews()])
  const [lead, ...rest] = posts

  return (
    <>
      <PageHeader
        eyebrow={dict.news.eyebrow}
        title={<GradientTitle text={dict.news.title} />}
        subtitle={dict.news.subtitle}
      />

      <div className="container-page py-14 sm:py-20">
        {posts.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line px-6 py-20 text-center text-fg-muted">
            {dict.news.empty}
          </p>
        ) : (
          <>
            {/* Destacado */}
            <Link
              href={routes.noticia(locale, lead.slug)}
              className="group grid overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 transition-all duration-400 hover:border-brand-500/40 hover:shadow-[0_30px_70px_-34px_rgb(0_151_178/0.5)] lg:grid-cols-2"
            >
              <span className={`relative block min-h-56 bg-gradient-to-br ${lead.gradient}`}>
                <span className="grid-tech absolute inset-0 opacity-60" aria-hidden="true" />
                <span className="slats absolute inset-x-0 bottom-0 h-24 opacity-80" aria-hidden="true" />
              </span>
              <span className="flex flex-col justify-center p-8 sm:p-10">
                <span className="flex flex-wrap items-center gap-3">
                  <Badge tone="brand">{lead.tag[locale]}</Badge>
                  <span className="text-[0.74rem] text-fg-subtle">
                    {formatDate(lead.publishedAt, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.74rem] text-fg-subtle">
                    <Clock className="h-3 w-3" />
                    {lead.readingMinutes} {dict.news.minRead}
                  </span>
                </span>
                <span className="mt-4 block font-display text-2xl font-bold leading-tight transition-colors group-hover:text-brand-500 sm:text-3xl">
                  {lead.title[locale]}
                </span>
                <span className="mt-3 text-[0.92rem] leading-relaxed text-fg-muted">
                  {lead.excerpt[locale]}
                </span>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-brand-500 transition-transform duration-300 group-hover:translate-x-1">
                  {dict.news.readArticle}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </Link>

            <Stagger className="mt-6 grid gap-5 md:grid-cols-3">
              {rest.map((post) => (
                <StaggerItem key={post.slug} className="h-full">
                  <Link
                    href={routes.noticia(locale, post.slug)}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40"
                  >
                    <span className={`relative block h-36 bg-gradient-to-br ${post.gradient}`}>
                      <span className="grid-tech absolute inset-0 opacity-60" aria-hidden="true" />
                      <span className="absolute left-5 top-5">
                        <Badge tone="brand">{post.tag[locale]}</Badge>
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col p-6">
                      <span className="flex items-center gap-3 text-[0.72rem] text-fg-subtle">
                        <span>{formatDate(post.publishedAt, locale)}</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingMinutes} {dict.news.minRead}
                        </span>
                      </span>
                      <span className="mt-3 block font-display text-[1.1rem] font-bold leading-snug transition-colors group-hover:text-brand-500">
                        {post.title[locale]}
                      </span>
                      <span className="mt-2.5 line-clamp-3 text-[0.85rem] leading-relaxed text-fg-muted">
                        {post.excerpt[locale]}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8rem] font-semibold text-brand-500 transition-transform duration-300 group-hover:translate-x-1">
                        {dict.news.readArticle}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}
      </div>
    </>
  )
}
