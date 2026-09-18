import { locales, type Locale } from '@/i18n/config'

/**
 * Cliente minimo para leer contenido de Strapi.
 *
 * Todo el catalogo (recursos, dispositivos, categorias...) puede vivir en el
 * CMS o en los ficheros estaticos de `src/data/`. Si `STRAPI_URL` no esta
 * configurada, o el CMS no responde, cada `get*()` de `src/lib/content/`
 * cae automaticamente en los datos estaticos: la web nunca se rompe por que
 * el CMS este caido o todavia no exista para ese entorno.
 */
const STRAPI_URL = (process.env.STRAPI_URL ?? '').replace(/\/$/, '')
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export const CMS_ENABLED = Boolean(STRAPI_URL)

export interface StrapiEntry {
  documentId: string
  [key: string]: unknown
}

interface StrapiListResponse {
  data: StrapiEntry[]
}

interface StrapiSingleResponse {
  data: StrapiEntry | null
}

/**
 * Varias paginas piden el mismo recurso a la vez durante la generacion
 * estatica (189 fichas + 27 dispositivos, cada una llamando a getResources()
 * por su cuenta). Sin este mapa, decenas de peticiones identicas y
 * simultaneas al mismo Strapi de desarrollo llegan a corromperse entre si;
 * con el, todas comparten la misma petición en vuelo.
 */
const inFlight = new Map<string, Promise<unknown | null>>()

async function request(path: string, revalidateSeconds: number): Promise<unknown | null> {
  if (!STRAPI_URL) return null

  const url = `${STRAPI_URL}${path}`
  const pending = inFlight.get(url)
  if (pending) return pending

  const promise = (async () => {
    try {
      return await requestWithRetry(url, revalidateSeconds, path)
    } finally {
      inFlight.delete(url)
    }
  })()

  inFlight.set(url, promise)
  return promise
}

/**
 * En `next dev`, muchas peticiones simultaneas a la misma URL de Strapi a
 * veces devuelven un cuerpo mezclado con el de otra peticion en vuelo (bug
 * conocido de la cache de `fetch` de Next en desarrollo). Un reintento basta:
 * la segunda vez ya no coincide con nada en vuelo. No pasa en produccion,
 * donde las paginas ya estan generadas y no hay este nivel de concurrencia.
 */
async function requestWithRetry(
  url: string,
  revalidateSeconds: number,
  path: string,
  attempt = 0
): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : undefined,
      next: { revalidate: revalidateSeconds, tags: ['cms'] },
    })
    if (!res.ok) {
      console.warn(`[cms] ${path} -> HTTP ${res.status}`)
      return null
    }
    const text = await res.text()
    try {
      return JSON.parse(text)
    } catch (parseErr) {
      if (attempt < 2) {
        return requestWithRetry(url, revalidateSeconds, path, attempt + 1)
      }
      console.warn(`[cms] respuesta corrupta de ${path} tras reintentar:`, (parseErr as Error).message)
      return null
    }
  } catch (err) {
    console.warn(`[cms] no se pudo contactar con Strapi en ${path}:`, (err as Error).message)
    return null
  }
}

/**
 * Pide una coleccion en los tres idiomas en paralelo. Si el CMS no responde
 * en ninguno, devuelve null (el llamador cae a los datos estaticos). Si
 * responde en algunos idiomas si y otros no, sigue adelante: `pickLocalized`
 * rellena los idiomas que falten con el español.
 */
export async function fetchCollectionAllLocales(
  apiPath: string,
  populate: string,
  revalidateSeconds = 3600
): Promise<Partial<Record<Locale, StrapiEntry[]>> | null> {
  if (!STRAPI_URL) return null

  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const json = (await request(
        `${apiPath}?locale=${locale}&populate=${populate}&pagination[pageSize]=500`,
        revalidateSeconds
      )) as StrapiListResponse | null
      return [locale, json?.data ?? []] as const
    })
  )

  const anySucceeded = perLocale.some(([, entries]) => entries.length > 0)
  if (!anySucceeded) return null

  return Object.fromEntries(perLocale) as Partial<Record<Locale, StrapiEntry[]>>
}

/** Igual que `fetchCollectionAllLocales` pero para un single type (p.ej. site-settings). */
export async function fetchSingleAllLocales(
  apiPath: string,
  populate: string,
  revalidateSeconds = 3600
): Promise<Partial<Record<Locale, StrapiEntry>> | null> {
  if (!STRAPI_URL) return null

  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const json = (await request(
        `${apiPath}?locale=${locale}&populate=${populate}`,
        revalidateSeconds
      )) as StrapiSingleResponse | null
      return [locale, json?.data] as const
    })
  )

  const anySucceeded = perLocale.some(([, entry]) => Boolean(entry))
  if (!anySucceeded) return null

  return Object.fromEntries(perLocale.filter(([, entry]) => Boolean(entry))) as Partial<
    Record<Locale, StrapiEntry>
  >
}

/** Agrupa entradas de distintos idiomas que son la misma ficha (mismo documentId). */
export function zipByDocumentId(
  byLocale: Partial<Record<Locale, StrapiEntry[]>>
): Map<string, Partial<Record<Locale, StrapiEntry>>> {
  const zipped = new Map<string, Partial<Record<Locale, StrapiEntry>>>()

  for (const locale of locales) {
    for (const entry of byLocale[locale] ?? []) {
      const bucket = zipped.get(entry.documentId) ?? {}
      bucket[locale] = entry
      zipped.set(entry.documentId, bucket)
    }
  }

  return zipped
}

/** Lee un campo localizado con fallback en cascada: idioma pedido -> es -> en -> it. */
export function pickLocalized(
  bucket: Partial<Record<Locale, StrapiEntry>>,
  field: string
): Record<Locale, string> {
  const es = (bucket.es?.[field] as string) ?? ''
  const en = (bucket.en?.[field] as string) ?? ''
  const it = (bucket.it?.[field] as string) ?? ''
  return {
    es: es || en || it,
    en: en || es || it,
    it: it || es || en,
  }
}

/** Primera entrada disponible de un grupo, para leer los campos no localizados. */
export function anyEntry(bucket: Partial<Record<Locale, StrapiEntry>>): StrapiEntry | undefined {
  return bucket.es ?? bucket.en ?? bucket.it
}

/**
 * URL de un fichero subido en el CMS, servida desde el propio dominio del
 * sitio (ver `src/app/api/media`). La dirección real del CMS puede ser interna
 * y no valdría para el navegador del visitante ni para las vistas previas al
 * compartir un enlace.
 */
export function mediaUrl(field: unknown): string | undefined {
  const url = (field as { url?: string } | null)?.url
  if (!url) return undefined
  // Si el CMS ya devuelve una URL completa (por ejemplo con almacenamiento en
  // la nube), esa ya es pública y se usa tal cual.
  return url.startsWith('http') ? url : `/api/media${url}`
}

export interface SeoOverrideRaw {
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  ogImage?: string
}

/** Lee el componente `shared.seo` de una entrada; undefined si el editor no lo ha rellenado. */
export function seoOverride(entry: StrapiEntry | undefined): SeoOverrideRaw | undefined {
  const seo = entry?.seo as Record<string, unknown> | null
  if (!seo) return undefined
  const override: SeoOverrideRaw = {
    metaTitle: (seo.metaTitle as string) || undefined,
    metaDescription: (seo.metaDescription as string) || undefined,
    keywords: (seo.keywords as string) || undefined,
    ogImage: mediaUrl(seo.ogImage),
  }
  return Object.values(override).some(Boolean) ? override : undefined
}
