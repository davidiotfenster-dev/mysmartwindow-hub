import type { Viewport } from 'next'
import { notFound } from 'next/navigation'
import { League_Spartan, Montserrat } from 'next/font/google'
import '../../globals.css'

import { Providers } from '@/components/providers'
import { isTycLang } from '@/data/app-tyc'

/**
 * Raiz de las paginas de Terminos y Condiciones de la app. Vive fuera de
 * [locale] porque la app los pide en seis idiomas (/es, /en, /it, /de, /fr,
 * /pt) y el sitio solo tiene tres: el middleware reescribe /{idioma}/app-tyc
 * hasta aqui. Como en /app-quick-help, no lleva Header ni Footer del sitio,
 * pero si el idioma real en <html lang>.
 */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-league-spartan',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export default async function AppTycLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isTycLang(lang)) notFound()

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${leagueSpartan.variable} ${montserrat.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
