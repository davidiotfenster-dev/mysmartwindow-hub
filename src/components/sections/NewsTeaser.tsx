import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'

import { Section, SectionHeading, ButtonLink, Badge } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { getNews } from '@/data/news'
import { routes } from '@/lib/navigation'
import { formatDate } from '@/lib/utils'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export function NewsTeaser({
  locale,
  dict,
  limit = 3,
}: {
  locale: Locale
  dict: Dictionary
  limit?: number
}) {
  const posts = getNews().slice(0, limit)
  if (posts.length === 0) return null

  return (
    <Section id="noticias">
      <SectionHeading
        eyebrow={dict.news.eyebrow}
        title={dict.news.title}
        subtitle={dict.news.subtitle}
        action={
          <ButtonLink href={routes.noticias(locale)} variant="outline" size="sm">
            {dict.common.viewAll}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </ButtonLink>
        }
      />

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <StaggerItem key={post.slug} className="h-full">
            <Link
              href={routes.noticia(locale, post.slug)}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_26px_60px_-32px_rgb(0_151_178/0.5)]"
            >
              <span className={`relative block h-40 overflow-hidden bg-gradient-to-br ${post.gradient}`}>
                <span className="grid-tech absolute inset-0 opacity-60" aria-hidden="true" />
                <span className="slats absolute inset-x-0 bottom-0 h-16 opacity-80" aria-hidden="true" />
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

                <span className="mt-3 block font-display text-[1.15rem] font-bold leading-snug transition-colors group-hover:text-brand-500">
                  {post.title[locale]}
                </span>
                <span className="mt-2.5 line-clamp-3 text-[0.86rem] leading-relaxed text-fg-muted">
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
    </Section>
  )
}
