import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Smartphone } from 'lucide-react'

import { LogoMark } from '@/components/brand/Logo'

/**
 * Instrucciones para que un usuario elimine su cuenta y sus datos de la app.
 *
 * Mantiene la direccion que ya tenia en el WordPress (/app-datadeletion/):
 * es la que se declara ante las tiendas de aplicaciones, asi que no puede
 * cambiar. Vive fuera de [locale] por el mismo motivo que /app-quick-help
 * (ver STANDALONE_ROUTES en src/middleware.ts). El texto reproduce el de la
 * copia de mayo de 2024 de la pagina original.
 */

export const metadata: Metadata = {
  title: 'Eliminación de cuenta y datos · MySmartWindow',
  description:
    'Cómo eliminar tu cuenta y los datos asociados de la aplicación MySmartWindow, desde la propia app o por correo electrónico.',
}

const SUPPORT_EMAIL = 'soporte@iotfenster.com'

const capturas = [
  {
    src: '/paginas/eliminar-cuenta-1.webp',
    alt: 'Pantalla principal de la app MySmartWindow, con el menú de tres puntos arriba a la derecha',
    caption: 'Pantalla principal',
  },
  {
    src: '/paginas/eliminar-cuenta-2.webp',
    alt: 'Menú de la app MySmartWindow desplegado, con la opción Eliminar Usuario resaltada',
    caption: 'Menú: «Eliminar Usuario»',
  },
]

export default function AppDataDeletionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <LogoMark className="h-12 w-12 text-brand-500" />
        <h1 className="mt-5 font-display text-3xl font-bold">
          Eliminación de cuenta y datos asociados para MySmartWindow
        </h1>

        <section className="mt-10">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-bold">
            <Mail className="h-5 w-5 text-brand-500" strokeWidth={2} />
            Eliminación vía correo electrónico
          </h2>
          <p className="mt-3 leading-relaxed text-fg-muted">
            Como usuario registrado de la aplicación MySmartWindow, puedes escribirnos a{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-brand-500 hover:text-brand-400"
            >
              {SUPPORT_EMAIL}
            </a>{' '}
            solicitando la eliminación de tu cuenta y de los datos asociados. Solo tienes que
            indicar tu identificador de usuario (el correo electrónico que introdujiste al
            registrarte) para que podamos realizar todo el proceso.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-bold">
            <Smartphone className="h-5 w-5 text-brand-500" strokeWidth={2} />
            Eliminación vía aplicación MySmartWindow
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-fg-muted">
            <li>Entra en la aplicación con tu usuario y contraseña.</li>
            <li>
              En la pantalla principal, pulsa el menú de tres puntos de la esquina superior
              derecha.
            </li>
            <li>
              Pulsa la opción <strong className="text-fg">«Eliminar usuario»</strong> del menú
              que aparece.
            </li>
          </ol>
          <p className="mt-3 leading-relaxed text-fg-muted">
            De esta manera se eliminarán tu cuenta y los datos de tu usuario actuales.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
            {capturas.map(({ src, alt, caption }) => (
              <figure key={src}>
                <Image
                  src={src}
                  alt={alt}
                  width={640}
                  height={1428}
                  sizes="(min-width: 672px) 300px, 45vw"
                  className="h-auto w-full rounded-2xl border border-line"
                />
                <figcaption className="mt-2 text-center text-sm text-fg-subtle">
                  {caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <p className="mt-10 leading-relaxed text-fg-muted">
          En cualquier caso, puedes contactar con nosotros en{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold text-brand-500 hover:text-brand-400"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </main>

      <footer className="border-t border-line px-6 py-6 text-center text-sm text-fg-subtle">
        <Link href="/es" className="hover:text-brand-500">
          IoT Fenster
        </Link>
      </footer>
    </div>
  )
}
