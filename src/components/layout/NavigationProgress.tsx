'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Barra de progreso de navegación.
 *
 * El App Router no expone eventos de router, así que detectamos el clic sobre
 * un enlace interno y mantenemos la barra hasta que cambia la ruta. Da
 * respuesta inmediata al pulsar, que es justo lo que faltaba: antes el clic
 * parecía no hacer nada y la página aparecía de golpe.
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pending, setPending] = useState(false)

  // Al completarse la navegación, la ruta cambia y retiramos la barra
  useEffect(() => {
    setPending(false)
  }, [pathname, searchParams])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Misma página: no hay navegación que esperar
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      setPending(true)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Red de seguridad: si algo va mal, la barra no se queda colgada
  useEffect(() => {
    if (!pending) return
    const timer = setTimeout(() => setPending(false), 8000)
    return () => clearTimeout(timer)
  }, [pending])

  return (
    <AnimatePresence>
      {pending && (
        <motion.div
          className="fixed inset-x-0 top-0 z-200 h-0.5 origin-left bg-gradient-to-r from-brand-500 via-signal-500 to-brand-400"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.9, transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.22 } }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  )
}
