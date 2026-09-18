import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'

import { Section, SectionHeading, ButtonLink, Badge } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { TiltWrap } from './shared'
import { visibleDevices } from '@/data/taxonomy'
import { resources } from '@/data/resources'
import { routes } from '@/lib/navigation'
import { LogoMark } from '@/components/brand/Logo'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export function DevicesShowcase({
  locale,
  dict,
  limit,
}: {
  locale: Locale
  dict: Dictionary
  limit?: number
}) {
  const list = limit ? visibleDevices.slice(0, limit) : visibleDevices

  return (
    <Section id="dispositivos">
      <SectionHeading
        eyebrow={dict.devices.eyebrow}
        title={dict.devices.title}
        subtitle={dict.devices.subtitle}
        action={
          limit ? (
            <ButtonLink href={routes.dispositivos(locale)} variant="outline" size="sm">
              {dict.common.viewAll}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
          ) : undefined
        }
      />

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((device) => {
          const count = resources.filter((r) => r.device === device.id).length

          return (
            <StaggerItem key={device.id} className="h-full">
              <TiltWrap>
                <Link
                  href={routes.dispositivo(locale, device.id)}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-500/45 hover:shadow-[0_30px_70px_-34px_rgb(0_151_178/0.6)]"
                >
                  {/* Marca de agua con el isotipo */}
                  <LogoMark
                    className="pointer-events-none absolute -right-6 -top-4 h-28 w-28 text-brand-500/6 transition-all duration-700 group-hover:rotate-6 group-hover:text-brand-500/12"
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-brand-500">
                        {device.name}
                      </h3>
                      <p className="mt-1 text-[0.82rem] font-medium text-brand-500">
                        {device.tagline[locale]}
                      </p>
                    </div>
                    {count > 0 && <Badge tone="neutral">{count}</Badge>}
                  </div>

                  <p className="relative mt-4 text-[0.88rem] leading-relaxed text-fg-muted">
                    {device.description[locale]}
                  </p>

                  {device.features.length > 0 && (
                    <ul className="relative mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5">
                      {device.features.map((feature) => (
                        <li
                          key={feature.es}
                          className="inline-flex items-center gap-1.5 text-[0.78rem] text-fg-muted"
                        >
                          <Check className="h-3 w-3 shrink-0 text-brand-500" strokeWidth={3} />
                          {feature[locale]}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-brand-500 transition-transform duration-300 group-hover:translate-x-1">
                    {dict.devices.resourcesFor}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </TiltWrap>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
