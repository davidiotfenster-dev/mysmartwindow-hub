'use client'

import { motion } from 'framer-motion'
import { Eye, Play } from 'lucide-react'
import { useState } from 'react'

import { Modal } from '@/components/ui/Modal'
import { ButtonLink } from '@/components/ui/primitives'
import { embedUrl, formatDuration } from '@/lib/youtube'
import type { VideoItem } from '@/lib/video-item'
import { cn, formatDate, formatViews } from '@/lib/utils'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export type { VideoItem }

export function VideoGrid({
  videos,
  locale,
  dict,
  layout = 'grid',
  className,
}: {
  videos: VideoItem[]
  locale: Locale
  dict: Dictionary
  /** 'rail' = carril horizontal con snap, ideal en móvil y para la portada. */
  layout?: 'grid' | 'rail'
  className?: string
}) {
  const [active, setActive] = useState<VideoItem | null>(null)

  if (videos.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-line px-6 py-16 text-center text-sm text-fg-muted">
        {dict.videos.empty}
      </p>
    )
  }

  return (
    <>
      <div
        className={cn(
          layout === 'rail'
            ? '-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden'
            : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
          className
        )}
      >
        {videos.map((video, i) => (
          <motion.button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
            className={cn(
              'group flex flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 text-left transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_26px_60px_-30px_rgb(0_151_178/0.55)]',
              layout === 'rail' && 'w-[17rem] shrink-0 snap-start sm:w-[20rem]'
            )}
          >
            <span className="relative block aspect-video overflow-hidden bg-ink-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnail}
                alt={`Miniatura del vídeo: ${video.title}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-13 w-13 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-400 group-hover:scale-110">
                  <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
                </span>
              </span>
              {formatDuration(video.durationSeconds) && (
                <span className="absolute bottom-2.5 right-2.5 rounded-md bg-ink-950/85 px-1.5 py-0.5 text-[0.7rem] font-semibold text-white tabular-nums">
                  {formatDuration(video.durationSeconds)}
                </span>
              )}
            </span>

            <span className="flex flex-1 flex-col p-5">
              <span className="line-clamp-2 font-display text-[1rem] font-bold leading-snug transition-colors group-hover:text-brand-500">
                {video.title}
              </span>
              {video.description && (
                <span className="mt-2 line-clamp-2 text-[0.82rem] leading-relaxed text-fg-muted">
                  {video.description}
                </span>
              )}
              <span className="mt-auto flex items-center gap-3 pt-4 text-[0.72rem] text-fg-subtle">
                {video.publishedAt && <span>{formatDate(video.publishedAt, locale)}</span>}
                {typeof video.views === 'number' && (
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatViews(video.views, locale)}
                  </span>
                )}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.title}
        closeLabel={dict.common.close}
        size="xl"
      >
        {active && (
          <div>
            <div className="aspect-video w-full bg-ink-950">
              <iframe
                src={embedUrl(active.id)}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
            <div className="border-t border-line p-5">
              {active.description && (
                <p className="whitespace-pre-line text-sm leading-relaxed text-fg-muted">
                  {active.description.slice(0, 600)}
                </p>
              )}
              <div className="mt-4">
                <ButtonLink
                  href={`https://www.youtube.com/watch?v=${active.id}`}
                  external
                  size="sm"
                  variant="outline"
                >
                  {dict.common.watchOnYoutube}
                </ButtonLink>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
