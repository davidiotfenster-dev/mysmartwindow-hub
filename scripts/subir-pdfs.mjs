/**
 * Sube los PDF de los manuales al CMS y engancha cada uno a su recurso.
 *
 * Los documentos vivian en el WordPress corporativo
 * (www.iotfenster.com/wp-content/uploads/...). Cuando ese sitio se retire, los
 * enlaces se rompen: este script los mete dentro del CMS, que es donde tienen
 * que estar, y a partir de ahi el sitio los sirve por su cuenta.
 *
 * Como el campo del fichero esta localizado, cada idioma puede llevar su
 * propia version: el visitante italiano se descarga el manual en italiano y el
 * espanol el suyo. Un idioma sin fichero propio se queda con el que haya.
 *
 * Uso:
 *   STRAPI_API_TOKEN=xxxx node scripts/subir-pdfs.mjs <carpeta> <idioma>
 *
 * Ejemplos:
 *   STRAPI_API_TOKEN=xxxx node scripts/subir-pdfs.mjs ./documentos-es es
 *   STRAPI_API_TOKEN=xxxx node scripts/subir-pdfs.mjs ./documentos-it it
 *
 * Cada PDF tiene que llamarse igual que el recurso al que pertenece
 * (`hard-reset-botones-del-dispositivo-manual.pdf`). Los ficheros que no
 * correspondan a ningun recurso se avisan y se saltan, no se sube nada a
 * ciegas.
 *
 * Es repetible: si un recurso ya tenia fichero en ese idioma, se sustituye de
 * verdad -el PDF anterior se borra de la biblioteca de medios, no se queda
 * huerfano-. El propio `/api/upload` de Strapi no tiene forma de "actualizar"
 * un fichero existente, solo de crear uno nuevo, asi que sin este borrado
 * explicito cada ejecucion iria dejando copias sueltas sin enganchar a nada.
 * Con `--solo-nuevos` se salta los que ya lo tienen, que es lo comodo para
 * anadir dos o tres documentos sin volver a subirlo todo.
 *
 * Con `--simular` no sube nada: solo dice que encajaria con que. Conviene
 * pasarlo antes de la subida de verdad, y no necesita token.
 */
import { createReadStream } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import { basename, extname, join, resolve } from 'node:path'

const STRAPI_URL = (process.env.STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
const TOKEN = process.env.STRAPI_API_TOKEN

const args = process.argv.slice(2)
const soloNuevos = args.includes('--solo-nuevos')
const simular = args.includes('--simular')
const [carpeta, locale] = args.filter((a) => !a.startsWith('--'))

const LOCALES = ['es', 'en', 'it']

if ((!TOKEN && !simular) || !carpeta || !LOCALES.includes(locale)) {
  console.error(
    'Uso: STRAPI_API_TOKEN=xxxx node scripts/subir-pdfs.mjs <carpeta> <idioma>\n' +
      `  <idioma>: ${LOCALES.join(', ')}\n` +
      '  --solo-nuevos   no toca los recursos que ya tienen fichero en ese idioma\n' +
      '  --simular       no sube nada, solo comprueba que todo encaja\n\n' +
      'El token se crea en el panel: Settings -> API Tokens -> Full access.'
  )
  process.exit(1)
}

async function api(path, options = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers ?? {}),
    },
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${options.method ?? 'GET'} ${path} -> ${res.status}: ${text}`)
  return text ? JSON.parse(text) : null
}

/** Todos los recursos del idioma, indexados por slug. */
async function recursosPorSlug() {
  const json = await api(`/api/resources?locale=${locale}&populate=file&pagination[pageSize]=500`)
  return new Map(json.data.map((r) => [r.slug, r]))
}

async function subir(ruta) {
  const cuerpo = new FormData()
  const bytes = await stat(ruta)
  const stream = createReadStream(ruta)
  const trozos = []
  for await (const trozo of stream) trozos.push(trozo)
  cuerpo.append('files', new Blob([Buffer.concat(trozos)], { type: 'application/pdf' }), basename(ruta))
  const subido = await api('/api/upload', { method: 'POST', body: cuerpo })
  return { id: subido[0].id, kb: Math.round(bytes.size / 1024) }
}

async function main() {
  const dir = resolve(carpeta)
  const ficheros = (await readdir(dir)).filter((f) => extname(f).toLowerCase() === '.pdf').sort()
  if (!ficheros.length) {
    console.error(`No hay ningun PDF en ${dir}`)
    process.exit(1)
  }

  const recursos = await recursosPorSlug()
  console.log(`${ficheros.length} PDF en ${dir}`)
  console.log(`${recursos.size} recursos en el CMS (${locale})\n`)

  let subidos = 0
  const saltados = []
  const sinRecurso = []

  for (const fichero of ficheros) {
    const slug = basename(fichero, extname(fichero))
    const recurso = recursos.get(slug)

    if (!recurso) {
      sinRecurso.push(fichero)
      continue
    }
    if (soloNuevos && recurso.file) {
      saltados.push(slug)
      continue
    }

    if (simular) {
      const { size } = await stat(join(dir, fichero))
      subidos++
      console.log(
        `  ${String(subidos).padStart(2)}/${ficheros.length}  ${slug}` +
          `  (${Math.round(size / 1024)} KB)${recurso.file ? '  [sustituye al actual]' : ''}`
      )
      continue
    }

    const anterior = recurso.file?.id
    const { id, kb } = await subir(join(dir, fichero))
    await api(`/api/resources/${recurso.documentId}?locale=${locale}`, {
      method: 'PUT',
      body: JSON.stringify({ data: { file: id } }),
    })

    // Sustituye de verdad: sin esto, el PDF anterior se queda huerfano en la
    // biblioteca de medios cada vez que se repite la subida.
    if (anterior && anterior !== id) {
      await api(`/api/upload/files/${anterior}`, { method: 'DELETE' })
    }

    subidos++
    console.log(`  ${String(subidos).padStart(2)}/${ficheros.length}  ${slug}  (${kb} KB)`)
  }

  console.log(
    simular
      ? `\nSimulación: encajan ${subidos} documentos en ${locale}. No se ha subido nada.`
      : `\nSubidos ${subidos} documentos en ${locale}.`
  )
  if (saltados.length) console.log(`Saltados por tener ya fichero: ${saltados.length}`)
  if (sinRecurso.length) {
    console.log(`\nSin recurso al que engancharlos (${sinRecurso.length}) — revisa el nombre:`)
    for (const f of sinRecurso) console.log(`  ${f}`)
  }
}

main().catch((e) => {
  console.error(`\n${e.message}`)
  process.exit(1)
})
