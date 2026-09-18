import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Section, SectionHeading, Badge } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { resourceTypeMeta } from '@/data/taxonomy'
import { countByCategory, getCategories } from '@/lib/content'
import { routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export async function CategoryGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [categories, counts] = await Promise.all([getCategories(), countByCategory()])

  /** Singular cuando sólo hay uno: "1 vídeo", no "1 vídeos". */
  const label = (type: keyof typeof resourceTypeMeta, count: number) =>
    count === 1 ? resourceTypeMeta[type].short[locale] : resourceTypeMeta[type].label[locale]

  return (
    <Section id="categorias" className="border-y border-line bg-bg-subtle">
      <SectionHeading
        eyebrow={dict.explorer.eyebrow}
        title={dict.explorer.categoryIntro}
        subtitle={dict.explorer.subtitle}
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const count = counts[category.id] ?? { manual: 0, video: 0, tarjeta: 0, total: 0 }

          return (
            <StaggerItem key={category.id} className="h-full">
              <Link
                href={`${routes.recursos(locale)}?cat=${category.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/70 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/45 hover:shadow-[0_26px_60px_-32px_rgb(0_151_178/0.55)]"
              >
                {/* Lamas que se iluminan al pasar el ratón */}
                <span
                  className="slats pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-500 transition-all duration-400 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={category.icon} className="h-5.5 w-5.5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </div>

                <h3 className="relative mt-5 font-display text-xl font-bold transition-colors group-hover:text-brand-500">
                  {category.name[locale]}
                </h3>
                <p className="relative mt-2 line-clamp-2 text-[0.86rem] leading-relaxed text-fg-muted">
                  {category.description[locale]}
                </p>

                <div className="relative mt-5 flex flex-wrap items-center gap-1.5 border-t border-line pt-4">
                  {count.manual > 0 && (
                    <Badge tone="brand">
                      {count.manual} {label('manual', count.manual)}
                    </Badge>
                  )}
                  {count.video > 0 && (
                    <Badge tone="signal">
                      {count.video} {label('video', count.video)}
                    </Badge>
                  )}
                  {count.tarjeta > 0 && (
                    <Badge tone="amber">
                      {count.tarjeta} {label('tarjeta', count.tarjeta)}
                    </Badge>
                  )}
                </div>
              </Link>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
