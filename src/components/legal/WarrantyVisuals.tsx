import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'

import type { Locale } from '@/i18n/config'

const copy: Record<Locale, { badge: string; altButtons: string; altPanel: string }> = {
  es: {
    badge: '5 años de garantía',
    altButtons: 'Pulsadores C-PULSAR y módulo de control IoT Fenster',
    altPanel: 'Paneles C-WALL de IoT Fenster, en blanco con iluminación RGB y en negro',
  },
  en: {
    badge: '5-year warranty',
    altButtons: 'IoT Fenster C-PULSAR push buttons and control module',
    altPanel: 'IoT Fenster C-WALL panels, in white with RGB lighting and in black',
  },
  it: {
    badge: '5 anni di garanzia',
    altButtons: 'Pulsanti C-PULSAR e modulo di controllo IoT Fenster',
    altPanel: 'Pannelli C-WALL di IoT Fenster, in bianco con illuminazione RGB e in nero',
  },
}

/** Fotos de producto para la página de garantía comercial, recortadas del certificado. */
export function WarrantyVisuals({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <div className="mb-12 grid gap-4 sm:grid-cols-[1.6fr_1fr]">
      <div className="relative h-32 overflow-hidden rounded-2xl border border-line sm:h-52">
        <Image
          src="/paginas/garantia-pulsadores.webp"
          alt={t.altButtons}
          fill
          sizes="(min-width: 640px) 440px, 100vw"
          className="object-cover"
          priority
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-ink-950/85 px-3.5 py-1.5 text-[0.8rem] font-bold text-white ring-1 ring-white/15 backdrop-blur">
          <ShieldCheck className="h-4 w-4 text-brand-400" strokeWidth={2} />
          {t.badge}
        </span>
      </div>
      <div className="relative hidden h-52 overflow-hidden rounded-2xl border border-line sm:block">
        <Image
          src="/paginas/garantia-cwall.webp"
          alt={t.altPanel}
          fill
          sizes="290px"
          className="object-cover"
        />
      </div>
    </div>
  )
}
