'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  CreditCard,
  Download,
  Eye,
  Play,
} from 'lucide-react'

import { Badge } from '@/components/ui/primitives'
import { routes } from '@/lib/navigation'
import { cn, formatDate, formatViews } from '@/lib/utils'
import type { ResourceView } from '@/lib/resource-view'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

const MotionLink = motion.create(Link)

/**
 * Abrir el modal es lo cómodo para quien navega, pero un <button> es invisible
 * para un buscador. Así que cada tarjeta es un enlace real a su ficha y sólo
 * interceptamos el clic normal: ctrl/cmd+clic, clic central o "abrir en pestaña
 * nueva" siguen llevando a la página de verdad.
 */
function interceptPlainClick(event: React.MouseEvent, run: () => void) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  run()
}

const typeTone = {
  manual: 'brand',
  video: 'signal',
  tarjeta: 'amber',
} as const

const typeIcon = { manual: BookOpen, video: Play, tarjeta: CreditCard } as const

export function ResourceCard({
  resource,
  locale,
  dict,
  onOpen,
  view = 'grid',
}: {
  resource: ResourceView
  locale: Locale
  dict: Dictionary
  /** Sin manejador la tarjeta es un enlace normal: asi se puede pintar desde el servidor. */
  onOpen?: (resource: ResourceView) => void
  view?: 'grid' | 'list'
}) {
  const TypeIcon = typeIcon[resource.type]
  const isVideo = resource.type === 'video'
  const typeLabel =
    resource.type === 'manual'
      ? dict.pillars.manual.title
      : resource.type === 'video'
        ? dict.pillars.video.title
        : dict.pillars.card.title

  const href = `${routes.recursos(locale)}/${resource.id}`

  if (view === 'list') {
    return (
      <MotionLink
        href={href}
        layout
        onClick={onOpen ? (event) => interceptPlainClick(event, () => onOpen(resource)) : undefined}
        className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-bg-elevated/60 p-3 text-left transition-all hover:border-brand-500/40 hover:bg-bg-elevated"
      >
        <span
          className={cn(
            'relative grid shrink-0 place-items-center overflow-hidden rounded-xl',
            isVideo ? 'h-14 w-24' : 'h-14 w-14 bg-brand-500/10 text-brand-500'
          )}
        >
          {isVideo && resource.thumbnail ? (
            <>
              <Image
                src={resource.thumbnail}
                alt={`Miniatura del videotutorial: ${resource.title}`}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink-950/35">
                <Play className="h-4 w-4 fill-white text-white" />
              </span>
            </>
          ) : (
            <TypeIcon className="h-5 w-5" strokeWidth={1.75} />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold leading-snug">{resource.title}</span>
          <span className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.72rem] text-fg-subtle">
            <span>{resource.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{typeLabel}</span>
            {resource.duration && (
              <>
                <span aria-hidden="true">·</span>
                <span>{resource.duration}</span>
              </>
            )}
          </span>
        </span>

        {resource.broken ? (
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
        ) : (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
        )}
      </MotionLink>
    )
  }

  return (
    <MotionLink
      href={href}
      layout
      onClick={onOpen ? (event) => interceptPlainClick(event, () => onOpen(resource)) : undefined}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 text-left transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_26px_60px_-30px_rgb(0_151_178/0.6)]"
    >
      {/* Miniatura o cabecera gráfica */}
      {isVideo && resource.thumbnail ? (
        <span className="relative block aspect-video overflow-hidden bg-ink-800">
          <Image
            src={resource.thumbnail}
            alt={`Miniatura del videotutorial: ${resource.title}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-13 w-13 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-400 group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
            </span>
          </span>
          {resource.duration && (
            <span className="absolute bottom-2.5 right-2.5 rounded-md bg-ink-950/85 px-1.5 py-0.5 text-[0.7rem] font-semibold text-white tabular-nums">
              {resource.duration}
            </span>
          )}
        </span>
      ) : (
        <span className="relative block h-28 overflow-hidden border-b border-line bg-gradient-to-br from-brand-500/12 via-transparent to-signal-500/10">
          <span className="slats absolute inset-0 opacity-70" aria-hidden="true" />
          <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-2xl bg-bg-elevated text-brand-500 shadow-sm ring-1 ring-brand-500/20 transition-transform duration-400 group-hover:scale-110">
            <TypeIcon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="absolute bottom-3 right-4 font-display text-[2.6rem] font-bold leading-none text-brand-500/10">
            PDF
          </span>
        </span>
      )}

      <span className="flex flex-1 flex-col p-5">
        <span className="flex flex-wrap items-center gap-1.5">
          <Badge tone={typeTone[resource.type]}>{typeLabel}</Badge>
          {resource.deviceName !== 'Ecosistema' && (
            <Badge tone="neutral">{resource.deviceName}</Badge>
          )}
          {resource.broken && (
            <Badge tone="amber">
              <AlertCircle className="h-3 w-3" />
              {dict.common.unavailable}
            </Badge>
          )}
        </span>

        <span className="mt-3 block font-display text-[1.05rem] font-bold leading-snug transition-colors group-hover:text-brand-500">
          {resource.title}
        </span>

        {resource.summary && (
          <span className="mt-2 line-clamp-2 text-[0.85rem] leading-relaxed text-fg-muted">
            {resource.summary}
          </span>
        )}

        <span className="mt-auto flex items-center justify-between gap-3 pt-4 text-[0.72rem] text-fg-subtle">
          <span className="truncate">{resource.categoryName}</span>
          <span className="flex shrink-0 items-center gap-2.5">
            {typeof resource.views === 'number' && (
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatViews(resource.views, locale)}
              </span>
            )}
            {resource.updated && !isVideo && <span>{formatDate(resource.updated, locale)}</span>}
            {!isVideo && !resource.broken && <Download className="h-3.5 w-3.5" />}
          </span>
        </span>
      </span>
    </MotionLink>
  )
}
