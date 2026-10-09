import { NextResponse } from 'next/server'
import { z } from 'zod'

import { CmsDuplicateError, recipientFor, saveToCms } from '@/lib/cms-forms'
import { sendMail } from '@/lib/mail'
import { clientIp, rateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const schema = z.object({ email: z.string().email().max(180) })

const reason = (error: unknown) => (error instanceof Error ? error.message : String(error))

/**
 * Alta en la newsletter. Todavia no hay un proveedor de listas (Mailchimp,
 * Brevo...): cada alta se guarda en el CMS (tipo "Alta en la newsletter") y
 * llega por correo al buzon comercial, de donde se pasa a la lista.
 *
 * Solo se dice que esta suscrito si el alta ha quedado en alguno de los dos
 * sitios; si no queda en ninguno, error -y el email en el log-.
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
  const match = request.headers.get('referer')?.match(/^https?:\/\/[^/]+\/(es|en|it)(?:\/|$)/)

  // 1. CMS. Un correo que ya estaba dado de alta no es un fallo ni hace falta avisar otra vez.
  let saved = true
  let cmsError = ''
  try {
    await saveToCms('newsletter-subscribers', { email, pageLanguage: match ? match[1] : 'desconocido' })
  } catch (error) {
    if (error instanceof CmsDuplicateError) return NextResponse.json({ ok: true })
    saved = false
    cmsError = reason(error)
  }

  // 2. Correo al buzon comercial
  let emailed = true
  let emailError = ''
  try {
    await sendMail({
      to: await recipientFor('sales'),
      replyTo: email,
      subject: '[Web] Nueva alta en la newsletter',
      text: `Se ha dado de alta en la newsletter de la web:\n\n${email}\n\nRecibido: ${at}\n`,
    })
  } catch (error) {
    emailed = false
    emailError = reason(error)
  }

  if (!saved && !emailed) {
    console.error('[newsletter] NO SE PUDO ENTREGAR POR NINGUNA VIA, alta para no perderla:', {
      email,
      at,
      cms: cmsError,
      correo: emailError,
    })
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 503 })
  }

  console.info('[newsletter] alta recibida', { correo: emailed, cms: saved, at })
  return NextResponse.json({ ok: true })
}
