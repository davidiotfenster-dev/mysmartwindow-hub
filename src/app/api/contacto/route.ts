import { NextResponse } from 'next/server'
import { z } from 'zod'

import { recipientFor, saveToCms } from '@/lib/cms-forms'
import { MailNotConfiguredError, sendMail } from '@/lib/mail'
import { clientIp, rateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'

/**
 * Recepcion del formulario de contacto: valida en servidor (nunca confiamos en
 * la validacion de cliente) y deja el mensaje en DOS sitios: por correo y en el
 * CMS (tipo "Mensaje de contacto"), donde se ve en el panel aunque el correo
 * falle.
 *
 * Los asuntos de soporte y documentacion van al correo de soporte y el resto al
 * comercial; ambos se editan en el CMS (Ajustes del sitio), sin desplegar. El
 * correo lleva Reply-To con el email de quien escribe, asi que basta con
 * contestarlo.
 *
 * Al visitante solo se le dice que ha ido bien si el mensaje ha quedado en
 * alguno de los dos sitios. Si no queda en ninguno responde con error -el
 * formulario ya lo muestra- y el mensaje completo se escribe en el log, para
 * no perderlo.
 */
const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  company: z.string().max(180).optional().or(z.literal('')),
  profile: z.enum(['manufacturer', 'distributor', 'installer', 'user']),
  subject: z.enum(['support', 'commercial', 'docs', 'other']),
  message: z.string().min(10).max(5000),
  consent: z.literal(true),
})

const SUBJECT_LABEL = {
  support: 'Soporte técnico',
  commercial: 'Comercial',
  docs: 'Documentación',
  other: 'Otro',
} as const

const PROFILE_LABEL = {
  manufacturer: 'Fabricante',
  distributor: 'Distribuidor',
  installer: 'Instalador',
  user: 'Usuario final',
} as const

/** Idioma de la pagina desde la que escribe (/es/contacto -> es), para saber en que contestar. */
function pageLanguage(request: Request): string {
  const match = request.headers.get('referer')?.match(/^https?:\/\/[^/]+\/(es|en|it)(?:\/|$)/)
  return match ? match[1] : 'desconocido'
}

const reason = (error: unknown) => (error instanceof Error ? error.message : String(error))

export async function POST(request: Request) {
  // 5 mensajes cada 10 minutos por visitante: de sobra para una persona
  if (rateLimited(`contacto:${clientIp(request)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  // Campo trampa: las personas no lo ven y no lo rellenan, los bots si. Se les
  // contesta que todo ha ido bien para que no sepan que los hemos descartado.
  if (typeof payload === 'object' && payload !== null && 'website' in payload && payload.website) {
    return NextResponse.json({ ok: true })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation_failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { name, email, company, profile, subject, message } = parsed.data
  const at = new Date().toISOString()
  const language = pageLanguage(request)

  const to = await recipientFor(subject === 'support' || subject === 'docs' ? 'support' : 'sales')

  const text = [
    'Nuevo mensaje desde el formulario de contacto de la web.',
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Empresa: ${company || '—'}`,
    `Perfil: ${PROFILE_LABEL[profile]}`,
    `Asunto: ${SUBJECT_LABEL[subject]}`,
    `Idioma de la página: ${language}`,
    `Recibido: ${at}`,
    '',
    'Mensaje:',
    message,
    '',
    '—',
    `Puedes contestar a este correo: la respuesta irá a ${email}.`,
  ].join('\n')

  // 1. Correo
  let emailStatus: 'sent' | 'failed' | 'not_configured' = 'sent'
  let emailError = ''
  try {
    await sendMail({
      to,
      replyTo: email,
      subject: `[Web] ${SUBJECT_LABEL[subject]} — ${name}`,
      text,
    })
  } catch (error) {
    emailStatus = error instanceof MailNotConfiguredError ? 'not_configured' : 'failed'
    emailError = reason(error)
  }

  // 2. CMS, con el estado del correo para que en el panel se vea que mensajes
  //    no llegaron tambien por correo
  let saved = true
  let cmsError = ''
  try {
    await saveToCms('contact-messages', {
      name,
      email,
      company: company || undefined,
      profile,
      subject,
      message,
      pageLanguage: language,
      emailStatus,
      emailError: emailError ? emailError.slice(0, 250) : undefined,
    })
  } catch (error) {
    saved = false
    cmsError = reason(error)
  }

  if (emailStatus !== 'sent' && !saved) {
    // Lo unico que queda de este mensaje: que no se pierda
    console.error('[contacto] NO SE PUDO ENTREGAR POR NINGUNA VIA, mensaje completo para no perderlo:', {
      name,
      email,
      company,
      profile,
      subject,
      message,
      at,
      correo: emailError,
      cms: cmsError,
    })
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 503 })
  }

  if (emailStatus !== 'sent') {
    console.warn('[contacto] guardado en el CMS pero el correo no salió:', { at, motivo: emailError })
  }
  if (!saved) {
    console.warn('[contacto] enviado por correo pero no se pudo guardar en el CMS:', { at, motivo: cmsError })
  }
  console.info('[contacto] recibido', { subject, profile, correo: emailStatus, cms: saved, at })
  return NextResponse.json({ ok: true })
}
