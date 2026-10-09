import nodemailer from 'nodemailer'

/**
 * Envio de correo del sitio (formulario de contacto y newsletter) por SMTP.
 *
 * Todo sale de variables de entorno, que se ponen en el .env de la raiz en el
 * servidor (ver .env.example): no hay nada de esto en el codigo ni en el
 * navegador. Si falta la configuracion o el servidor de correo no responde,
 * `sendMail` LANZA un error: quien lo llama no debe dar el mensaje por enviado,
 * porque lo que no llega a nadie no puede contarse como enviado.
 */

export class MailNotConfiguredError extends Error {
  constructor() {
    super('SMTP sin configurar: faltan SMTP_HOST, SMTP_USER o SMTP_PASS')
  }
}

export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

/** Un asunto o un nombre con saltos de linea podria colar cabeceras de correo. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()

export async function sendMail({
  to,
  replyTo,
  subject,
  text,
}: {
  to: string
  replyTo?: string
  subject: string
  text: string
}): Promise<void> {
  if (!mailConfigured()) throw new MailNotConfiguredError()

  const port = Number(process.env.SMTP_PORT) || 587
  // 465 es TLS desde el primer byte; 587 empieza en claro y sube a TLS (STARTTLS)
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    // Nunca mandar la contraseña en claro: si el servidor no ofrece TLS, falla.
    // Solo se desactiva (SMTP_REQUIRE_TLS=false) para probar contra un servidor local.
    requireTLS: !secure && process.env.SMTP_REQUIRE_TLS !== 'false',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })

  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    replyTo,
    subject: oneLine(subject),
    text,
  })
}
