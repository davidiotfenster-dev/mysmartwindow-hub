import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import {
  isTycLang,
  TYC_LANGS,
  tycDocuments,
  type TycSegment,
} from '@/data/app-tyc'
import { absolute } from '@/lib/seo'

/**
 * Terminos y Condiciones de Servicio de la app mySmartWindow, en los seis
 * idiomas de la app. La direccion publica es /{idioma}/app-tyc (la app la
 * tiene grabada, no puede cambiar); el middleware la reescribe a esta ruta.
 * El texto es el entregado por el equipo, sin retocar: ver src/data/app-tyc.ts.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return TYC_LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isTycLang(lang)) return {}
  const doc = tycDocuments[lang]

  return {
    title: `${doc.pageTitle} · MySmartWindow`,
    alternates: {
      canonical: absolute(`/${lang}/app-tyc`),
      languages: Object.fromEntries(TYC_LANGS.map((l) => [l, absolute(`/${l}/app-tyc`)])),
    },
  }
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

export default async function AppTycPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isTycLang(lang)) notFound()
  const doc = tycDocuments[lang]

  return (
    <div className="bg-bg text-fg">
      <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
        <header className="border-b border-line pb-6">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{doc.title}</h1>
          <p className="mt-3 text-sm text-fg-subtle">{doc.version}</p>
        </header>

        <article className="pb-4">
          {doc.blocks.map((block, i) => {
            if (block.t === 'h') {
              return (
                <h2 key={i} className="mt-10 font-display text-xl font-bold">
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

        <footer className="mt-14 border-t border-line pt-8 text-center">
          <p className="text-sm text-fg-subtle">{doc.copyright}</p>
          {/* El logo es texto oscuro sobre transparente: en el tema oscuro se
              perderia, asi que va sobre una pastilla clara. */}
          <div className="mx-auto mt-6 w-fit rounded-xl bg-white px-6 py-4">
            <Image
              src="/paginas/iot-fenster-logo.webp"
              alt={doc.logoAlt}
              width={444}
              height={114}
              className="h-auto w-44"
            />
          </div>
        </footer>
      </main>
    </div>
  )
}
