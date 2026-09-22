'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

import { cn } from '@/lib/utils'

interface DeviceGalleryProps {
  name: string
  photos: string[]
  videos: string[]
  playLabel: string
}

type Slide = { kind: 'photo' | 'video'; src: string }

/**
 * Carrete de la ficha de dispositivo: fotos y vídeos propios del CMS.
 *
 * Con una sola foto y ningún vídeo se comporta como la imagen suelta de
 * siempre, sin miniaturas: no hay nada entre lo que elegir.
 *
 * Los vídeos no se descargan hasta que el visitante los elige, y ni siquiera
 * entonces del todo: `preload="metadata"` trae lo justo para pintar el primer
 * fotograma y saber cuánto dura. Un vídeo de producto pesa más que toda la
 * página junta, así que nunca debe cargarse por si acaso.
 */
export function DeviceGallery({ name, photos, videos, playLabel }: DeviceGalleryProps) {
  const slides: Slide[] = [
    ...photos.map((src) => ({ kind: 'photo' as const, src })),
    ...videos.map((src) => ({ kind: 'video' as const, src })),
  ]

  const [current, setCurrent] = useState(0)

  if (!slides.length) return null

  const active = slides[current] ?? slides[0]

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-[radial-gradient(circle_at_50%_20%,rgb(0_151_178/0.16),transparent_70%)]">
        <div className="grid-tech absolute inset-0 opacity-40" aria-hidden="true" />

        {active.kind === 'video' ? (
          <video
            key={active.src}
            src={active.src}
            controls
            preload="metadata"
            playsInline
            aria-label={`${playLabel}: ${name}`}
            className="absolute inset-0 h-full w-full bg-ink-950 object-contain"
          />
        ) : (
          <Image
            key={active.src}
            src={active.src}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 26rem"
            priority={current === 0}
            className="object-contain p-8"
          />
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={
                slide.kind === 'video' ? `${playLabel} ${index + 1}` : `${name} ${index + 1}`
              }
              aria-current={index === current}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-bg-elevated/60 transition-all',
                index === current
                  ? 'border-brand-500 ring-1 ring-brand-500/40'
                  : 'border-line hover:border-brand-500/50'
              )}
            >
              {slide.kind === 'video' ? (
                // Sin descargar nada: un rótulo, no un fotograma del vídeo.
                <span className="absolute inset-0 grid place-items-center bg-ink-950/60 text-brand-500">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              ) : (
                <Image src={slide.src} alt="" fill sizes="4rem" className="object-contain p-1.5" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
