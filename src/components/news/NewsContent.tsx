import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Pinta el cuerpo de una noticia.
 *
 * El cuerpo se escribe en Strapi como Markdown (el editor de texto enriquecido
 * del panel, con botón para insertar imágenes de la biblioteca). Igual que en
 * las páginas legales, no se trae un motor de Markdown completo: se admite el
 * subconjunto que un artículo necesita y todo lo demás sale como texto plano,
 * de modo que nadie puede colar HTML o un `<script>` desde el CMS.
 *
 *   ## apartado   ### subapartado
 *   - lista       1. lista numerada      > cita      ---
 *   ![texto alternativo](imagen)
 *   **negrita**   *cursiva*   `código`   [enlace](/ruta o https://…)
 */

/* ==========================================================================
   Imágenes
   ========================================================================== */

/**
 * Las imágenes que inserta el editor apuntan a `/uploads/…`, que sólo existe
 * en el CMS. Se sirven por el proxy del propio sitio, igual que las portadas.
 */
function imageSrc(src: string): string | undefined {
  if (src.startsWith('/uploads/')) return `/api/media${src}`
  if (/^https?:\/\//i.test(src)) return src
  return undefined
}

function renderImage(key: string, alt: string, src: string): ReactNode {
  const url = imageSrc(src)
  if (!url) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element -- las medidas no se conocen de antemano y el proxy ya cachea
    <img
      key={key}
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="mx-auto h-auto max-w-full rounded-2xl border border-line"
    />
  )
}

/* ==========================================================================
   Elementos en línea
   ========================================================================== */

const INLINE_SOURCE =
  /!\[([^\]]*)\]\(([^)\s]+)[^)]*\)|\*\*(.+?)\*\*|\*([^*\s][^*]*?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/.source

const LINK_CLASS =
  'font-medium text-brand-500 underline decoration-brand-500/35 underline-offset-[3px] transition-colors hover:text-brand-400 hover:decoration-brand-400'

function renderLink(key: string, text: ReactNode, href: string): ReactNode {
  if (href.startsWith('/')) {
    return (
      <Link key={key} href={href} className={LINK_CLASS}>
        {text}
      </Link>
    )
  }

  // Un esquema que no sea web o correo (`javascript:`, o un marcador sin
  // rellenar como ENLACE-A-…) no llega a ser enlace: se queda el texto.
  if (!/^(https?:|mailto:)/i.test(href)) return text

  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {text}
    </a>
  )
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null

  // Uno nuevo por llamada: `inline` se llama a sí misma (negrita dentro de un
  // enlace) y un regex global compartido perdería la posición del bucle de fuera.
  const pattern = new RegExp(INLINE_SOURCE, 'g')
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))

    const [, imgAlt, imgSrc, bold, italic, code, linkText, href] = match
    const key = `${keyPrefix}-${match.index}`

    if (imgSrc !== undefined) {
      nodes.push(renderImage(key, imgAlt ?? '', imgSrc))
    } else if (bold !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-fg">
          {inline(bold, key)}
        </strong>
      )
    } else if (italic !== undefined) {
      nodes.push(<em key={key}>{inline(italic, key)}</em>)
    } else if (code !== undefined) {
      nodes.push(
        <code key={key} className="rounded bg-bg-subtle px-1.5 py-0.5 text-[0.88em] text-fg">
          {code}
        </code>
      )
    } else if (linkText !== undefined && href !== undefined) {
      nodes.push(renderLink(key, inline(linkText, key), href))
    }

    cursor = match.index + match[0].length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

/* ==========================================================================
   Bloques
   ========================================================================== */

const BULLET = /^\s*[-*]\s+/
const ORDERED = /^\s*\d+[.)]\s+/
const IMAGE_ONLY = /^!\[([^\]]*)\]\(([^)\s]+)[^)]*\)$/

const isBlockStart = (line: string) =>
  /^#{1,6}\s/.test(line) ||
  BULLET.test(line) ||
  ORDERED.test(line) ||
  line.startsWith('>') ||
  /^(-{3,}|\*{3,})$/.test(line.trim()) ||
  IMAGE_ONLY.test(line.trim())

export function NewsContent({ body }: { body: string }) {
  // Strapi guarda los saltos de línea de Windows como \r\n.
  const lines = body.replace(/\r\n?/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      i++
      continue
    }

    /* Encabezados --------------------------------------------------------- */
    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed)
    if (heading) {
      const level = heading[1].length
      const text = heading[2].trim()
      // El título de la noticia ya es el <h1> de la página: un `#` en el
      // cuerpo se trata como apartado principal, igual que `##`.
      blocks.push(
        level <= 2 ? (
          <h2
            key={`h-${i}`}
            className="mt-12 font-display text-2xl font-bold leading-tight text-fg first:mt-0"
          >
            {inline(text, `h-${i}`)}
          </h2>
        ) : (
          <h3 key={`h-${i}`} className="mt-9 font-display text-lg font-bold text-fg first:mt-0">
            {inline(text, `h-${i}`)}
          </h3>
        )
      )
      i++
      continue
    }

    /* Separador ------------------------------------------------------------ */
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      blocks.push(<hr key={`hr-${i}`} className="my-10 border-line" />)
      i++
      continue
    }

    /* Imagen suelta: figura a ancho completo ------------------------------- */
    const image = IMAGE_ONLY.exec(trimmed)
    if (image) {
      const node = renderImage(`img-${i}`, image[1], image[2])
      if (node) {
        blocks.push(
          <figure key={`fig-${i}`} className="my-8">
            {node}
            {image[1] && (
              <figcaption className="mt-3 text-center text-[0.82rem] text-fg-subtle">
                {image[1]}
              </figcaption>
            )}
          </figure>
        )
      }
      i++
      continue
    }

    /* Cita ------------------------------------------------------------------ */
    if (trimmed.startsWith('>')) {
      const quote: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      blocks.push(
        <blockquote
          key={`q-${i}`}
          className="my-6 border-l-2 border-brand-500/60 pl-5 italic leading-[1.8] text-fg-muted"
        >
          {inline(quote.join(' '), `q-${i}`)}
        </blockquote>
      )
      continue
    }

    /* Listas ---------------------------------------------------------------- */
    const ordered = ORDERED.test(line)
    if (ordered || BULLET.test(line)) {
      const marker = ordered ? ORDERED : BULLET
      const items: string[] = []
      while (i < lines.length && marker.test(lines[i])) {
        let item = lines[i].replace(marker, '').trim()
        i++
        // Una línea de continuación sangrada sigue siendo del mismo elemento.
        while (
          i < lines.length &&
          lines[i].trim() &&
          /^\s{2,}\S/.test(lines[i]) &&
          !BULLET.test(lines[i]) &&
          !ORDERED.test(lines[i])
        ) {
          item += ` ${lines[i].trim()}`
          i++
        }
        items.push(item)
      }

      const Tag = ordered ? 'ol' : 'ul'
      blocks.push(
        <Tag
          key={`l-${i}`}
          className={`space-y-2.5 pl-6 text-[1rem] leading-[1.8] text-fg-muted marker:text-brand-500 ${
            ordered ? 'list-decimal' : 'list-disc'
          }`}
        >
          {items.map((item, index) => (
            <li key={index} className="pl-1">
              {inline(item, `li-${i}-${index}`)}
            </li>
          ))}
        </Tag>
      )
      continue
    }

    /* Párrafo: líneas seguidas hasta el siguiente bloque -------------------- */
    const paragraph: string[] = []
    while (i < lines.length && lines[i].trim() && (paragraph.length === 0 || !isBlockStart(lines[i]))) {
      paragraph.push(lines[i].trim())
      i++
    }

    blocks.push(
      <p key={`p-${i}`} className="text-[1rem] leading-[1.85] text-fg-muted">
        {inline(paragraph.join(' '), `p-${i}`)}
      </p>
    )
  }

  return <div className="space-y-6">{blocks}</div>
}
