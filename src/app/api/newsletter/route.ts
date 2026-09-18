import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ email: z.string().email().max(180) })

export async function POST(request: Request) {
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

  // Aqui se conectaria el proveedor real (Mailchimp, Brevo, Strapi...).
  console.info('[newsletter] alta', { email: parsed.data.email, at: new Date().toISOString() })

  return NextResponse.json({ ok: true })
}
