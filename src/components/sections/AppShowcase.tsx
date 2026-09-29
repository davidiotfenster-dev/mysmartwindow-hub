import Link from 'next/link'
import { Apple, ArrowRight, Lightbulb, Lock, Play, Shapes } from 'lucide-react'

import { AppPhoneMockup, StoreBadge } from '@/components/app/AppMockup'
import { Eyebrow, Section } from '@/components/ui/primitives'
import { EXTERNAL, routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

/**
 * Franja de portada dedicada a la app: es el producto con el que el usuario
 * final se relaciona a diario, así que tiene su propia sección -no solo un
 * enlace escondido dentro de Ingeniería-.
 */
export function AppShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const highlights = [
    { Icon: Shapes, data: dict.app.features.twin },
    { Icon: Lock, data: dict.app.features.lock },
    { Icon: Lightbulb, data: dict.app.features.lighting },
  ]

  return (
    <Section id="app" className="border-t border-line bg-bg-subtle">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="max-w-xl">
          <Eyebrow>{dict.app.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{dict.app.title}</h2>
          <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-fg-muted">
            {dict.app.subtitle}
          </p>

          <ul className="mt-8 space-y-5">
            {highlights.map(({ Icon, data }) => (
              <li key={data.title} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-500">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-display text-[0.98rem] font-bold">{data.title}</p>
                  <p className="mt-1 text-[0.86rem] leading-relaxed text-fg-muted">
                    {data.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <StoreBadge
              href={EXTERNAL.appStore}
              icon={Apple}
              kicker="App Store"
              label={dict.app.appStore}
            />
            <StoreBadge
              href={EXTERNAL.googlePlay}
              icon={Play}
              kicker="Google Play"
              label={dict.app.googlePlay}
            />
          </div>

          <Link
            href={routes.app(locale)}
            className="mt-6 inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-brand-500 transition-colors hover:text-brand-400"
          >
            {dict.common.viewAll}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <AppPhoneMockup />
      </div>
    </Section>
  )
}
