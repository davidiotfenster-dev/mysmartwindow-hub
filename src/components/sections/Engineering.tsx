import { ArrowUpRight, CircuitBoard, Cloud, Cpu, Smartphone } from 'lucide-react'

import { ButtonLink, Section, SectionHeading } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

/**
 * Las cuatro capas que la empresa controla de punta a punta. El orden va de
 * dentro hacia fuera -del cobre a la pantalla del móvil- porque es el que
 * cuenta la historia: todo sale del mismo sitio.
 */
function layers(dict: Dictionary) {
  return [
    { Icon: CircuitBoard, data: dict.engineering.layers.hardware },
    { Icon: Cpu, data: dict.engineering.layers.firmware },
    { Icon: Cloud, data: dict.engineering.layers.cloud },
    { Icon: Smartphone, data: dict.engineering.layers.app },
  ]
}

/** Bloque resumen para la portada, con salida hacia la página completa. */
export function EngineeringTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="ingenieria" className="bg-bg-subtle">
      <SectionHeading
        eyebrow={dict.engineering.eyebrow}
        title={dict.engineering.title}
        subtitle={dict.engineering.subtitle}
        action={
          <ButtonLink href={routes.ingenieria(locale)} variant="outline" size="sm">
            {dict.engineering.homeCta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </ButtonLink>
        }
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {layers(dict).map(({ Icon, data }) => (
          <StaggerItem key={data.title} className="h-full">
            <div className="group relative flex h-full flex-col rounded-3xl border border-line bg-bg-elevated/60 p-7 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/45">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/10 text-brand-500 transition-all duration-400 group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-5.5 w-5.5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{data.title}</h3>
              <p className="mt-2.5 text-[0.86rem] leading-relaxed text-fg-muted">
                {data.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

/** Desarrollo completo, para la página de Ingeniería. */
export function EngineeringStack({ dict }: { dict: Dictionary }) {
  const all = layers(dict)

  return (
    <Section>
      <Stagger className="grid gap-5 lg:grid-cols-2">
        {all.map(({ Icon, data }, index) => (
          <StaggerItem key={data.title} className="h-full">
            <div className="group relative flex h-full gap-5 overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 p-8 transition-all duration-400 hover:border-brand-500/45">
              {/* Número de capa, de dentro hacia fuera */}
              <span
                className="pointer-events-none absolute -right-2 -top-4 font-display text-[5rem] font-bold leading-none text-brand-500/8"
                aria-hidden="true"
              >
                {index + 1}
              </span>

              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-500 transition-all duration-400 group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>

              <div className="relative">
                <h2 className="font-display text-xl font-bold">{data.title}</h2>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-fg-muted">
                  {data.description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
