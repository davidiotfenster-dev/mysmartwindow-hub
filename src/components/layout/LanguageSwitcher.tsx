'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { locales, localeMeta, type Locale } from '@/i18n/config'
import { switchLocalePath } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[0.78rem] font-semibold uppercase tracking-wide text-fg-muted transition-colors hover:bg-fg/6 hover:text-fg"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Idioma"
      >
        <Globe className="h-4 w-4" />
        {locale}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-2xl border border-line bg-bg-elevated p-1.5 shadow-xl"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            {locales.map((code) => (
              <li key={code} role="none">
                <Link
                  role="menuitem"
                  href={switchLocalePath(pathname, code)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors',
                    code === locale
                      ? 'bg-brand-500/10 font-semibold text-brand-500'
                      : 'text-fg-muted hover:bg-fg/5 hover:text-fg'
                  )}
                >
                  <span aria-hidden="true">{localeMeta[code].flag}</span>
                  {localeMeta[code].label}
                  {code === locale && <Check className="ml-auto h-3.5 w-3.5" />}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
