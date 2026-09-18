'use client'

import { AlertCircle, Check, Download, ExternalLink, FileText, Link2, Youtube } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Modal } from '@/components/ui/Modal'
import { Badge, ButtonLink } from '@/components/ui/primitives'
import { embedUrl } from '@/lib/youtube'
import { fileNameFromUrl, formatDate, formatViews } from '@/lib/utils'
import type { ResourceView } from '@/lib/resource-view'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import { pdfProxyUrl } from '@/lib/base-path'

/**
 * Un solo modal para los tres formatos:
 *  - video   -> reproductor de YouTube sin cookies, incrustado
 *  - manual  -> visor de PDF incrustado + descarga
 *  - tarjeta -> igual que el manual
 */
export function ResourceModal({
  resource,
  locale,
  dict,
  onClose,
}: {
  resource: ResourceView | null
  locale: Locale
  dict: Dictionary
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => setCopied(false), [resource?.id])

  const isVideo = resource?.type === 'video'

  async function copyLink() {
    if (!resource) return
    const url = new URL(window.location.href)
    url.searchParams.set('abrir', resource.id)
    try {
      await navigator.clipboard.writeText(url.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* el portapapeles puede estar bloqueado; no rompemos nada */
    }
  }

  return (
    <Modal
      open={Boolean(resource)}
      onClose={onClose}
      title={resource?.title}
      closeLabel={dict.common.close}
      size={isVideo ? 'xl' : 'full'}
    >
      {resource && (
        <div className="flex h-full flex-col">
          {/* Contenido */}
          <div className="min-h-0 flex-1">
            {isVideo && resource.youtubeId ? (
              <div className="aspect-video w-full bg-ink-950">
                <iframe
                  src={embedUrl(resource.youtubeId)}
                  title={resource.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : resource.broken ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-500/12 text-amber-500">
                  <AlertCircle className="h-6 w-6" />
                </span>
                <p className="font-display text-lg font-bold">{dict.common.unavailable}</p>
                <p className="max-w-sm text-sm text-fg-muted">{dict.common.unavailableHint}</p>
              </div>
            ) : resource.url ? (
              <>
                {/* Visor: se sirve desde nuestro origen para evitar bloqueos de framing */}
                <iframe
                  src={`${pdfProxyUrl(resource.url)}#view=FitH`}
                  title={resource.title}
                  className="hidden h-[62vh] w-full border-0 bg-bg-subtle sm:block"
                />

                {/* En móvil casi ningún navegador incrusta PDFs: mejor una ficha clara */}
                <div className="flex flex-col items-center gap-4 px-6 py-14 text-center sm:hidden">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-500/10 text-brand-500">
                    <FileText className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <p className="font-display text-lg font-bold leading-snug">{resource.title}</p>
                  {resource.summary && (
                    <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
                      {resource.summary}
                    </p>
                  )}
                  <ButtonLink
                    href={pdfProxyUrl(resource.url)}
                    external
                    className="w-full"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {dict.common.open}
                  </ButtonLink>
                </div>
              </>
            ) : null}
          </div>

          {/* Pie con metadatos y acciones */}
          <div className="shrink-0 border-t border-line bg-bg-elevated p-5">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone={isVideo ? 'signal' : resource.type === 'manual' ? 'brand' : 'amber'}>
                {resource.categoryName}
              </Badge>
              {resource.deviceName !== 'Ecosistema' && (
                <Badge tone="neutral">{resource.deviceName}</Badge>
              )}
              {resource.updated && (
                <span className="ml-1 text-[0.72rem] text-fg-subtle">
                  {dict.common.updated} {formatDate(resource.updated, locale)}
                </span>
              )}
              {typeof resource.views === 'number' && (
                <span className="text-[0.72rem] text-fg-subtle">
                  · {formatViews(resource.views, locale)} {dict.common.views}
                </span>
              )}
            </div>

            {resource.summary && (
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{resource.summary}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {isVideo && resource.watchUrl && (
                <ButtonLink href={resource.watchUrl} external size="sm">
                  <Youtube className="h-4 w-4" />
                  {dict.common.watchOnYoutube}
                </ButtonLink>
              )}

              {!isVideo && resource.url && !resource.broken && (
                <>
                  <ButtonLink href={resource.url} external size="sm" download>
                    <Download className="h-4 w-4" />
                    {dict.common.download}
                  </ButtonLink>
                  <ButtonLink href={resource.url} external size="sm" variant="outline">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {fileNameFromUrl(resource.url).slice(0, 34)}
                  </ButtonLink>
                </>
              )}

              <button
                type="button"
                onClick={copyLink}
                className="ml-auto inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-[0.8rem] font-semibold text-fg-muted transition-colors hover:border-brand-500 hover:text-brand-500"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
                {copied ? dict.common.copied : dict.common.copyLink}
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
