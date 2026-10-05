import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { tycBlocks, TYC_VERSION, type TycSegment } from '@/data/app-tyc'
import type { Locale } from '@/i18n/config'
import { absolute } from '@/lib/seo'

/**
 * Términos y Condiciones de Servicio de la app Konect (PROFINE IBERIA SAU).
 *
 * La dirección (/es/app-tyc) es la que usa la app, así que no puede cambiar.
 * El documento solo existe en español: es un texto contractual y no se
 * traduce por su cuenta, de modo que en /en y /it la página no existe en vez
 * de enseñar castellano bajo una cabecera en otro idioma. El texto es el del
 * documento v1.0, sin retocar (ver src/data/app-tyc.ts).
 */

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'es' }]
}

export const metadata: Metadata = {
  title: 'Términos y Condiciones del Servicio',
  description:
    'Términos y Condiciones de Servicio de Konect Cloud, ofrecido por PROFINE IBERIA SAU a los usuarios de la app.',
  alternates: { canonical: absolute('/es/app-tyc') },
}

function Segments({ segments }: { segments: TycSegment[] }) {
  return (
    <>
      {segments.map((segment, i) =>
        typeof segment === 'string' ? (
          segment
        ) : (
          <strong key={i} className="font-semibold text-fg">
            {segment.b}
          </strong>
        )
      )}
    </>
  )
}

export default async function AppTycPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  if (locale !== 'es') notFound()

  return (
    <>
      <PageHeader title={<GradientTitle text="Términos y Condiciones de Servicio" />}>
        <p className="text-[0.9rem] text-fg-subtle">Versión de este documento: {TYC_VERSION}</p>
      </PageHeader>

      <div className="container-page py-14 sm:py-20">
        <article className="max-w-3xl">
          {tycBlocks.map((block, i) => {
            if (block.t === 'h') {
              return (
                <h2 key={i} className="mt-10 font-display text-xl font-bold first:mt-0">
                  {block.text}
                </h2>
              )
            }
            if (block.t === 'ul') {
              return (
                <ul
                  key={i}
                  className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-fg-muted marker:text-brand-500"
                >
                  {block.items.map((item, j) => (
                    <li key={j}>
                      <Segments segments={item} />
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={i} className="mt-4 leading-relaxed text-fg-muted">
                <Segments segments={block.s} />
              </p>
            )
          })}
        </article>

        <footer className="mt-16 max-w-3xl border-t border-line pt-8 text-center">
          <p className="text-sm text-fg-subtle">© 2024 - PROFINE IBERIA SAU</p>
          <Image
            src="/paginas/profine-logo.webp"
            alt="Logo PROFINE IBERIA"
            width={480}
            height={232}
            className="mx-auto mt-6 h-auto w-48"
          />
        </footer>
      </div>
    </>
  )
}
