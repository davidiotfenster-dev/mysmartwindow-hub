import { cache } from 'react'

import type { Locale } from '@/i18n/config'
import { fetchSingleAllLocales, pickLocalized, seoOverride, type SeoOverrideRaw } from './strapi-client'

export type SiteSeo = SeoOverrideRaw

export interface SiteSettings {
  siteName: string
  organizationDescription: Record<Locale, string>
  /** Correo para consultas comerciales (precios, catalogo, disponibilidad). */
  salesEmail?: string
  /** Correo para soporte tecnico e incidencias sobre un dispositivo ya instalado. */
  supportEmail?: string
  contactPhone?: string
  /**
   * Numero de WhatsApp Business, solo digitos y prefijo de pais (ej. 34600111222).
   * Es el mismo numero para comercial y soporte; se diferencian por el mensaje
   * precargado de cada uno.
   */
  whatsappNumber?: string
  salesWhatsappMessage: Record<Locale, string>
  supportWhatsappMessage: Record<Locale, string>
  socialLinks: { label: string; url: string }[]
  seo: SiteSeo
}

/**
 * Ajustes globales del sitio. Si el CMS no responde o el editor no ha
 * rellenado nada todavia, se usa esta descripcion por defecto -la misma que
 * llevaba `organizationSchema()` en `src/lib/seo.ts` antes de que existiera
 * el CMS-.
 */
const FALLBACK: SiteSettings = {
  siteName: 'MySmartWindow',
  organizationDescription: {
    es: 'Ingeniería electrónica e IoT para fabricantes de cerramientos: domótica para ventanas, puertas, persianas y toldos.',
    en: 'Electronic and IoT engineering for enclosure manufacturers: home automation for windows, doors, blinds and awnings.',
    it: 'Ingegneria elettronica e IoT per i produttori di chiusure: domotica per finestre, porte, tapparelle e tende da sole.',
  },
  salesEmail: 'info@iotfenster.com',
  supportEmail: 'soporte@iotfenster.com',
  salesWhatsappMessage: {
    es: 'Hola, me gustaría información sobre precios y disponibilidad de MySmartWindow.',
    en: 'Hi, I would like information about MySmartWindow pricing and availability.',
    it: 'Ciao, vorrei informazioni su prezzi e disponibilità di MySmartWindow.',
  },
  supportWhatsappMessage: {
    es: 'Hola, tengo una incidencia con mi cerramiento MySmartWindow.',
    en: 'Hi, I have an issue with my MySmartWindow enclosure.',
    it: 'Ciao, ho un problema con la mia chiusura MySmartWindow.',
  },
  socialLinks: [],
  seo: {},
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const byLocale = await fetchSingleAllLocales('/api/site-setting', 'socialLinks,seo.ogImage')
  if (!byLocale) return FALLBACK

  const base = byLocale.es ?? byLocale.en ?? byLocale.it
  if (!base) return FALLBACK

  const salesWhatsappMessage = pickLocalized(byLocale, 'salesWhatsappMessage')
  const supportWhatsappMessage = pickLocalized(byLocale, 'supportWhatsappMessage')

  return {
    siteName: (base.siteName as string) || FALLBACK.siteName,
    organizationDescription: pickLocalized(byLocale, 'organizationDescription'),
    salesEmail: (base.salesEmail as string) || FALLBACK.salesEmail,
    supportEmail: (base.supportEmail as string) || FALLBACK.supportEmail,
    contactPhone: (base.contactPhone as string) || undefined,
    whatsappNumber: (base.whatsappNumber as string) || undefined,
    salesWhatsappMessage: {
      es: salesWhatsappMessage.es || FALLBACK.salesWhatsappMessage.es,
      en: salesWhatsappMessage.en || FALLBACK.salesWhatsappMessage.en,
      it: salesWhatsappMessage.it || FALLBACK.salesWhatsappMessage.it,
    },
    supportWhatsappMessage: {
      es: supportWhatsappMessage.es || FALLBACK.supportWhatsappMessage.es,
      en: supportWhatsappMessage.en || FALLBACK.supportWhatsappMessage.en,
      it: supportWhatsappMessage.it || FALLBACK.supportWhatsappMessage.it,
    },
    socialLinks: Array.isArray(base.socialLinks)
      ? (base.socialLinks as { label: string; url: string }[])
      : [],
    seo: seoOverride(base) ?? {},
  }
})
