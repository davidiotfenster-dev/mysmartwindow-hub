'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

import { CONSENT_ACCEPTED_EVENT, landingPageParams, trackEvent } from '@/lib/analytics'
import { readCookieChoice } from '@/lib/consent'

/**
 * Carga Google Analytics solo con consentimiento (ver `lib/analytics.ts`).
 * Los cambios de ruta de Next los recoge la «medición mejorada» de GA, igual
 * que con el componente de `@next/third-parties` al que sustituye.
 */
export function Analytics({ gaId }: { gaId: string }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (readCookieChoice() === 'accepted') setEnabled(true)
    const enable = () => setEnabled(true)
    window.addEventListener(CONSENT_ACCEPTED_EVENT, enable)
    return () => window.removeEventListener(CONSENT_ACCEPTED_EVENT, enable)
  }, [])

  useEffect(() => {
    if (!enabled || window.__mswGaLoaded) return
    window.__mswGaLoaded = true
    window.gtag?.('js', new Date())
    window.gtag?.('config', gaId, landingPageParams())
  }, [enabled, gaId])

  // Clics en email y WhatsApp: son contactos aunque no pasen por el formulario.
  useEffect(() => {
    if (!enabled) return
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.href
      const method = href.startsWith('mailto:')
        ? 'email'
        : href.startsWith('tel:')
          ? 'phone'
          : /wa\.me|whatsapp\.com/.test(href)
            ? 'whatsapp'
            : null
      if (method) trackEvent('contact_click', { method, page_path: window.location.pathname })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled])

  if (!enabled) return null
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
}
