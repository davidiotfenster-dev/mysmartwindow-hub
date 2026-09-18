'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ==========================================================================
   Reveal — aparición al entrar en viewport
   ========================================================================== */
type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const reduced = useReducedMotion()
  const { x, y } = reduced ? offset.none : offset[direction]
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}

/* ==========================================================================
   Stagger — lista escalonada
   ========================================================================== */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}

/* ==========================================================================
   Magnetic — el elemento persigue ligeramente al cursor
   ========================================================================== */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.35 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.35 })

  if (reduced) return <span className={className}>{children}</span>

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x, y }}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}

/* ==========================================================================
   TiltCard — inclinación 3D con brillo que sigue al puntero
   ========================================================================== */
export function TiltCard({
  children,
  className,
  intensity = 9,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20,
  })

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={cn('[transform-style:preserve-3d]', className)}
      style={{ rotateX, rotateY, perspective: 900 }}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        px.set((event.clientX - rect.left) / rect.width)
        py.set((event.clientY - rect.top) / rect.height)
      }}
      onPointerLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
    >
      {children}
    </motion.div>
  )
}

/* ==========================================================================
   Counter — número que sube al entrar en pantalla
   ========================================================================== */
export function Counter({
  to,
  duration = 1400,
  className,
  suffix = '',
}: {
  to: number
  duration?: number
  className?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, to, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}

/* ==========================================================================
   Marquee — cinta infinita, se para al pasar el ratón
   ========================================================================== */
export function Marquee({
  children,
  className,
  speed = 38,
  reverse = false,
}: {
  children: ReactNode
  className?: string
  speed?: number
  reverse?: boolean
}) {
  return (
    <div className={cn('group relative overflow-hidden mask-fade-x', className)}>
      <div
        className="flex w-max gap-4 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   ChevronRain — el isotipo cayendo, motivo de marca del hero
   ========================================================================== */
export function ChevronRain({ count = 14, className }: { count?: number; className?: string }) {
  const reduced = useReducedMotion()
  const [drops, setDrops] = useState<{ left: number; delay: number; dur: number; size: number }[]>([])

  useEffect(() => {
    // Se genera en cliente para no romper la hidratación con valores aleatorios
    setDrops(
      Array.from({ length: count }, (_, i) => ({
        left: (i / count) * 100 + (Math.random() * 6 - 3),
        delay: Math.random() * 6,
        dur: 5 + Math.random() * 5,
        size: 10 + Math.random() * 16,
      }))
    )
  }, [count])

  if (reduced) return null

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {drops.map((drop, i) => (
        <svg
          key={i}
          viewBox="0 0 100 100"
          fill="none"
          className="absolute top-0 text-brand-500/30"
          style={{
            left: `${drop.left}%`,
            width: drop.size,
            height: drop.size,
            animation: `chevron-fall ${drop.dur}s linear ${drop.delay}s infinite`,
          }}
        >
          <path d="M18 27 50 87 82 27" stroke="currentColor" strokeWidth={11} />
        </svg>
      ))}
    </div>
  )
}
