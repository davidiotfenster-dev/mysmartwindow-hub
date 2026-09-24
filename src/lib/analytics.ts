/**
 * Google Analytics solo se carga cuando el visitante acepta las cookies
 * (`components/layout/Analytics.tsx`). Antes se cargaba nada más entrar en modo
 * anónimo y, al aceptar, GA creaba un visitante nuevo que había perdido el
 * dato de origen: la mitad de las sesiones salían como «(not set)».
 *
 * Para no perder ese origen, el script del <head> guarda en `__mswLanding` la
 * URL de entrada (con sus utm_* / gclid) y el referrer, y se le pasan a GA en
 * la primera página vista.
 */

export const CONSENT_ACCEPTED_EVENT = 'msw:consent-accepted'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: Gtag
    __mswLanding?: { page_location: string; page_referrer: string }
    __mswGaLoaded?: boolean
  }
}

/** Parámetros de la primera página vista: la ruta actual con la campaña de la URL de entrada. */
export function landingPageParams() {
  const landing = window.__mswLanding
  const current = new URL(window.location.href)
  if (landing) {
    const entry = new URL(landing.page_location)
    if (!current.search && entry.search) current.search = entry.search
  }
  return {
    page_location: current.toString(),
    page_referrer: landing?.page_referrer ?? document.referrer,
  }
}

/**
 * Envía un evento a GA si está cargado. Sin consentimiento no se encola nada:
 * si se encolara, se enviaría al aceptar como si hubiera pasado después.
 */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === 'undefined' || !window.__mswGaLoaded || !window.gtag) return
  window.gtag('event', name, params)
}

export function setAnalyticsConsent(granted: boolean) {
  if (typeof window === 'undefined' || !window.gtag) return
  const value = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  })
}
