import { BadgeCheck, Hand, Headset } from 'lucide-react'

import { Section, SectionHeading } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import type { Dictionary } from '@/i18n'

export function Values({ dict }: { dict: Dictionary }) {
  const items = [
    { Icon: BadgeCheck, data: dict.values.warranty },
    { Icon: Hand, data: dict.values.usability },
    { Icon: Headset, data: dict.values.support },
  ]

  return (
    <Section id="valores">
      <SectionHeading eyebrow={dict.values.eyebrow} title={dict.values.title} align="center" />

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map(({ Icon, data }) => (
          <StaggerItem key={data.title} className="h-full">
            <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 p-8 text-center transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40">
              {/* Anillo de señal al pasar el ratón */}
              <span
                className="pointer-events-none absolute left-1/2 top-10 h-24 w-24 -translate-x-1/2 rounded-full border border-brand-500/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-[pulse-ring_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                aria-hidden="true"
              />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/10 text-brand-500 transition-all duration-400 group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <h3 className="relative mt-6 font-display text-xl font-bold">{data.title}</h3>
              <p className="relative mt-3 text-[0.88rem] leading-relaxed text-fg-muted">
                {data.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
