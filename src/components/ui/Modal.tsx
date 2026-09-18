'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Modal accesible: bloquea el scroll, atrapa el foco dentro, cierra con Escape
 * y devuelve el foco al elemento que lo abrió.
 */
export function Modal({
  open,
  onClose,
  children,
  title,
  closeLabel = 'Cerrar',
  size = 'lg',
  className,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  closeLabel?: string
  size?: 'md' | 'lg' | 'xl' | 'full'
  className?: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    restoreFocus.current = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    // Foco inicial dentro del panel
    requestAnimationFrame(() => panelRef.current?.focus())

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      restoreFocus.current?.focus()
    }
  }, [open, onClose])

  const sizes = {
    md: 'max-w-lg',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[min(1200px,94vw)]',
  } as const

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink-950/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              'relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated shadow-2xl outline-none',
              sizes[size],
              className
            )}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <h2 className="pt-0.5 text-base font-semibold leading-snug sm:text-lg">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="-mr-1 shrink-0 rounded-full p-2 text-fg-muted transition-colors hover:bg-fg/6 hover:text-fg"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
