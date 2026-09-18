import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/ui/primitives'
import { ChevronRain } from '@/components/ui/motion'

/** Cabecera común de las páginas internas. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pb-12 pt-28 sm:pb-16 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-tech absolute inset-0 mask-fade-b opacity-60" />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/15 blur-[110px]" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-signal-500/10 blur-[110px]" />
        <ChevronRain count={7} className="opacity-60" />
      </div>

      <div className="container-page">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-fg-muted">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  )
}
