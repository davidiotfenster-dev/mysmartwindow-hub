import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Globe, MessageCircle, Youtube } from 'lucide-react'

import { LogoMark } from '@/components/brand/Logo'
import { EXTERNAL } from '@/lib/navigation'

/**
 * Contenido de /app/supportpage.html, grabado a fuego en la app movil.
 *
 * No es una pagina del sitio: la sirve el middleware por reescritura (ver
 * HIDDEN_ALIASES en src/middleware.ts), sin menu, sin sitemap, con noindex.
 * Reproduce la estructura de la version anterior -icono, guias, soporte,
 * pie- pero con el estilo del sitio actual en vez de Bootstrap generico, y
 * con los enlaces llevando a las paginas de verdad de hoy en vez de a las
 * del WordPress retirado.
 *
 * Sin selector de idioma a proposito: la version que sustituye tampoco lo
 * tenia, y la app apunta a esta unica URL sin distinguir idioma.
 */

export const metadata: Metadata = {
  title: 'Ayuda · MySmartWindow',
  robots: { index: false, follow: false },
}

const guias = [
  { href: EXTERNAL.youtube, external: true, icon: Youtube, label: 'YouTube' },
  { href: '/es/recursos', external: false, icon: BookOpen, label: 'Materiales de ayuda' },
  { href: 'https://www.iotfenster.com', external: true, icon: Globe, label: 'Página web' },
]

/**
 * Mismo numero y mensaje que el boton de soporte de /es/contacto y del
 * asistente flotante. Si cambia alli (Ajustes del sitio, en el CMS), hay que
 * actualizarlo tambien aqui a mano: esta pagina vive fuera de [locale] y no
 * lee el CMS, a proposito, para no depender de que Strapi responda.
 */
const WHATSAPP_SUPPORT_URL =
  'https://wa.me/660804391?text=Hola%2C%20tengo%20una%20incidencia%20con%20mi%20cerramiento%20MySmartWindow.'

export default function AppQuickHelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-12 text-center">
        <LogoMark className="mx-auto h-14 w-14 text-brand-500" />
        <h1 className="mt-5 font-display text-2xl font-bold">MySmartWindow</h1>

        <section className="mt-10">
          <p className="font-display text-sm font-bold uppercase tracking-[0.1em] text-fg-subtle">
            Consulta nuestras guías
          </p>
          <div className="mt-4 space-y-3">
            {guias.map(({ href, external, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center gap-2.5 rounded-full border border-line bg-bg-elevated/60 px-5 py-3.5 font-semibold transition-colors hover:border-brand-500/50 hover:text-brand-500"
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <p className="font-display text-sm font-bold uppercase tracking-[0.1em] text-fg-subtle">
            ¿Necesitas ayuda? Contacta con nosotros
          </p>
          <div className="mt-4">
            <Link
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full bg-brand-500 px-5 py-3.5 font-semibold text-white transition-colors hover:bg-brand-400"
            >
              <MessageCircle className="h-4.5 w-4.5" strokeWidth={2} />
              Soporte
            </Link>
          </div>
        </section>
      </div>

      <footer className="border-t border-line px-6 py-8 text-center">
        <LogoMark className="mx-auto h-7 w-7 text-fg-subtle" />
        <p className="mt-3 text-[0.78rem] text-fg-subtle">
          © {new Date().getFullYear()} IoT Fenster. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}
