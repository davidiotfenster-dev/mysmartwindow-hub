'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, MessageCircle, RotateCcw, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { resourceTypeMeta } from '@/data/taxonomy'
import { routes } from '@/lib/navigation'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

/** Lo que el asistente puede ofrecer: seguir preguntando o mandarte a algún sitio. */
interface Choice {
  label: string
  /** Nodo al que salta. Si no hay, es un enlace final. */
  next?: string
  href?: string
  /** Enlace externo (WhatsApp): se abre en otra pestaña. */
  external?: boolean
}

interface Node {
  message: string
  choices: Choice[]
}

/** wa.me solo acepta digitos: prefijo de pais + numero, sin '+' ni espacios. */
function whatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

/**
 * Asistente de opciones. No hay ninguna inteligencia detrás: es un árbol de
 * respuestas escrito a mano, que es justo lo que hace falta para llevar a
 * cada visitante a su sitio -manuales, distribuidores o comercial- sin que
 * tenga que adivinar por dónde empezar.
 */
export function SupportAssistant({
  locale,
  dict,
  devices,
  whatsapp,
}: {
  locale: Locale
  dict: Dictionary
  devices: { id: string; name: string }[]
  whatsapp?: { sales: string; support: string }
}) {
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState<string[]>(['root'])
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  /**
   * El lanzador es fijo en la esquina, así que en un movil bajo de altura
   * (SE y similares) cae encima de lo que haya justo ahi al cargar -en la
   * portada, las dos ultimas metricas del hero-. Aparecer con un respiro en
   * vez de en el primer fotograma le da tiempo a quien entra a ver el
   * contenido debajo antes de que se tape; no hace falta en pantallas mas
   * altas, pero tampoco molesta.
   */
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const a = dict.assistant
  const current = path[path.length - 1]

  /** El árbol completo. Las claves de dispositivo van con prefijo para no chocar. */
  const nodes: Record<string, Node> = {
    root: {
      message: a.root,
      choices: [
        { label: a.optProblem, next: 'problem' },
        { label: a.optDocs, next: 'docs' },
        { label: a.optBuy, next: 'buy' },
        { label: a.optDevices, next: 'devices' },
      ],
    },
    problem: {
      message: a.askDevice,
      choices: [
        ...devices.slice(0, 5).map((device) => ({
          label: device.name,
          next: `device:${device.id}`,
        })),
        { label: a.optOtherDevice, next: 'devices' },
      ],
    },
    docs: {
      message: a.askFormat,
      choices: (['manual', 'video', 'tarjeta'] as const).map((type) => ({
        label: resourceTypeMeta[type].label[locale],
        href: `${routes.recursos(locale)}?tipo=${type}`,
      })),
    },
    buy: {
      message: a.askProfile,
      choices: [
        { label: dict.contact.profiles.manufacturer, next: 'pro' },
        { label: dict.contact.profiles.distributor, next: 'pro' },
        { label: dict.contact.profiles.user, next: 'enduser' },
      ],
    },
    pro: {
      message: a.proAnswer,
      choices: [
        { label: a.goContact, href: routes.contacto(locale) },
        ...(whatsapp
          ? [{ label: a.whatsappSales, href: whatsapp.sales, external: true }]
          : []),
      ],
    },
    enduser: {
      message: a.userAnswer,
      choices: [{ label: a.goPartners, href: routes.distribuidores(locale) }],
    },
    devices: {
      message: a.devicesAnswer,
      choices: [{ label: a.goAllDevices, href: routes.dispositivos(locale) }],
    },
  }

  // Una hoja por dispositivo: su ficha, y la puerta de salida a soporte
  for (const device of devices) {
    nodes[`device:${device.id}`] = {
      message: a.deviceAnswer,
      choices: [
        { label: a.goDevice, href: routes.dispositivo(locale, device.id) },
        ...(whatsapp
          ? [{ label: a.whatsappSupport, href: whatsapp.support, external: true }]
          : []),
      ],
    }
  }

  const node = nodes[current] ?? nodes.root

  /** La pausa de "escribiendo" es lo que hace que no parezca un menú. */
  function choose(choice: Choice) {
    if (!choice.next) return
    setTyping(true)
    setPath((previous) => [...previous, choice.next as string])
    const timer = setTimeout(() => setTyping(false), 450)
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [path, typing])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div
      className={`fixed bottom-16 right-4 z-80 flex flex-col items-end gap-3 transition-opacity duration-500 sm:bottom-24 sm:right-6 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex max-h-[min(30rem,70vh)] w-[min(21rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated shadow-2xl"
            role="dialog"
            aria-label={a.title}
          >
            {/* Cabecera */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <MessageCircle className="h-4.5 w-4.5" strokeWidth={2.2} />
                <span className="absolute -bottom-px -right-px h-2.5 w-2.5 rounded-full border-2 border-bg bg-emerald-500" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[0.92rem] font-bold leading-tight">{a.title}</p>
                <p className="truncate text-[0.72rem] text-fg-subtle">{a.subtitle}</p>
              </div>
              {path.length > 1 && (
                <button
                  type="button"
                  onClick={() => setPath(['root'])}
                  aria-label={a.restart}
                  title={a.restart}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-fg-subtle transition-colors hover:bg-fg/8 hover:text-fg"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={a.close}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-fg-subtle transition-colors hover:bg-fg/8 hover:text-fg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversación */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {path.map((step, index) => {
                const previous = index > 0 ? path[index - 1] : null
                const answered = previous
                  ? nodes[previous]?.choices.find((c) => c.next === step)?.label
                  : null

                return (
                  <div key={`${step}-${index}`} className="space-y-3">
                    {answered && (
                      <div className="flex justify-end">
                        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-brand-500 px-3.5 py-2 text-[0.82rem] font-medium text-white">
                          {answered}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-start">
                      <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-fg/8 px-3.5 py-2 text-[0.82rem] leading-relaxed text-fg">
                        {nodes[step]?.message ?? nodes.root.message}
                      </p>
                    </div>
                  </div>
                )
              })}

              {typing && (
                <div className="flex justify-start">
                  <span className="flex gap-1 rounded-2xl rounded-bl-md bg-fg/8 px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-fg-subtle motion-safe:animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* Opciones */}
            {!typing && (
              <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3.5">
                {node.choices.map((choice) =>
                  choice.href ? (
                    choice.external ? (
                      <a
                        key={choice.label}
                        href={choice.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-[0.8rem] font-semibold text-white transition-transform hover:scale-[1.03]"
                      >
                        {choice.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link
                        key={choice.label}
                        href={choice.href}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-2 text-[0.8rem] font-semibold text-white transition-transform hover:scale-[1.03]"
                      >
                        {choice.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )
                  ) : (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => choose(choice)}
                      className="rounded-full border border-line px-3.5 py-2 text-[0.8rem] font-semibold text-fg-muted transition-all hover:border-brand-500 hover:text-brand-500"
                    >
                      {choice.label}
                    </button>
                  )
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={a.launcher}
        aria-expanded={open}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white shadow-[0_14px_32px_-10px_rgb(0_151_178/0.7)] transition-transform duration-300 hover:scale-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        {!open && (
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-brand-500 motion-safe:animate-[pulse-ring_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"
            aria-hidden="true"
          />
        )}
        {open ? (
          <X className="relative h-6 w-6" strokeWidth={2.2} />
        ) : (
          <MessageCircle className="relative h-6.5 w-6.5" strokeWidth={2.1} fill="currentColor" fillOpacity={0.14} />
        )}
      </button>
    </div>
  )
}
