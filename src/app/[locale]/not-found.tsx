import Link from 'next/link'
import { LogoMark } from '@/components/brand/Logo'

/**
 * El 404 no recibe params, así que se muestra en español con los enlaces
 * relativos al idioma por defecto. El middleware ya encamina a /es cualquier
 * ruta sin prefijo de idioma.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-tech absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/3 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand-500/15 blur-[110px]" />
      </div>

      <div className="container-page text-center">
        <LogoMark className="mx-auto h-16 w-16 text-brand-500/40" />
        <p className="mt-8 font-display text-7xl font-bold text-brand-500 sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Aquí no hay nada</h1>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-fg-muted">
          La página que buscas se ha mudado o nunca existió.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 xs:flex-row">
          <Link
            href="/es/recursos"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-500 px-8 font-semibold text-white transition-colors hover:bg-brand-400 xs:w-auto"
          >
            Ir al centro de recursos
          </Link>
          <Link
            href="/es"
            className="glass inline-flex h-12 w-full items-center justify-center rounded-full px-8 font-semibold transition-colors hover:text-brand-500 xs:w-auto"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
