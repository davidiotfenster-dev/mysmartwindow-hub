import type { Metadata, Viewport } from 'next'
import { League_Spartan, Montserrat } from 'next/font/google'
import '../globals.css'

import { Providers } from '@/components/providers'

/**
 * Raiz obligatoria de esta ruta: vive fuera de [locale], asi que no hereda su
 * layout -sin eso, Next no tiene ningun <html>/<body> que ponerle-. Trae solo
 * lo imprescindible para que se vea como el resto del sitio (tipografia,
 * estilos, tema oscuro por defecto): nada de Header, Footer ni el asistente
 * flotante, que aqui no pintan nada.
 */

export const metadata: Metadata = {
  title: 'MySmartWindow',
}

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

export default function AppQuickHelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${leagueSpartan.variable} ${montserrat.variable}`}>
      <body className="min-h-dvh antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
