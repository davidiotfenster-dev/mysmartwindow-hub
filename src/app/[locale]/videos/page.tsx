import { alternates } from '@/lib/seo'
import type { Metadata } from 'next'
import { Youtube } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { VideoGrid } from '@/components/videos/VideoGrid'
import { toVideoItem, type VideoItem } from '@/lib/video-item'
import { ButtonLink, Section, SectionHeading, Badge } from '@/components/ui/primitives'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { CHANNEL_URL, getChannelData, thumbnailFor } from '@/lib/youtube'
import { resources } from '@/data/resources'
import { getDictionary } from '@/i18n'
import { formatDate } from '@/lib/utils'
import type { Locale } from '@/i18n/config'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.videos.title,
    description: dict.videos.subtitle,
    alternates: alternates('/videos', locale),
  }
}

export default async function VideosPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  const { videos, playlists, source, fetchedAt } = await getChannelData()
  const liveById = new Map(videos.map((v) => [v.id, v]))

  /**
   * Vídeos del catálogo curado: conservan el título traducido y la categoría,
   * pero toman miniatura, duración y visitas de YouTube cuando están.
   */
  const catalogVideos: VideoItem[] = resources
    .filter((r) => r.type === 'video' && r.youtubeId)
    .map((r) => {
      const live = liveById.get(r.youtubeId!)
      return {
        id: r.youtubeId!,
        title: r.title[locale],
        description: r.summary?.[locale] ?? live?.description,
        thumbnail: live?.thumbnail ?? thumbnailFor(r.youtubeId!),
        publishedAt: live?.publishedAt ?? r.updated,
        durationSeconds: live?.durationSeconds,
        views: live?.views,
      }
    })

  const catalogIds = new Set(catalogVideos.map((v) => v.id))
  // Lo que hay en el canal y todavía no está categorizado en el centro de recursos
  const channelOnly = videos.filter((v) => !catalogIds.has(v.id)).map(toVideoItem)

  return (
    <>
      <PageHeader
        eyebrow={dict.videos.eyebrow}
        title={<GradientTitle text={dict.videos.title} />}
        subtitle={dict.videos.subtitle}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href={CHANNEL_URL} external>
            <Youtube className="h-4.5 w-4.5" />
            {dict.videos.visitChannel}
          </ButtonLink>
          <Badge tone={source === 'none' ? 'amber' : 'brand'}>
            {source === 'api'
              ? dict.videos.sourceApi
              : source === 'rss'
                ? dict.videos.sourceRss
                : dict.videos.sourceNone}
          </Badge>
          <span className="text-[0.72rem] text-fg-subtle">
            {dict.videos.syncedAt}: {formatDate(fetchedAt, locale)}
          </span>
        </div>
      </PageHeader>

      {/* Novedades del canal: aparecen solas, sin tocar código */}
      {channelOnly.length > 0 && (
        <Section className="border-b border-line">
          <SectionHeading eyebrow={dict.common.new} title={dict.videos.latest} />
          <VideoGrid videos={channelOnly} locale={locale} dict={dict} className="mt-10" />
        </Section>
      )}

      {/* Listas de reproducción reales del canal (requieren API key) */}
      {playlists.length > 0 && (
        <Section className="border-b border-line bg-bg-subtle">
          <SectionHeading eyebrow={dict.videos.eyebrow} title={dict.videos.playlists} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <a
                key={playlist.id}
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40"
              >
                <span className="relative block aspect-video overflow-hidden bg-ink-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={playlist.thumbnail}
                    alt={`Portada de la lista de reproducción: ${playlist.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2.5 right-2.5 rounded-md bg-ink-950/85 px-2 py-0.5 text-[0.7rem] font-semibold text-white">
                    {playlist.itemCount}
                  </span>
                </span>
                <span className="p-5">
                  <span className="block font-display text-[1rem] font-bold leading-snug transition-colors group-hover:text-brand-500">
                    {playlist.title}
                  </span>
                  {playlist.description && (
                    <span className="mt-2 line-clamp-2 text-[0.82rem] text-fg-muted">
                      {playlist.description}
                    </span>
                  )}
                </span>
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* Catálogo curado */}
      <Section>
        <SectionHeading eyebrow={dict.explorer.title} title={dict.videos.fromCatalog} />
        <VideoGrid videos={catalogVideos} locale={locale} dict={dict} className="mt-10" />
      </Section>
    </>
  )
}
