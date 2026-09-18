'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/primitives'
import { EXTERNAL } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

const STORAGE_KEY = 'msw-cookie-choice'

export function CookieBanner({ dict }: { dict: Dictionary; locale: Locale }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const timer = setTimeout(() => setVisible(true), 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      // Modo privado o almacenamiento bloqueado: no insistimos
    }
  }, [])

  const choose = (choice: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      /* sin persistencia, pero la UI responde igual */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 z-90 w-[min(26rem,calc(100vw-2rem))]"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="region"
          aria-label={dict.cookies.title}
        >
          <div className="glass rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <Cookie className="h-4.5 w-4.5 text-brand-500" />
              <h2 className="font-display text-base font-bold">{dict.cookies.title}</h2>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted">{dict.cookies.text}</p>
            <div className="mt-4 flex items-center gap-2">
              <Button size="sm" onClick={() => choose('accepted')}>
                {dict.cookies.accept}
              </Button>
              <Button size="sm" variant="outline" onClick={() => choose('rejected')}>
                {dict.cookies.reject}
              </Button>
              <a
                href={EXTERNAL.privacy}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[0.75rem] text-fg-subtle underline-offset-4 hover:text-brand-500 hover:underline"
              >
                {dict.cookies.more}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
