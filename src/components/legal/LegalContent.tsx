import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Pinta el cuerpo de una página legal.
 *
 * Los textos legales se editan desde Strapi como Markdown, así que hay que
 * convertirlos a React. En vez de traer un motor de Markdown completo -y con
 * él la tentación de inyectar HTML crudo en una página que, precisamente,
 * tiene que ser de fiar-, se admite solo el subconjunto que estos documentos
 * necesitan:
 *
 *   ## apartado          ### subapartado
 *   - elemento de lista
 *   | tabla | con | cabecera |
 *   **negrita**          [enlace](/ruta o https://…)
 *
 * Todo lo demás se trata como texto plano, así que un editor no puede meter
 * un `<script>` en el aviso legal ni por descuido ni a propósito.
 */

/* ==========================================================================
   Índice
   ========================================================================== */

export interface LegalHeading {
  id: string
  text: string
}

/** Acentos fuera y espacios a guiones: el ancla de cada apartado. */
export function slugifyHeading(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Apartados de primer nivel, para el índice lateral de la página. */
export function legalHeadings(body: string): LegalHeading[] {
  return body
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = stripMarks(line.slice(3).trim())
      return { id: slugifyHeading(text), text }
    })
}

/** Texto sin las marcas de Markdown, para anclas y atributos. */
function stripMarks(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[(.+?)\]\((.+?)\)/g, '$1')
}

/* ==========================================================================
   Elementos en línea: **negrita** y [enlace](url)
   ========================================================================== */

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null

  INLINE.lastIndex = 0
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))

    const [, bold, linkText, href] = match
    const key = `${keyPrefix}-${match.index}`

    if (bold !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-fg">
          {bold}
        </strong>
      )
    } else if (linkText !== undefined && href !== undefined) {
      nodes.push(renderLink(key, linkText, href))
    }

    cursor = match.index + match[0].length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

const LINK_CLASS =
  'font-medium text-brand-500 underline decoration-brand-500/35 underline-offset-[3px] transition-colors hover:text-brand-400 hover:decoration-brand-400'

function renderLink(key: string, text: string, href: string): ReactNode {
  // Interno: navegación de cliente y sin abrir pestaña nueva.
  if (href.startsWith('/')) {
    return (
      <Link key={key} href={href} className={LINK_CLASS}>
        {text}
      </Link>
    )
  }

  // Cualquier otro esquema que no sea web o correo se queda en texto plano:
  // un `javascript:` escrito en el CMS no debe llegar a ser un enlace.
  const safe = /^(https?:|mailto:)/i.test(href)
  if (!safe) return text

  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {text}
    </a>
  )
}

/* ==========================================================================
   Bloques
   ========================================================================== */

/** Una fila de tabla en Markdown: `| a | b |` -> ['a', 'b']. */
function tableCells(line: string): string[] {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

const isTableRow = (line: string) => line.trimStart().startsWith('|')
/** La fila `| --- | --- |` que separa la cabecera del cuerpo: no se pinta. */
const isTableDivider = (line: string) => /^\s*\|[\s:|-]+\|\s*$/.test(line)

export function LegalContent({ body }: { body: string }) {
  const lines = body.split('\n')
  const blocks: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    /* Encabezados --------------------------------------------------------- */
    if (line.startsWith('### ')) {
      const text = line.slice(4).trim()
      blocks.push(
        <h3
          key={`h3-${i}`}
          id={slugifyHeading(stripMarks(text))}
          className="mt-10 scroll-mt-28 font-display text-lg font-bold text-fg"
        >
          {inline(text, `h3-${i}`)}
        </h3>
      )
      i++
      continue
    }

    if (line.startsWith('## ')) {
      const text = line.slice(3).trim()
      blocks.push(
        <h2
          key={`h2-${i}`}
          id={slugifyHeading(stripMarks(text))}
          className="mt-14 scroll-mt-28 border-t border-line pt-10 font-display text-xl font-bold text-fg first:mt-0 first:border-0 first:pt-0 sm:text-2xl"
        >
          {inline(text, `h2-${i}`)}
        </h2>
      )
      i++
      continue
    }

    /* Listas -------------------------------------------------------------- */
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2).trim())
        i++
      }
      blocks.push(
        <ul key={`ul-${i}`} className="mt-4 space-y-2.5 pl-1">
          {items.map((item, index) => (
            <li key={index} className="relative pl-5 leading-relaxed text-fg-muted">
              <span
                className="absolute left-0 top-[0.62em] h-1.5 w-1.5 rounded-full bg-brand-500/70"
                aria-hidden="true"
              />
              {inline(item, `li-${i}-${index}`)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    /* Tablas -------------------------------------------------------------- */
    if (isTableRow(line)) {
      const rows: string[] = []
      while (i < lines.length && isTableRow(lines[i])) {
        if (!isTableDivider(lines[i])) rows.push(lines[i])
        i++
      }

      const [header, ...bodyRows] = rows
      blocks.push(
        <div key={`table-${i}`} className="mt-5 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[32rem] border-collapse text-left text-[0.88rem]">
            <thead className="bg-bg-subtle">
              <tr>
                {tableCells(header).map((cell, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="border-b border-line px-4 py-3 font-display text-[0.72rem] font-bold uppercase tracking-[0.12em] text-fg-muted"
                  >
                    {inline(cell, `th-${i}-${index}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-line/60 last:border-0">
                  {tableCells(row).map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 align-top leading-relaxed text-fg-muted">
                      {inline(cell, `td-${i}-${rowIndex}-${cellIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    /* Párrafo: líneas seguidas hasta el siguiente bloque ------------------- */
    const paragraph: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('- ') &&
      !isTableRow(lines[i])
    ) {
      paragraph.push(lines[i].trim())
      i++
    }

    blocks.push(
      <p key={`p-${i}`} className="mt-4 leading-[1.8] text-fg-muted">
        {inline(paragraph.join(' '), `p-${i}`)}
      </p>
    )
  }

  return <div className="text-[0.95rem]">{blocks}</div>
}
