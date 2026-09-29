import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

/** Misma captura real que se usa en el móvil del hero de portada. */
const APP_SCREENSHOT_URL = '/hero/app-screenshot.webp'
const APP_SCREENSHOT_RATIO = '1280/2856'

/** Móvil estático con la captura real de la app, reutilizado en la portada y en /mysmartwindow. */
export function AppPhoneMockup({ className }: { className?: string }) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[13rem] sm:max-w-[15rem] lg:max-w-[16rem]', className)}>
      <div
        className="pointer-events-none absolute inset-0 -z-10 scale-125 rounded-[3rem] bg-brand-500/15 blur-[70px]"
        aria-hidden="true"
      />
      <div className="relative rounded-[2.4rem] bg-ink-950 p-[5px] shadow-2xl ring-1 ring-white/10">
        <span className="absolute -left-[2px] top-[19%] h-8 w-[4px] rounded-l-full bg-ink-700" aria-hidden="true" />
        <span className="absolute -left-[2px] top-[32%] h-12 w-[4px] rounded-l-full bg-ink-700" aria-hidden="true" />
        <span className="absolute -right-[2px] top-[22%] h-14 w-[4px] rounded-r-full bg-ink-700" aria-hidden="true" />

        <div
          className="relative overflow-hidden rounded-[2.15rem] bg-ink-900"
          style={{ aspectRatio: APP_SCREENSHOT_RATIO }}
        >
          <div className="absolute left-1/2 top-0 z-10 h-[1.1rem] w-[38%] -translate-x-1/2 rounded-b-xl bg-ink-950" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={APP_SCREENSHOT_URL}
            alt="App MySmartWindow controlando un dispositivo IoT Fenster"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Botón con forma de "badge" de tienda de apps (icono + dos líneas de
 * texto). No es el logotipo oficial de Apple/Google -no tenemos esos
 * assets-, pero reproduce el mismo formato reconocible para que la
 * descarga tenga el peso visual que le corresponde a la app de la marca.
 */
export function StoreBadge({
  href,
  icon: Icon,
  kicker,
  label,
}: {
  href: string
  icon: LucideIcon
  kicker: string
  label: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-2xl bg-ink-950 px-5 py-2.5 text-white ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-white/25"
    >
      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.6} />
      <span className="flex flex-col leading-tight">
        <span className="text-[0.68rem] text-white/60">{kicker}</span>
        <span className="font-display text-[1.05rem] font-bold">{label}</span>
      </span>
    </Link>
  )
}
