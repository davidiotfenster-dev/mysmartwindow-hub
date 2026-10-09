import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getSiteSettings } from '@/lib/content'
import { MailNotConfiguredError, sendMail } from '@/lib/mail'
import { clientIp, rateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'

/**
 * Recepcion del formulario de contacto: valida en servidor (nunca confiamos en
 * la validacion de cliente) y manda el mensaje por correo.
 *
 * Los asuntos de soporte y documentacion van al correo de soporte y el resto al
 * comercial; ambos se editan en el CMS (Ajustes del sitio), sin desplegar. El
 * correo lleva Reply-To con el email de quien escribe, asi que basta con
 * contestarlo.
 *
 * Si el correo no sale (SMTP sin configurar o caido) se responde con error, y
 * el formulario se lo dice al visitante: nunca "enviado" si no ha llegado a
 * nadie. El mensaje completo se escribe entonces en el log para no perderlo.
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

  const settings = await getSiteSettings()
  const to =
    subject === 'support' || subject === 'docs'
      ? settings.supportEmail || 'soporte@iotfenster.com'
      : settings.salesEmail || 'info@iotfenster.com'

  const text = [
    'Nuevo mensaje desde el formulario de contacto de la web.',
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Empresa: ${company || '—'}`,
    `Perfil: ${PROFILE_LABEL[profile]}`,
    `Asunto: ${SUBJECT_LABEL[subject]}`,
    `Idioma de la página: ${pageLanguage(request)}`,
    `Recibido: ${at}`,
    '',
    'Mensaje:',
    message,
    '',
    '—',
    `Puedes contestar a este correo: la respuesta irá a ${email}.`,
  ].join('\n')

  try {
    await sendMail({
      to,
      replyTo: email,
      subject: `[Web] ${SUBJECT_LABEL[subject]} — ${name}`,
      text,
    })
  } catch (error) {
    // Lo unico que queda de este mensaje: que no se pierda aunque el correo falle
    console.error('[contacto] ENVÍO FALLIDO, mensaje completo para no perderlo:', {
      name,
      email,
      company,
      profile,
      subject,
      message,
      at,
      motivo: error instanceof Error ? error.message : String(error),
    })
    return NextResponse.json(
      { ok: false, error: error instanceof MailNotConfiguredError ? 'mail_not_configured' : 'send_failed' },
      { status: 503 }
    )
  }

  console.info('[contacto] enviado', { subject, profile, to, at })
  return NextResponse.json({ ok: true })
}
