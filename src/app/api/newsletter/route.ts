import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getSiteSettings } from '@/lib/content'
import { MailNotConfiguredError, sendMail } from '@/lib/mail'
import { clientIp, rateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const schema = z.object({ email: z.string().email().max(180) })

/**
 * Alta en la newsletter. Todavia no hay un proveedor de listas (Mailchimp,
 * Brevo...): cada alta llega por correo al buzon comercial, de donde se pasa a
 * la lista. Si el correo no sale, se responde con error -y se deja el email en
 * el log- en vez de decirle a alguien que esta suscrito cuando no lo esta.
 */
export async function POST(request: Request) {
  if (rateLimited(`newsletter:${clientIp(request)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 })
  }

  const { email } = parsed.data
  const at = new Date().toISOString()
  const settings = await getSiteSettings()

  try {
    await sendMail({
      to: settings.salesEmail || 'info@iotfenster.com',
      replyTo: email,
      subject: '[Web] Nueva alta en la newsletter',
      text: `Se ha dado de alta en la newsletter de la web:\n\n${email}\n\nRecibido: ${at}\n`,
    })
  } catch (error) {
    console.error('[newsletter] ENVÍO FALLIDO, alta para no perderla:', {
      email,
      at,
      motivo: error instanceof Error ? error.message : String(error),
    })
    return NextResponse.json(
      { ok: false, error: error instanceof MailNotConfiguredError ? 'mail_not_configured' : 'send_failed' },
      { status: 503 }
    )
  }

  console.info('[newsletter] alta enviada', { at })
  return NextResponse.json({ ok: true })
}
