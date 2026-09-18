import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, CreditCard, Play } from 'lucide-react'

import { Badge } from '@/components/ui/primitives'
import { resourceTypeMeta } from '@/data/taxonomy'
import { routes } from '@/lib/navigation'
import { cn, formatDate } from '@/lib/utils'
import type { ResourceView } from '@/lib/resource-view'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

const typeIcon = { manual: BookOpen, video: Play, tarjeta: CreditCard } as const
const typeTone = { manual: 'brand', video: 'signal', tarjeta: 'amber' } as const

/**
 * Carril de recursos con enlaces reales a cada ficha.
 *
 * A diferencia del explorador -que abre un modal-, aqui cada tarjeta es un
 * enlace de verdad: es lo que permite que un buscador llegue a las 63 fichas.
 */
export function ResourceRail({
  resources,
  locale,
  dict,
  className,
}: {
  resources: ResourceView[]
  locale: Locale
  dict: Dictionary
  className?: string
}) {
  if (resources.length === 0) return null

  return (
    <ul
      className={cn(
        '-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      {resources.map((resource) => {
        const TypeIcon = typeIcon[resource.type]
        const isVideo = resource.type === 'video'

        return (
          <li key={resource.id} className="w-[16rem] shrink-0 snap-start sm:w-auto">
            <Link
              href={`${routes.recursos(locale)}/${resource.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_24px_56px_-30px_rgb(0_151_178/0.55)]"
            >
              {isVideo && resource.thumbnail ? (
                <span className="relative block aspect-video overflow-hidden bg-ink-800">
                  <Image
                    src={resource.thumbnail}
                    alt={`Miniatura del videotutorial: ${resource.title}`}
                    fill
                    sizes="(max-width: 640px) 80vw, 20rem"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink-950/25">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-400 group-hover:scale-110">
                      <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                    </span>
                  </span>
                  {resource.duration && (
                    <span className="absolute bottom-2 right-2 rounded bg-ink-950/85 px-1.5 py-0.5 text-[0.68rem] font-semibold text-white tabular-nums">
                      {resource.duration}
                    </span>
                  )}
                </span>
              ) : (
                <span className="relative block h-24 overflow-hidden border-b border-line bg-gradient-to-br from-brand-500/12 to-transparent">
                  <span className="slats absolute inset-0 opacity-70" aria-hidden="true" />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-bg-elevated text-brand-500 ring-1 ring-brand-500/20">
                    <TypeIcon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </span>
                </span>
              )}

              <span className="flex flex-1 flex-col p-5">
                <Badge tone={typeTone[resource.type]} className="self-start">
                  {resourceTypeMeta[resource.type].short[locale]}
                </Badge>
                <span className="mt-3 font-display text-[0.98rem] font-bold leading-snug transition-colors group-hover:text-brand-500">
                  {resource.title}
                </span>
                <span className="mt-auto flex items-center justify-between gap-3 pt-4 text-[0.7rem] text-fg-subtle">
                  <span className="truncate">{resource.categoryName}</span>
                  {resource.updated && (
                    <span className="shrink-0">{formatDate(resource.updated, locale)}</span>
                  )}
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
