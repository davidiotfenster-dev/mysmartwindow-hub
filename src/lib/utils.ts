import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Locale } from '@/i18n/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dateLocale: Record<Locale, string> = { es: 'es-ES', en: 'en-GB', it: 'it-IT' }

export function formatDate(iso: string | undefined, locale: Locale): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(dateLocale[locale], { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatViews(views: number | undefined, locale: Locale): string | undefined {
  if (typeof views !== 'number') return undefined
  return new Intl.NumberFormat(dateLocale[locale], { notation: 'compact' }).format(views)
}

/** Quita acentos y pasa a minusculas, para busquedas tolerantes. */
export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

/** Nombre de fichero legible a partir de una URL de PDF. */
export function fileNameFromUrl(url: string): string {
  try {
    const last = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '')
    return last || 'documento.pdf'
  } catch {
    return 'documento.pdf'
  }
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

/** Rellena los {marcadores} de una plantilla del diccionario. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''))
}
