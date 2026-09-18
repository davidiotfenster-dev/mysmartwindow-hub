import { ArrowUpRight, Youtube } from 'lucide-react'

import { Section, SectionHeading, ButtonLink } from '@/components/ui/primitives'
import { VideoGrid } from '@/components/videos/VideoGrid'
import { toVideoItem } from '@/lib/video-item'
import { CHANNEL_URL, getChannelData } from '@/lib/youtube'
import { routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

/**
 * Carril de últimos vídeos del canal. Es un componente de servidor: la llamada
 * a YouTube se cachea con ISR y nunca llega al navegador del usuario.
 */
export async function LatestVideos({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { videos, source } = await getChannelData()
  if (videos.length === 0) return null

  return (
    <Section id="videos" className="overflow-hidden border-y border-line bg-bg-subtle">
      <SectionHeading
        eyebrow={dict.videos.eyebrow}
        title={dict.videos.latest}
        subtitle={dict.videos.subtitle}
        action={
          <div className="flex flex-wrap gap-2">
            <ButtonLink href={routes.videos(locale)} size="sm">
              {dict.common.viewAll}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
            <ButtonLink href={CHANNEL_URL} external size="sm" variant="outline">
              <Youtube className="h-4 w-4" />
              {dict.videos.visitChannel}
            </ButtonLink>
          </div>
        }
      />

      <VideoGrid
        videos={videos.slice(0, 8).map(toVideoItem)}
        locale={locale}
        dict={dict}
        layout="rail"
        className="mt-10"
      />

      <p className="mt-4 text-[0.72rem] text-fg-subtle">
        {source === 'api'
          ? dict.videos.sourceApi
          : source === 'rss'
            ? dict.videos.sourceRss
            : dict.videos.sourceNone}
      </p>
    </Section>
  )
}
