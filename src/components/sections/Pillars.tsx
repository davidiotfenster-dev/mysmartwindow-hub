import { BookOpen, Check, CreditCard, PlayCircle } from 'lucide-react'
import Link from 'next/link'

import { Section, SectionHeading } from '@/components/ui/primitives'
import { TiltWrap } from './shared'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export function Pillars({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pillars = [
    {
      key: 'manual',
      Icon: BookOpen,
      data: dict.pillars.manual,
      href: `${routes.recursos(locale)}?tipo=manual`,
      accent: 'from-brand-500/20 to-brand-500/0 text-brand-500',
    },
    {
      key: 'video',
      Icon: PlayCircle,
      data: dict.pillars.video,
      href: `${routes.recursos(locale)}?tipo=video`,
      accent: 'from-signal-500/20 to-signal-500/0 text-signal-500',
    },
    {
      key: 'tarjeta',
      Icon: CreditCard,
      data: dict.pillars.card,
      href: `${routes.recursos(locale)}?tipo=tarjeta`,
      accent: 'from-amber-500/20 to-amber-500/0 text-amber-500',
    },
  ]

  return (
    <Section id="formatos">
      <SectionHeading
        eyebrow={dict.pillars.eyebrow}
        title={dict.pillars.title}
        subtitle={dict.pillars.subtitle}
        align="center"
      />

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map(({ key, Icon, data, href, accent }) => (
          <StaggerItem key={key} className="h-full">
            <TiltWrap className="h-full">
              <Link
                href={href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-[0_30px_70px_-34px_rgb(0_151_178/0.6)]"
              >
                <span
                  className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${accent.split(' ').slice(0, 2).join(' ')} blur-2xl transition-opacity duration-500 group-hover:opacity-80`}
                  aria-hidden="true"
                />

                <span
                  className={`relative grid h-13 w-13 place-items-center rounded-2xl bg-bg ring-1 ring-line transition-transform duration-400 group-hover:scale-110 ${accent.split(' ').pop()}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>

                <h3 className="relative mt-6 font-display text-2xl font-bold">{data.title}</h3>
                <p className="relative mt-3 text-[0.9rem] leading-relaxed text-fg-muted">
                  {data.description}
                </p>

                <ul className="relative mt-6 space-y-2.5 border-t border-line pt-5">
                  {[data.bullet1, data.bullet2, data.bullet3].map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-[0.84rem] text-fg-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" strokeWidth={3} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Link>
            </TiltWrap>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
