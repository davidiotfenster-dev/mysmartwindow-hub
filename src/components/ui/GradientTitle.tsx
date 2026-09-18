/**
 * Título con la segunda mitad en degradado de marca.
 * Si el título es de una sola palabra, se degrada entera en vez de quedarse sin
 * acento visual (pasa con "Videotutoriales" o "Contatti").
 */
export function GradientTitle({ text }: { text: string }) {
  const words = text.trim().split(/\s+/)

  if (words.length === 1) {
    return <span className="text-gradient">{text}</span>
  }

  const [first, ...rest] = words
  return (
    <>
      {first} <span className="text-gradient">{rest.join(' ')}</span>
    </>
  )
}
