import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'

import { Badge } from '@/components/ui/primitives'
import { getNews, getNewsPost } from '@/lib/content'
import { getDictionary } from '@/i18n'
import { locales, type Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
import { resolveDescription, resolveTitle } from '@/lib/seo'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const news = await getNews()
  return locales.flatMap((locale) => news.map((post) => ({ locale, slug: post.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getNewsPost(slug)
  if (!post) return {}
  return {
    title: resolveTitle(post.seo, post.title[locale]),
    description: resolveDescription(post.seo, post.excerpt[locale]),
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt,
      ...(post.seo?.ogImage ? { images: [{ url: post.seo.ogImage }] } : post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  }
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const [dict, post, allNews] = await Promise.all([getDictionary(locale), getNewsPost(slug), getNews()])
  if (!post) notFound()

  const related = allNews.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <article>
      <header className={`relative overflow-hidden border-b border-line bg-gradient-to-br ${post.gradient} pb-14 pt-28 sm:pb-20 sm:pt-36`}>
        <div className="grid-tech pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="slats pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-70" aria-hidden="true" />

        <div className="container-page relative">
          <Link
            href={routes.noticias(locale)}
            className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-fg-muted transition-colors hover:text-brand-500"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.news.backToNews}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="brand">{post.tag[locale]}</Badge>
            <span className="text-[0.78rem] text-fg-subtle">
              {formatDate(post.publishedAt, locale)}
            </span>
            <span className="inline-flex items-center gap-1 text-[0.78rem] text-fg-subtle">
              <Clock className="h-3 w-3" />
              {post.readingMinutes} {dict.news.minRead}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-3xl sm:text-5xl">{post.title[locale]}</h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-fg-muted">
            {post.excerpt[locale]}
          </p>
        </div>
      </header>

      <div className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-2xl space-y-6">
          {post.body[locale].split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-[1rem] leading-[1.85] text-fg-muted">
              {paragraph}
            </p>
          ))}
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-2xl border-t border-line pt-10">
            <h2 className="font-display text-xl font-bold">{dict.news.related}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={routes.noticia(locale, item.slug)}
                  className="group rounded-2xl border border-line p-5 transition-all hover:-translate-y-0.5 hover:border-brand-500/40"
                >
                  <Badge tone="neutral">{item.tag[locale]}</Badge>
                  <p className="mt-3 font-display font-bold leading-snug transition-colors group-hover:text-brand-500">
                    {item.title[locale]}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-brand-500">
                    {dict.news.readArticle}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
