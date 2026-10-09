'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * Pulsarito, el botón del asistente: el pulsador redondo C-PULSAR de IoT Fenster.
 *
 * Cerrado es solo el pulsador (bisel negro, anillo de luz azul y una "?" en la
 * tapa), sin cara. Al pulsarlo se abre la ayuda y "se levanta": salta, y salen
 * de golpe la cara, las manos y los pies. Abierto se mueve de vez en cuando sin
 * desplazarse (saluda, da pasitos, mira a un lado) y parpadea. Cerrado, cada
 * cierto tiempo suelta un mensaje en un bocadillo para llamar la atención.
 *
 * El dibujo es el de Pulsarito Morales, el primo C-PULSAR de la mascota del
 * panel interno (repo panel, public/mascota.js, primoSVG), sin tocar. Los
 * movimientos están en globals.css (clases pul-*).
 */

/** Misma escala (0,8 px por unidad del dibujo) cerrado y abierto. */
const VIEWBOX_CLOSED = '17 34 78 84'
const VIEWBOX_OPEN = '6 30 108 128'

/** Cerrado: el primer mensaje a los 20-40 s y los siguientes cada 60-150 s. */
const FIRST_MESSAGE_MS: [number, number] = [20_000, 40_000]
const NEXT_MESSAGE_MS: [number, number] = [60_000, 150_000]
const MESSAGE_VISIBLE_MS = 9_000
/** Abierto: un gesto de 2 s cada 5-11 s y un parpadeo cada 2,5-6 s. */
const GESTURE_EVERY_MS: [number, number] = [5_000, 11_000]
const GESTURE_MS = 2_000
const BLINK_EVERY_MS: [number, number] = [2_500, 6_000]
const BLINK_MS = 150

/** Si el visitante cierra este número de mensajes, no se le vuelve a hablar en la sesión. */
const MAX_DISMISSED = 2
const DISMISSED_KEY = 'pulsarito-dismissed'

type Gesture = 'wave' | 'steps' | 'look-l' | 'look-r'
const GESTURES: Gesture[] = ['wave', 'steps', 'look-l', 'look-r']

const between = ([min, max]: [number, number]) => min + Math.random() * (max - min)

// sessionStorage puede fallar o no existir (modo privado, bloqueo de datos del sitio)
function readDismissed(): number {
  try {
    return Number(window.sessionStorage.getItem(DISMISSED_KEY)) || 0
  } catch {
    return 0
  }
}
function writeDismissed(value: number) {
  try {
    window.sessionStorage.setItem(DISMISSED_KEY, String(value))
  } catch {
    /* sin almacenamiento: solo se pierde el recuerdo entre páginas */
  }
}

export function Pulsarito({
  open,
  onToggle,
  onOpen,
  panelId,
  label,
  closeLabel,
  messages,
}: {
  open: boolean
  onToggle: () => void
  /** Abrir la ayuda sin alternar: lo usa el bocadillo al hacer clic en el texto. */
  onOpen: () => void
  panelId: string
  label: string
  closeLabel: string
  messages: string[]
}) {
  const [message, setMessage] = useState<string | null>(null)
  const [gesture, setGesture] = useState<Gesture | null>(null)
  const [blink, setBlink] = useState(false)

  const dismissed = useRef(0)
  const spoken = useRef(0)
  const bag = useRef<string[]>([])

  useEffect(() => {
    dismissed.current = readDismissed()
  }, [])

  // Cerrado: mensajes en el bocadillo
  useEffect(() => {
    if (open) {
      setMessage(null)
      return
    }
    if (messages.length === 0) return

    let talkTimer: ReturnType<typeof setTimeout>
    let hideTimer: ReturnType<typeof setTimeout>

    /** De una bolsa barajada: no se repite ninguno hasta haberlos dicho todos. */
    function nextMessage(): string {
      if (bag.current.length === 0) {
        bag.current = [...messages].sort(() => Math.random() - 0.5)
      }
      return bag.current.pop() as string
    }

    function schedule(delay: number) {
      talkTimer = setTimeout(() => {
        if (dismissed.current >= MAX_DISMISSED) return
        // Con la pestaña oculta nadie lo ve: se espera al siguiente turno
        if (!document.hidden) {
          spoken.current += 1
          setMessage(nextMessage())
          hideTimer = setTimeout(() => setMessage(null), MESSAGE_VISIBLE_MS)
        }
        schedule(between(NEXT_MESSAGE_MS))
      }, delay)
    }

    schedule(between(spoken.current === 0 ? FIRST_MESSAGE_MS : NEXT_MESSAGE_MS))
    return () => {
      clearTimeout(talkTimer)
      clearTimeout(hideTimer)
    }
  }, [open, messages])

  // Abierto: gestos y parpadeo. Con "movimiento reducido" no hay ninguno.
  useEffect(() => {
    if (!open) {
      setGesture(null)
      setBlink(false)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let gestureTimer: ReturnType<typeof setTimeout>
    let gestureEnd: ReturnType<typeof setTimeout>
    let blinkTimer: ReturnType<typeof setTimeout>
    let blinkEnd: ReturnType<typeof setTimeout>

    function nextGesture() {
      gestureTimer = setTimeout(() => {
        setGesture(GESTURES[Math.floor(Math.random() * GESTURES.length)])
        gestureEnd = setTimeout(() => setGesture(null), GESTURE_MS)
        nextGesture()
      }, between(GESTURE_EVERY_MS))
    }
    function nextBlink() {
      blinkTimer = setTimeout(() => {
        setBlink(true)
        blinkEnd = setTimeout(() => setBlink(false), BLINK_MS)
        nextBlink()
      }, between(BLINK_EVERY_MS))
    }

    nextGesture()
    nextBlink()
    return () => {
      clearTimeout(gestureTimer)
      clearTimeout(gestureEnd)
      clearTimeout(blinkTimer)
      clearTimeout(blinkEnd)
    }
  }, [open])

  function dismissMessage() {
    dismissed.current += 1
    writeDismissed(dismissed.current)
    setMessage(null)
  }

  const alert = message !== null && !open

  return (
    <div className="relative flex flex-col items-end">
      {/* La región existe siempre: un aviso que aparece en una región ya montada es el que se anuncia */}
      <div role="status" className="flex justify-end">
        <AnimatePresence>
          {alert && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-2 mr-1 flex max-w-[min(16rem,calc(100vw-5rem))] items-start gap-1.5 rounded-2xl rounded-br-md border border-line bg-bg-elevated py-2 pl-3.5 pr-2 shadow-xl"
            >
              <button
                type="button"
                onClick={onOpen}
                className="cursor-pointer py-0.5 text-left text-[0.82rem] font-medium leading-snug text-fg"
              >
                {message}
              </button>
              <button
                type="button"
                onClick={dismissMessage}
                aria-label={closeLabel}
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-fg-subtle transition-colors hover:bg-fg/8 hover:text-fg"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        data-open={open || undefined}
        data-alert={alert || undefined}
        data-gesture={gesture ?? undefined}
        data-blink={blink || undefined}
        className="pul relative block cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
      >
        <span className="pul-hop block">
          <span className="pul-float block">
            <svg
              viewBox={open ? VIEWBOX_OPEN : VIEWBOX_CLOSED}
              aria-hidden="true"
              className={`block h-auto overflow-visible ${open ? 'w-[5.4rem]' : 'w-[3.9rem]'}`}
            >
              <defs>
                <linearGradient id="pul-bisel" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#3a3b40" />
                  <stop offset="1" stopColor="#0c0d0f" />
                </linearGradient>
                <radialGradient id="pul-tapa" cx=".42" cy=".38" r=".75">
                  <stop offset="0" stopColor="#26272c" />
                  <stop offset="1" stopColor="#121316" />
                </radialGradient>
                <filter id="pul-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.6" />
                </filter>
                <clipPath id="pul-rosca">
                  <ellipse cx="76" cy="78" rx="27" ry="32" />
                </clipPath>
              </defs>

              {/* piernas y pies (detrás del cuerpo) */}
              <g className="pul-leg pul-leg-l">
                <line x1="46" y1="106" x2="46" y2="147" stroke="#2a2b30" strokeWidth="5" strokeLinecap="round" />
                <ellipse cx="42" cy="149" rx="9" ry="4.5" fill="#2a2b30" />
              </g>
              <g className="pul-leg pul-leg-r">
                <line x1="70" y1="106" x2="70" y2="147" stroke="#2a2b30" strokeWidth="5" strokeLinecap="round" />
                <ellipse cx="74" cy="149" rx="9" ry="4.5" fill="#2a2b30" />
              </g>

              {/* cuerpo roscado de atrás */}
              <path d="M54 40 L76 46 L76 110 L54 113 Z" fill="#141518" />
              <ellipse cx="76" cy="78" rx="27" ry="32" fill="#141518" />
              <g clipPath="url(#pul-rosca)" fill="none" stroke="#33343a" strokeWidth="2.2">
                {[72, 78, 84, 90, 96].map((x) => (
                  <path key={x} d={`M${x} 44 Q${x + 10} 78 ${x} 112`} />
                ))}
              </g>

              {/* bisel, anillo de luz y tapa */}
              <ellipse cx="56" cy="76" rx="34" ry="37" fill="url(#pul-bisel)" stroke="#0a0a0c" strokeWidth="1.2" />
              <g className="pul-ring" fill="none">
                <ellipse cx="56" cy="76" rx="26" ry="28.5" stroke="#1f7bff" strokeWidth="5" opacity=".75" filter="url(#pul-glow)" />
                <ellipse cx="56" cy="76" rx="26" ry="28.5" stroke="#3fa9ff" strokeWidth="3.4" />
                <ellipse cx="56" cy="76" rx="26" ry="28.5" stroke="#c9ecff" strokeWidth="1" opacity=".8" />
              </g>
              <ellipse cx="56" cy="76" rx="23.6" ry="26" fill="url(#pul-tapa)" />
              <path d="M40 64 Q48 54 60 53" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".12" />

              {/* "?" de la tapa: solo cerrado; abierto da paso a la cara */}
              <text
                className="pul-help"
                x="56"
                y="87"
                textAnchor="middle"
                fontSize="32"
                fontWeight="800"
                fill="#9fd0ff"
                style={{ fontFamily: 'var(--font-league-spartan), system-ui, sans-serif' }}
              >
                ?
              </text>

              {/* brazos (delante) */}
              <g className="pul-arm pul-arm-l">
                <path d="M25 84 Q16 92 15 104" fill="none" stroke="#2a2b30" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="15" cy="106" r="5" fill="#fafafa" stroke="#2a2b30" strokeWidth="2.2" />
              </g>
              <g className="pul-arm pul-arm-r">
                <path d="M98 84 Q106 92 107 104" fill="none" stroke="#2a2b30" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="107" cy="106" r="5" fill="#fafafa" stroke="#2a2b30" strokeWidth="2.2" />
              </g>

              {/* cara en la tapa */}
              <g className="pul-face">
                <g className="pul-eyes">
                  <ellipse cx="48.5" cy="70" rx="5" ry="6" fill="#fff" />
                  <ellipse cx="63.5" cy="70" rx="5" ry="6" fill="#fff" />
                  <g className="pul-pupils">
                    <circle cx="49" cy="71" r="2.9" fill="#0b1a2c" />
                    <circle cx="64" cy="71" r="2.9" fill="#0b1a2c" />
                    <circle cx="50" cy="69.6" r="1" fill="#fff" />
                    <circle cx="65" cy="69.6" r="1" fill="#fff" />
                  </g>
                </g>
                <path d="M47 83 Q56 91 65 83" fill="none" stroke="#9fd0ff" strokeWidth="2.6" strokeLinecap="round" />
              </g>
            </svg>
          </span>
        </span>
      </button>
    </div>
  )
}
