'use client'

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  AnimatePresence,
} from 'framer-motion'
import { ArrowRight, PlayCircle, AlertTriangle } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ButtonLink } from '@/components/ui/primitives'
import { ChevronRain, Counter, Magnetic } from '@/components/ui/motion'
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

  const [exploded, setExploded] = useState(false)

  return (
    <motion.section 
      animate={
        exploded 
          ? { 
              rotate: [0, 2, -3, 4, -2, 1, -4, 0],
              x: [0, 10, -10, 15, -15, 5, -5, 0],
              y: [0, -10, 10, -15, 15, -5, 5, 0],
              filter: ['blur(0px) invert(0%)', 'blur(4px) invert(100%)', 'blur(0px) invert(0%)', 'blur(8px) hue-rotate(90deg)', 'blur(0px) invert(0%)'],
              scale: [1, 1.05, 0.95, 1.1, 0.9, 1]
            } 
          : {}
      }
      transition={{ 
        duration: 0.5, 
        repeat: exploded ? Infinity : 0,
        repeatType: 'mirror'
      }}
      className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44"
    >
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
              className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 sm:mt-12 sm:gap-y-7 sm:pt-8 sm:grid-cols-4"
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
            <WindowMockup reduced={Boolean(reduced)} dict={dict} onExplode={(isExploding) => setExploded(isExploding)} />
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
    </motion.section>
  )
}

/** Captura real de la app controlando el Pulsar, para la pantalla del móvil del mockup. */
const APP_SCREENSHOT_URL = '/hero/app-screenshot.webp'
/** Proporción exacta de la captura, para que se vea completa sin recortes dentro del marco. */
const APP_SCREENSHOT_RATIO = '1280/2856'
/** Foto real del Pulsar (con el fondo ya recortado), para montarla sobre el marco de la ventana. */
const PULSAR_PHOTO_URL = '/hero/pulsar-button.png'
/** La misma ventana de la app pero con la persiana bajada del todo: se va descubriendo por arriba. */
const APP_BLIND_URL = '/hero/app-blind.webp'
/** Dónde cae esa ventana dentro de la captura, en % de la imagen. */
const APP_WINDOW = { left: '36.8%', top: '34.17%', width: '53.05%' }

/** Cuánto tapa la persiana, en % de la ventana, en cada extremo del recorrido. */
const BLIND_CLOSED = 100
const BLIND_OPEN = 13
/** Segundos del recorrido completo, para que subir a medias tarde la mitad. */
const BLIND_TRAVEL = 2.6

/**
 * Posición de los tres botones dentro de la captura de la app, en % de la
 * imagen. Van encima de las flechas que ya salen dibujadas en la captura,
 * así que si algún día se cambia la captura hay que reajustarlos.
 */
const APP_CONTROLS = { left: '12.8%', width: '16.7%', height: '7.3%' }
const APP_CONTROL_TOP = { up: '35.5%', stop: '46.3%', down: '57.3%' }

/* ==========================================================================
   Mockup: una ventana con persiana motorizada que sube y baja de verdad
   -desde las flechas de la app o desde el Pulsar del marco-. Todo es CSS
   salvo dos fotos reales: la captura de la app y el propio Pulsar.
   ========================================================================== */
function WindowMockup({ reduced, dict, onExplode }: { reduced: boolean; dict: Dictionary; onExplode?: (exploding: boolean) => void }) {
  const cover = useMotionValue(BLIND_CLOSED)
  const coverHeight = useMotionTemplate`${cover}%`
  /** La persiana dibujada en la app se descubre por arriba en la misma proporción. */
  const appBlindClip = useTransform(cover, (value) => `inset(0 0 ${100 - value}% 0)`)
  const travel = useRef<AnimationPlaybackControls | null>(null)
  const [moving, setMoving] = useState(false)

  // Easter Egg State
  const clickCount = useRef(0)
  const [overheated, setOverheated] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [exploding, setExploding] = useState(false)

  const checkEasterEgg = useCallback(() => {
    if (overheated || exploding) return true
    clickCount.current += 1
    if (clickCount.current >= 8) {
      setOverheated(true)
      return true
    }
    return false
  }, [overheated, exploding])

  useEffect(() => {
    if (!overheated) return
    let count = 3
    setCountdown(count)
    const interval = setInterval(() => {
      count -= 1
      if (count <= 0) {
        clearInterval(interval)
        setExploding(true)
        onExplode?.(true)
        
        setTimeout(() => {
          setExploding(false)
          setOverheated(false)
          onExplode?.(false)
          clickCount.current = 0
        }, 5000)
      } else {
        setCountdown(count)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [overheated, onExplode])

  const move = useCallback(
    (to: number) => {
      if (checkEasterEgg()) return
      travel.current?.stop()
      if (reduced) {
        cover.set(to)
        return
      }
      setMoving(true)
      travel.current = animate(cover, to, {
        duration: (Math.abs(cover.get() - to) / 100) * BLIND_TRAVEL,
        ease: 'linear',
        onComplete: () => setMoving(false),
      })
    },
    [cover, reduced]
  )

  const halt = useCallback(() => {
    if (checkEasterEgg()) return
    travel.current?.stop()
    setMoving(false)
  }, [checkEasterEgg])

  /** Al entrar, la persiana sube sola: enseña de qué va el mockup sin tocar nada. */
  useEffect(() => {
    const timer = setTimeout(() => move(BLIND_OPEN), 700)
    return () => {
      clearTimeout(timer)
      travel.current?.stop()
    }
  }, [move])

  const toggle = () =>
    move(cover.get() > (BLIND_CLOSED + BLIND_OPEN) / 2 ? BLIND_OPEN : BLIND_CLOSED)

  return (
    <>
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

        {/* Persiana: sale del cajón y baja hasta tapar la ventana entera */}
        <motion.div
          className="absolute inset-x-0 top-5 overflow-hidden"
          style={{ height: coverHeight }}
          aria-hidden="true"
        >
          {/* Lamas: un degradado que se repite, así llenan cualquier altura */}
          <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,#26323b_0,#171f26_1.6rem,#080c0f_1.85rem,#26323b_2rem)]" />
          {/* Barra inferior, más gruesa que las lamas, como en una persiana real */}
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-b from-ink-600 via-ink-800 to-ink-950 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.65)]" />
        </motion.div>

        {/* Reflejo */}
        <div className="pointer-events-none absolute -inset-x-10 -top-1/2 h-full rotate-12 bg-gradient-to-b from-white/12 to-transparent" />
      </div>

      {/* Jamba y Pulsar: fuera del cristal (sin overflow-hidden), a caballo sobre el borde de la ventana */}
      <div className="pointer-events-none absolute inset-x-4 top-0 bottom-16 sm:inset-x-8">
        {/* Jamba izquierda: el perfil lateral de la ventana, de cajón a suelo.
            Tono ink-800, el mismo que el fondo de la foto del Pulsar, para que el
            botón se funda con el perfil en vez de leerse como una pegatina aparte. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="absolute left-0 top-5 bottom-0 z-10 w-7 -translate-x-1/2 overflow-hidden rounded-full bg-ink-800 shadow-[0_10px_26px_-10px_rgba(0,0,0,0.7)] ring-1 ring-black/40 sm:w-8"
          aria-hidden="true"
        >
          {/* Canto izquierdo iluminado y canto derecho recogiendo el verde del cristal */}
          <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-signal-400/18 to-transparent" />
          <span className="absolute inset-y-0 left-[24%] w-px bg-white/12" />
          {/* La luz del LED derramándose sobre el perfil */}
          <span
            className={`absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/25 blur-xl transition-opacity duration-500 ${moving ? 'opacity-100' : 'opacity-50'}`}
          />
        </motion.div>

        {/* Pulsar: el mando de pared real; se puede pulsar como el de verdad */}
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={dict.hero.blindToggle}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.92 }}
          className="pointer-events-auto absolute left-0 top-1/2 z-20 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-400"
        >
          <span
            className={`absolute inset-0 -m-1 rounded-full bg-signal-400/40 blur-[6px] motion-safe:animate-[pulse-ring_2.4s_cubic-bezier(0.4,0,0.6,1)_infinite] ${moving ? 'opacity-100' : 'opacity-70'}`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PULSAR_PHOTO_URL}
            alt=""
            className="relative h-7 w-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.75)] sm:h-8 sm:w-8"
          />
        </motion.button>
      </div>

      {/* Móvil con la app */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 w-[7.4rem] sm:right-2 sm:w-[8.6rem] lg:w-[9.4rem]"
      >
        {/* Chasis: bisel oscuro con muescas de botones laterales, como un movil real */}
        <div className="relative rounded-[1.9rem] bg-ink-950 p-[3px] shadow-2xl ring-1 ring-white/10">
          <span className="absolute -left-[2px] top-[19%] h-6 w-[3px] rounded-l-full bg-ink-700" />
          <span className="absolute -left-[2px] top-[30%] h-9 w-[3px] rounded-l-full bg-ink-700" />
          <span className="absolute -right-[2px] top-[22%] h-10 w-[3px] rounded-r-full bg-ink-700" />

          <div
            className="relative overflow-hidden rounded-[1.7rem] bg-ink-900 text-white"
            style={{ aspectRatio: APP_SCREENSHOT_RATIO }}
          >
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-20 h-[0.9rem] w-[38%] -translate-x-1/2 rounded-b-lg bg-ink-950" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={APP_SCREENSHOT_URL}
              alt="App MySmartWindow controlando el Pulsar"
              className="h-full w-full object-cover"
            />

            {/* La persiana dibujada en la app se mueve a la vez que la de la ventana */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={APP_BLIND_URL}
              alt=""
              className="absolute"
              style={{ ...APP_WINDOW, clipPath: appBlindClip }}
            />

            {/* Mandos reales, justo encima de las flechas de la captura */}
            {(
              [
                { key: 'up', top: APP_CONTROL_TOP.up, label: dict.hero.blindUp, run: () => move(BLIND_OPEN) },
                { key: 'stop', top: APP_CONTROL_TOP.stop, label: dict.hero.blindStop, run: halt },
                { key: 'down', top: APP_CONTROL_TOP.down, label: dict.hero.blindDown, run: () => move(BLIND_CLOSED) },
              ] as const
            ).map(({ key, top, label, run }) => (
              <button
                key={key}
                type="button"
                onClick={run}
                aria-label={label}
                style={{ ...APP_CONTROLS, top }}
                className="absolute z-10 rounded-full ring-white/0 transition-all duration-200 hover:bg-white/15 hover:ring-2 hover:ring-white/50 active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-400"
              />
            ))}
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

      <AnimatePresence>
        {overheated && !exploding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-red-700/95 p-4 text-center backdrop-blur-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <AlertTriangle className="mb-6 h-32 w-32 text-yellow-300 drop-shadow-[0_0_25px_rgba(253,224,71,0.6)]" />
            </motion.div>
            <h2 className="font-display text-4xl font-black uppercase tracking-widest text-white drop-shadow-md sm:text-6xl lg:text-8xl">
              ¡Motor<br/>Sobrecalentado!
            </h2>
            <p className="mt-8 text-xl font-bold text-red-100 drop-shadow-md sm:text-3xl">
              La página explotará en <span className="text-5xl font-black text-white">{countdown}</span> segundos...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Explosión visual superpuesta (opcional para dar más caos) */}
      <AnimatePresence>
        {exploding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1, 0, 0.8, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="pointer-events-none fixed inset-0 z-[9999] bg-white mix-blend-difference"
          />
        )}
      </AnimatePresence>
    </>
  )
}
