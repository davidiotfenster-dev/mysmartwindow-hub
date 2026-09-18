'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Hasta que monta, el tema real es desconocido en servidor: mantenemos una
  // etiqueta neutra para no provocar un desajuste de hidratación.
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full text-fg-muted transition-colors hover:bg-fg/6 hover:text-fg"
      aria-label={mounted ? (isDark ? 'Modo claro' : 'Modo oscuro') : 'Cambiar tema'}
      suppressHydrationWarning
    >
      {mounted && (
        <motion.span
          key={resolvedTheme}
          className="absolute inset-0 grid place-items-center"
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </motion.span>
      )}
    </button>
  )
}
