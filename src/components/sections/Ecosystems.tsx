import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Section, SectionHeading, Badge } from '@/components/ui/primitives'
import { Stagger, StaggerItem, Marquee } from '@/components/ui/motion'
import { ecosystems } from '@/data/ecosystems'
import { resources } from '@/data/resources'
import { routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

function countFor(match: string[]) {
  return resources.filter((r) => {
    const haystack = [
      r.title.es.toLowerCase(),
      ...(r.tags ?? []).map((t) => t.toLowerCase()),
    ].join(' ')
    return match.some((m) => haystack.includes(m))
  }).length
}

export function Ecosystems({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="ecosistemas" className="border-y border-line bg-bg-subtle">
      <SectionHeading
        eyebrow={dict.ecosystems.eyebrow}
        title={dict.ecosystems.title}
        subtitle={dict.ecosystems.subtitle}
        align="center"
      />

      {/* Cinta de nombres: refuerza el mensaje "busca nuestra marca" */}
      <Marquee className="mt-10 py-2" speed={42}>
        {[...ecosystems, ...ecosystems].map((eco, i) => (
          <span
            key={`${eco.id}-${i}`}
            className="flex items-center gap-3 rounded-full border border-line bg-bg-elevated/70 px-6 py-3 font-display text-lg font-bold tracking-tight text-fg-muted"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: eco.color }}
              aria-hidden="true"
            />
            {eco.name}
          </span>
        ))}
      </Marquee>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
        {ecosystems.map((eco) => {
          const count = countFor(eco.match)
          return (
            <StaggerItem key={eco.id} className="h-full">
              <Link
                href={`${routes.recursos(locale)}?cat=ecosistemas&q=${encodeURIComponent(eco.name)}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/70 p-7 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/45 hover:shadow-[0_26px_60px_-32px_rgb(0_151_178/0.5)]"
              >
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ backgroundColor: eco.color }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold">{eco.name}</h3>
                    <p className="mt-0.5 text-[0.75rem] uppercase tracking-[0.14em] text-fg-subtle">
                      {eco.vendor}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </div>

                <p className="relative mt-4 text-[0.88rem] leading-relaxed text-fg-muted">
                  {eco.description[locale]}
                </p>

                {count > 0 && (
                  <div className="relative mt-5 border-t border-line pt-4">
                    <Badge tone="brand">
                      {count} {count === 1 ? dict.ecosystems.guide : dict.ecosystems.guides}
                    </Badge>
                  </div>
                )}
              </Link>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
