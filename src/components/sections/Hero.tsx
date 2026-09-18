'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'

import { ButtonLink } from '@/components/ui/primitives'
import { ChevronRain, Counter, Magnetic } from '@/components/ui/motion'
import { ProductWordmark } from '@/components/brand/Logo'
import { routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export function Hero({
  locale,
  dict,
  stats,
}: {
  locale: Locale
  dict: Dictionary
  stats: { manuals: number; videos: number; cards: number; categories: number }
}) {
  const reduced = useReducedMotion()

  const statItems = [
    { value: stats.manuals, label: dict.hero.statManuals },
    { value: stats.videos, label: dict.hero.statVideos },
    { value: stats.cards, label: dict.hero.statCards },
    { value: stats.categories, label: dict.hero.statCategories },
  ]

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
      {/* ---------- Fondo ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-tech absolute inset-0 mask-fade-b opacity-70" />
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand-500/18 blur-[120px] animate-[aurora_18s_ease-in-out_infinite_alternate]" />
        <div className="absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-signal-500/12 blur-[120px] animate-[aurora_22s_ease-in-out_infinite_alternate-reverse]" />
        <ChevronRain count={12} className="opacity-70" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          {/* ---------- Columna de texto ---------- */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/25 bg-brand-500/8 py-1.5 pl-2 pr-4 text-[0.75rem] font-semibold"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-[pulse-ring_3s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-brand-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              {dict.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.1rem]"
            >
              {dict.hero.title}{' '}
              <span className="text-gradient">{dict.hero.titleAccent}</span>{' '}
              {dict.hero.titleEnd}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-[1.05rem]"
            >
              {dict.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center"
            >
              <Magnetic>
                <ButtonLink href={routes.recursos(locale)} size="lg" className="w-full xs:w-auto">
                  {dict.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </Magnetic>
              <ButtonLink
                href={routes.videos(locale)}
                size="lg"
                variant="secondary"
                className="w-full xs:w-auto"
              >
                <PlayCircle className="h-4.5 w-4.5" />
                {dict.hero.ctaSecondary}
              </ButtonLink>
            </motion.div>

            {/* ---------- Métricas ---------- */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:grid-cols-4"
            >
              {statItems.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-brand-500 sm:text-4xl">
                      <Counter to={stat.value} suffix="+" />
                    </span>
                    <span className="mt-1 block text-[0.72rem] uppercase tracking-[0.1em] text-fg-subtle">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------- Mockup animado ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <WindowMockup reduced={Boolean(reduced)} />
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-fg-subtle">
          {dict.hero.scroll}
        </span>
        <span className="h-9 w-px overflow-hidden bg-line">
          <span className="block h-4 w-px bg-brand-500 animate-[scan_2.6s_ease-in-out_infinite]" />
        </span>
      </div>
    </section>
  )
}

/* ==========================================================================
   Mockup: una ventana cuya persiana sube, y el móvil que la controla.
   Todo es SVG/CSS: sin imágenes, nítido en cualquier pantalla.
   ========================================================================== */
function WindowMockup({ reduced }: { reduced: boolean }) {
  const slats = Array.from({ length: 9 })

  return (
    <div className="relative aspect-[4/5] w-full sm:aspect-[5/5]">
      {/* Ventana */}
      <div className="absolute inset-x-4 top-0 bottom-16 overflow-hidden rounded-[2rem] border border-line bg-gradient-to-b from-signal-500/18 via-brand-500/8 to-transparent shadow-[0_40px_90px_-40px_rgb(0_151_178/0.6)] sm:inset-x-8">
        {/* Cielo */}
        <div className="absolute inset-0 bg-gradient-to-b from-signal-400/30 via-brand-400/12 to-brand-900/25" />
        <div className="absolute right-8 top-12 h-14 w-14 rounded-full bg-amber-300/75 blur-[2px] animate-[float_7s_ease-in-out_infinite]" />

        {/* Paisaje: horizonte y siluetas, para que la ventana dé a algún sitio */}
        <div className="absolute inset-x-0 bottom-0 h-1/3" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-0 h-px bg-brand-300/30" />
          <div className="absolute bottom-0 left-[8%] h-14 w-10 rounded-t-sm bg-brand-900/35" />
          <div className="absolute bottom-0 left-[20%] h-20 w-8 rounded-t-sm bg-brand-900/45" />
          <div className="absolute bottom-0 left-[31%] h-10 w-12 rounded-t-sm bg-brand-900/30" />
          <div className="absolute bottom-0 right-[24%] h-16 w-9 rounded-t-sm bg-brand-900/40" />
          <div className="absolute bottom-0 right-[10%] h-11 w-14 rounded-t-sm bg-brand-900/30" />
        </div>

        {/* Marco / cruceta */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-ink-700/70" />
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-ink-700/70" />
        </div>

        {/* Cajón de la persiana */}
        <div
          className="absolute inset-x-0 top-0 z-10 h-5 border-b-2 border-ink-950/50 bg-ink-800"
          aria-hidden="true"
        />

        {/* Persiana: las lamas suben al cargar */}
        <div className="absolute inset-x-0 top-5 flex flex-col">
          {slats.map((_, i) => (
            <motion.span
              key={i}
              className="h-[2.4rem] border-b border-ink-950/30 bg-gradient-to-b from-ink-700 to-ink-800"
              initial={{ scaleY: 1, opacity: 1 }}
              animate={reduced ? { scaleY: 1 } : { scaleY: i < 2 ? 1 : 0, opacity: 1 }}
              style={{ transformOrigin: 'top' }}
              transition={{
                duration: 0.9,
                delay: 0.7 + (slats.length - i) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </div>

        {/* Reflejo */}
        <div className="pointer-events-none absolute -inset-x-10 -top-1/2 h-full rotate-12 bg-gradient-to-b from-white/12 to-transparent" />
      </div>

      {/* Móvil con la app */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 w-[8.5rem] sm:right-2 sm:w-[10rem] lg:w-[11rem]"
      >
        <div className="glass rounded-[1.6rem] p-2.5 shadow-2xl">
          <div className="rounded-[1.1rem] bg-ink-900 p-3 text-white">
            <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/25" />
            <ProductWordmark className="block text-[0.6rem] leading-none text-white/70" />
            <p className="mt-2 font-display text-[0.72rem] font-bold leading-tight">Salón</p>

            {/* Barra de posición de la persiana */}
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/12">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-signal-500"
                initial={{ width: '8%' }}
                animate={{ width: reduced ? '82%' : ['8%', '82%'] }}
                transition={{ duration: 1.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="mt-1.5 text-[0.55rem] text-white/50">82% abierta</p>

            <div className="mt-3 grid grid-cols-3 gap-1">
              {['▲', '■', '▼'].map((symbol, i) => (
                <span
                  key={i}
                  className="grid h-6 place-items-center rounded-lg bg-white/8 text-[0.6rem] text-white/80"
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Anillos de señal saliendo del móvil */}
      {!reduced && (
        <div className="pointer-events-none absolute bottom-16 right-10 sm:right-14" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute h-16 w-16 rounded-full border border-brand-500/45"
              style={{ animation: `pulse-ring 3s cubic-bezier(0.4,0,0.6,1) ${i * 1}s infinite` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
