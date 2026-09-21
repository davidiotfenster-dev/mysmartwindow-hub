'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/primitives'
import {
  COOKIE_PREFERENCES_EVENT,
  readCookieChoice,
  storeCookieChoice,
  type CookieChoice,
} from '@/lib/consent'
import { routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export function CookieBanner({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!readCookieChoice()) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  // Retirar el consentimiento tiene que ser tan facil como darlo: el enlace
  // «Cookies» del pie vuelve a abrir este aviso aunque ya se hubiera elegido.
  useEffect(() => {
    const reopen = () => setVisible(true)
    window.addEventListener(COOKIE_PREFERENCES_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, reopen)
  }, [])

  const choose = (choice: CookieChoice) => {
    storeCookieChoice(choice)
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
              <Link
                href={routes.cookies(locale)}
                onClick={() => setVisible(false)}
                className="ml-auto text-[0.75rem] text-fg-subtle underline-offset-4 hover:text-brand-500 hover:underline"
              >
                {dict.cookies.more}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
