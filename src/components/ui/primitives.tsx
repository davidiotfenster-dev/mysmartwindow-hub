import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ==========================================================================
   Button / ButtonLink
   ========================================================================== */
const buttonBase =
  'relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

const buttonVariants = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-400 shadow-[0_10px_34px_-12px_rgb(0_151_178/0.85)] hover:shadow-[0_16px_46px_-12px_rgb(0_151_178/0.95)] hover:-translate-y-0.5',
  secondary:
    'glass text-fg hover:border-brand-500/45 hover:text-brand-500 hover:-translate-y-0.5',
  ghost: 'text-fg-muted hover:text-brand-500 hover:bg-brand-500/8',
  outline:
    'border border-line-strong text-fg hover:border-brand-500 hover:text-brand-500 hover:-translate-y-0.5',
} as const

const buttonSizes = {
  sm: 'h-9 px-4 text-[0.8rem]',
  md: 'h-11 px-6 text-[0.9rem]',
  lg: 'h-13 px-8 text-[0.95rem]',
} as const

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonSize = keyof typeof buttonSizes

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    />
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  external,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant
  size?: ButtonSize
  external?: boolean
}) {
  return (
    <Link
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  )
}

/* ==========================================================================
   Badge
   ========================================================================== */
export function Badge({
  children,
  className,
  tone = 'brand',
}: {
  children: ReactNode
  className?: string
  tone?: 'brand' | 'signal' | 'amber' | 'neutral'
}) {
  const tones = {
    brand: 'bg-brand-500/12 text-brand-600 dark:text-brand-300 border-brand-500/25',
    signal: 'bg-signal-500/12 text-signal-600 dark:text-signal-400 border-signal-500/25',
    amber: 'bg-amber-500/12 text-amber-700 dark:text-amber-300 border-amber-500/25',
    neutral: 'bg-fg/6 text-fg-muted border-line',
  } as const

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em]',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

/* ==========================================================================
   Eyebrow — el pequeño rótulo con el chevron de marca
   ========================================================================== */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-brand-500',
        className
      )}
    >
      <svg viewBox="0 0 100 100" fill="none" className="h-3 w-3 shrink-0">
        <path d="M18 27 50 87 82 27" stroke="currentColor" strokeWidth={13} />
      </svg>
      {children}
    </span>
  )
}

/* ==========================================================================
   SectionHeading
   ========================================================================== */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  action?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        action && 'sm:flex-row sm:items-end sm:justify-between sm:gap-8',
        className
      )}
    >
      <div className={cn('flex flex-col gap-3.5', align === 'center' && 'items-center')}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-3xl sm:text-4xl lg:text-[2.9rem]">{title}</h2>
        {subtitle && (
          <p
            className={cn(
              'max-w-2xl text-[0.98rem] leading-relaxed text-fg-muted',
              align === 'center' && 'mx-auto'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/* ==========================================================================
   Section — envoltorio con separación coherente
   ========================================================================== */
export function Section({
  children,
  className,
  id,
  bleed = false,
}: {
  children: ReactNode
  className?: string
  id?: string
  bleed?: boolean
}) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-28', className)}>
      <div className={bleed ? undefined : 'container-page'}>{children}</div>
    </section>
  )
}

/* ==========================================================================
   GlowCard — tarjeta base del sistema
   ========================================================================== */
export function GlowCard({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-line bg-bg-elevated/70 backdrop-blur-sm transition-all duration-400',
        interactive &&
          'hover:border-brand-500/40 hover:shadow-[0_24px_60px_-28px_rgb(0_151_178/0.55)] hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}

/* ==========================================================================
   Divider decorativo con el motivo de lamas
   ========================================================================== */
export function SlatDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'h-px w-full bg-gradient-to-r from-transparent via-brand-500/35 to-transparent',
        className
      )}
    />
  )
}
