import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'

import { Section, SectionHeading, ButtonLink, Badge } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { TiltWrap } from './shared'
import { getResources, getVisibleDevices } from '@/lib/content'
import { routes } from '@/lib/navigation'
import { LogoMark } from '@/components/brand/Logo'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

/** Escritos enteros porque Tailwind sólo detecta las clases que ve literales. */
const SPAN_SM: Record<number, string> = { 1: 'sm:col-span-1', 2: 'sm:col-span-2' }
const SPAN_XL: Record<number, string> = {
  1: 'xl:col-span-1',
  2: 'xl:col-span-2',
  3: 'xl:col-span-3',
}

export async function DevicesShowcase({
  locale,
  dict,
  limit,
}: {
  locale: Locale
  dict: Dictionary
  limit?: number
}) {
  const [visibleDevices, resources] = await Promise.all([getVisibleDevices(), getResources()])
  const list = limit ? visibleDevices.slice(0, limit) : visibleDevices

  /**
   * La tarjeta de "próximamente" cierra siempre la retícula: se estira para
   * ocupar los huecos que deje la última fila, así el número de dispositivos
   * puede cambiar en el CMS sin que quede un agujero.
   */
  const fill = (columns: number) =>
    list.length % columns === 0 ? columns : columns - (list.length % columns)
  const soonSpan = `${SPAN_SM[fill(2)]} ${SPAN_XL[fill(3)]}`

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
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-500/45 hover:shadow-[0_30px_70px_-34px_rgb(0_151_178/0.6)]"
                >
                  {/* Cabecera siempre presente: con la foto del dispositivo o, si
                      todavía no la tiene, con el isotipo, para que la retícula no
                      quede a distintas alturas según qué fichas lleven foto. */}
                  <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden border-b border-line bg-[radial-gradient(circle_at_50%_20%,rgb(0_151_178/0.16),transparent_70%)]">
                    <div className="grid-tech absolute inset-0 opacity-40" aria-hidden="true" />
                    {device.photo ? (
                      <Image
                        src={device.photo}
                        alt={device.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <LogoMark className="relative h-16 w-16 text-brand-500/20 transition-all duration-700 group-hover:rotate-6 group-hover:text-brand-500/30" />
                    )}
                  </div>

                  <div className="relative flex flex-1 flex-col p-7">
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
                  </div>
                </Link>
              </TiltWrap>
            </StaggerItem>
          )
        })}

        {/* Cierra la retícula y adelanta lo que viene: el hueco pasa a contar algo */}
        <StaggerItem className={`h-full ${soonSpan}`}>
          <ComingSoonCard locale={locale} dict={dict} />
        </StaggerItem>
      </Stagger>
    </Section>
  )
}

/**
 * Tarjeta de "lo próximo". En vez de una foto lleva el plano de una ventana con
 * un pulso recorriendo el perfil: es lo que hay antes de que exista el producto.
 */
function ComingSoonCard({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Link
      href={routes.noticias(locale)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-dashed border-brand-500/35 bg-bg-elevated/40 transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-500/60"
    >
      <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden border-b border-dashed border-brand-500/25 bg-[radial-gradient(circle_at_50%_25%,rgb(0_151_178/0.18),transparent_70%)]">
        <div className="grid-tech absolute inset-0 opacity-50" aria-hidden="true" />

        <svg viewBox="0 0 160 110" className="relative h-28 w-auto" fill="none" aria-hidden="true">
          {/* Plano tenue: marco, cruceta y el hueco del cajón */}
          <g stroke="currentColor" className="text-brand-500/30" strokeWidth="1.5">
            <rect x="10" y="10" width="140" height="90" rx="3" />
            <path d="M80 10v90M10 55h140M10 24h140" />
          </g>

          {/* El pulso que recorre el perfil */}
          <rect
            x="10"
            y="10"
            width="140"
            height="90"
            rx="3"
            stroke="currentColor"
            className="text-brand-400 motion-safe:animate-[trace_5s_linear_infinite]"
            strokeWidth="2"
            strokeDasharray="38 422"
            strokeLinecap="round"
          />

          {/* El mando en la jamba, emitiendo */}
          <circle cx="10" cy="72" r="4" className="fill-brand-500" />
          <circle
            cx="10"
            cy="72"
            r="4"
            stroke="currentColor"
            className="origin-[10px_72px] text-brand-400 motion-safe:animate-[pulse-ring_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"
            strokeWidth="1.5"
          />
        </svg>

        {/* Barrido de escáner, como en una mesa de diseño */}
        <span
          className="pointer-events-none absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-brand-500/70 to-transparent motion-safe:animate-[scan_4s_ease-in-out_infinite]"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex flex-1 flex-col p-7">
        <Badge tone="brand">{dict.devices.soonEyebrow}</Badge>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-brand-500">
          {dict.devices.soonTitle}
        </h3>
        <p className="mt-3 text-[0.88rem] leading-relaxed text-fg-muted">{dict.devices.soonText}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8rem] font-semibold text-brand-500 transition-transform duration-300 group-hover:translate-x-1">
          {dict.devices.soonCta}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}
