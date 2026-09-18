import { cn } from '@/lib/utils'

/**
 * Isotipo IOT FENSTER reconstruido en SVG.
 *
 * La marca es una V descendente con remates superiores y una barra central:
 * una flecha que baja, igual que una persiana. Al ser SVG podemos animar cada
 * trazo por separado, que es justo lo que hace el hero.
 */
export function LogoMark({
  className,
  animated = false,
}: {
  className?: string
  animated?: boolean
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={cn('h-8 w-8', className)}
      strokeLinecap="butt"
    >
      <g stroke="currentColor" strokeWidth={9}>
        {/* Remates superiores */}
        <path d="M8 27h22" className={animated ? 'origin-left animate-[slat-open_0s]' : undefined} />
        <path d="M70 27h22" />
        {/* Barra central: el "descenso" */}
        <path d="M50 21v40">
          {animated && (
            <animate
              attributeName="d"
              values="M50 21v10; M50 21v40; M50 21v40"
              dur="1.6s"
              begin="0.2s"
              fill="freeze"
            />
          )}
        </path>
        {/* La V */}
        <path d="M18 27 50 87 82 27" strokeLinejoin="miter" />
      </g>
    </svg>
  )
}

export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
}: {
  className?: string
  markClassName?: string
  /** Permite ocultar el logotipo en pantallas estrechas sin perder el isotipo. */
  wordmarkClassName?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={cn('h-7 w-7 shrink-0 text-brand-500', markClassName)} />
      {showWordmark && (
        <span
          className={cn(
            'font-display text-[1.05rem] font-bold leading-none tracking-[0.22em]',
            wordmarkClassName
          )}
        >
          <span className="text-brand-500">IOT</span>
          <span className="text-fg">FENSTER</span>
        </span>
      )}
    </span>
  )
}

/** Lockup del producto, para el hero y el pie. */
export function ProductWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-display font-bold tracking-tight', className)}>
      My<span className="text-gradient">Smart</span>Window
    </span>
  )
}
