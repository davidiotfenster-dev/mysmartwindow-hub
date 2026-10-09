/**
 * Guarda en el CMS lo que llega por los formularios (mensajes de contacto y
 * altas de la newsletter), para verlo en el panel de Strapi ademas de recibirlo
 * por correo -y para no perderlo si el correo falla-.
 *
 * Escribe con un token de API propio (STRAPI_FORMS_TOKEN) que solo puede
 * CREAR en esos dos tipos: no lee ni edita nada, ni siquiera lo que ya ha
 * guardado. Los dos tipos no tienen lectura publica, asi que nadie de fuera
 * ve lo que contienen. El token se crea en el panel (ver .env.example).
 */

export type FormCollection = 'contact-messages' | 'newsletter-subscribers'

export class CmsFormsNotConfiguredError extends Error {
  constructor() {
    super('CMS sin configurar para formularios: faltan STRAPI_URL o STRAPI_FORMS_TOKEN')
  }
}

/** El CMS ya tiene ese registro (un correo ya suscrito): no es un fallo. */
export class CmsDuplicateError extends Error {}

const DEFAULT_RECIPIENTS = { sales: 'info@iotfenster.com', support: 'soporte@iotfenster.com' } as const

/**
 * A que correo se manda un mensaje: el comercial o el de soporte de los Ajustes
 * del sitio del CMS. Se lee en el momento y sin cache: un cambio hecho en el
 * panel vale para el siguiente mensaje, no una hora despues. Si el CMS no
 * responde o el campo esta vacio, las direcciones de siempre.
 */
export async function recipientFor(kind: 'sales' | 'support'): Promise<string> {
  const fallback = DEFAULT_RECIPIENTS[kind]
  if (!process.env.STRAPI_URL) return fallback
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/site-setting?locale=es`, {
      signal: AbortSignal.timeout(4_000),
      cache: 'no-store',
    })
    const text = await res.text()
    if (!res.ok) return fallback
    const body = JSON.parse(text) as { data?: { salesEmail?: unknown; supportEmail?: unknown } }
    const value = kind === 'sales' ? body.data?.salesEmail : body.data?.supportEmail
    return typeof value === 'string' && value.includes('@') ? value.trim() : fallback
  } catch {
    return fallback
  }
}

export function cmsFormsConfigured(): boolean {
  return Boolean(process.env.STRAPI_URL && process.env.STRAPI_FORMS_TOKEN)
}

export async function saveToCms(
  collection: FormCollection,
  data: Record<string, unknown>
): Promise<void> {
  if (!cmsFormsConfigured()) throw new CmsFormsNotConfiguredError()

  const res = await fetch(`${process.env.STRAPI_URL}/api/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_FORMS_TOKEN}`,
    },
    body: JSON.stringify({ data }),
    // No colgar al visitante si el CMS no responde
    signal: AbortSignal.timeout(8_000),
    cache: 'no-store',
  })
  // Se lee siempre el cuerpo, tambien cuando todo va bien: una respuesta sin
  // consumir deja la conexion a medias.
  const body = await res.text().catch(() => '')
  if (res.ok) return

  if (res.status === 400 && /must be unique/i.test(body)) throw new CmsDuplicateError()
  throw new Error(`El CMS respondió ${res.status}: ${body.slice(0, 200)}`)
}
