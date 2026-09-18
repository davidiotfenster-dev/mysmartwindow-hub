import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * Recepcion del formulario de contacto.
 *
 * Valida en servidor (nunca confiamos en la validacion de cliente) y, por
 * ahora, registra el mensaje. El envio real -SMTP, Resend, o el endpoint de
 * Strapi cuando exista- se engancha aqui sin tocar el formulario.
 */
const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  company: z.string().max(180).optional().or(z.literal('')),
  subject: z.enum(['support', 'commercial', 'docs', 'other']),
  message: z.string().min(10).max(5000),
  consent: z.literal(true),
})

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation_failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { name, email, subject } = parsed.data
  console.info('[contacto] nuevo mensaje', { name, email, subject, at: new Date().toISOString() })

  return NextResponse.json({ ok: true })
}
