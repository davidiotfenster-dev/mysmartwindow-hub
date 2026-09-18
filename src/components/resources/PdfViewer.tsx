'use client'

import { Download, ExternalLink, FileText } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { ButtonLink } from '@/components/ui/primitives'
import type { Dictionary } from '@/i18n'
import { pdfProxyUrl } from '@/lib/base-path'

/**
 * Visor de PDF.
 *
 * El PDF se sirve por `/api/pdf` desde nuestro propio origen: incrustar uno
 * alojado en otro dominio falla a menudo. Aun asi hay navegadores sin visor
 * integrado -practicamente todos los moviles-, asi que mostramos una ficha de
 * respaldo y solo la ocultamos cuando el iframe confirma que ha cargado.
 */
export function PdfViewer({
  url,
  title,
  dict,
}: {
  url: string
  title: string
  dict: Dictionary
}) {
  const [loaded, setLoaded] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const proxied = pdfProxyUrl(url)

  useEffect(() => {
    // Si en 4 s el iframe no ha dado señales, damos por hecho que no hay visor
    timeout.current = setTimeout(() => setLoaded((v) => v), 4000)
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  return (
    <div className="overflow-hidden rounded-3xl border border-line">
      {/* Visor: sólo a partir de tablet, en móvil casi ningún navegador lo muestra */}
      <iframe
        src={`${proxied}#view=FitH`}
        title={title}
        onLoad={() => setLoaded(true)}
        className="hidden h-[70vh] w-full border-0 bg-bg-subtle sm:block"
      />

      {/* Ficha de respaldo: siempre en móvil, y en escritorio si el visor no carga */}
      <div className={`flex flex-col items-center gap-4 px-6 py-14 text-center ${loaded ? 'sm:hidden' : ''}`}>
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-500/10 text-brand-500">
          <FileText className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <p className="font-display text-lg font-bold leading-snug">{title}</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <ButtonLink href={proxied} external>
            <ExternalLink className="h-4 w-4" />
            {dict.common.open}
          </ButtonLink>
          <ButtonLink href={proxied} external variant="outline" download>
            <Download className="h-4 w-4" />
            {dict.common.download}
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
