/**
 * Sube las imagenes al CMS y las engancha a su ficha.
 *
 * El script del catalogo (`seed-cms.mjs`) importa textos, no ficheros: en un
 * CMS recien instalado los dispositivos y los distribuidores se quedan sin
 * foto. Esto las sube.
 *
 * Uso:
 *   STRAPI_API_TOKEN=xxxx node scripts/subir-imagenes.mjs <carpeta> <tipo>
 *
 * Ejemplos:
 *   STRAPI_API_TOKEN=xxxx node scripts/subir-imagenes.mjs ./imagenes/dispositivos dispositivo
 *   STRAPI_API_TOKEN=xxxx node scripts/subir-imagenes.mjs ./imagenes/distribuidores distribuidor
 *   STRAPI_API_TOKEN=xxxx node scripts/subir-imagenes.mjs ./imagenes/equipo equipo
 *
 * Cada imagen tiene que llamarse igual que la ficha a la que pertenece
 * (`connect-2.png`, `c-wall.png`). Las que no correspondan a ninguna se
 * avisan y se saltan.
 *
 * Ni los dispositivos ni los distribuidores tienen la imagen por idioma: la
 * foto de un aparato es la misma en los tres, asi que se sube una vez.
 *
 * Con `--simular` no sube nada: solo dice que encajaria con que, y no
 * necesita token.
 */
import { readFile, readdir } from 'node:fs/promises'
import { basename, extname, join, resolve } from 'node:path'

const STRAPI_URL = (process.env.STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
const TOKEN = process.env.STRAPI_API_TOKEN

const args = process.argv.slice(2)
const simular = args.includes('--simular')
const [carpeta, tipo] = args.filter((a) => !a.startsWith('--'))

/** Que coleccion y que campo toca segun el tipo. */
const TIPOS = {
  dispositivo: { plural: 'devices', campo: 'photo' },
  distribuidor: { plural: 'partners', campo: 'logo' },
  equipo: { plural: 'team-members', campo: 'photo' },
}

const MEDIOS = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

if ((!TOKEN && !simular) || !carpeta || !TIPOS[tipo]) {
  console.error(
    'Uso: STRAPI_API_TOKEN=xxxx node scripts/subir-imagenes.mjs <carpeta> <tipo>\n' +
      `  <tipo>: ${Object.keys(TIPOS).join(', ')}\n` +
      '  --simular       no sube nada, solo comprueba que todo encaja\n\n' +
      'El token se crea en el panel: Settings -> API Tokens -> Full access.'
  )
  process.exit(1)
}

const { plural, campo } = TIPOS[tipo]

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

async function main() {
  const dir = resolve(carpeta)
  const ficheros = (await readdir(dir)).filter((f) => MEDIOS[extname(f).toLowerCase()]).sort()
  if (!ficheros.length) {
    console.error(`No hay ninguna imagen en ${dir}`)
    process.exit(1)
  }

  const json = await api(`/api/${plural}?locale=es&populate=${campo}&pagination[pageSize]=500`)
  const fichas = new Map(json.data.map((d) => [d.slug, d]))

  console.log(`${ficheros.length} imagenes en ${dir}`)
  console.log(`${fichas.size} fichas de ${tipo} en el CMS\n`)

  let hechos = 0
  const sinFicha = []

  for (const fichero of ficheros) {
    const slug = basename(fichero, extname(fichero))
    const ficha = fichas.get(slug)
    if (!ficha) {
      sinFicha.push(fichero)
      continue
    }

    const contenido = await readFile(join(dir, fichero))
    const kb = Math.round(contenido.length / 1024)

    if (simular) {
      hechos++
      console.log(
        `  ${String(hechos).padStart(2)}/${ficheros.length}  ${slug}  (${kb} KB)` +
          `${ficha[campo] ? '  [sustituye a la actual]' : ''}`
      )
      continue
    }

    const cuerpo = new FormData()
    const medio = MEDIOS[extname(fichero).toLowerCase()]
    cuerpo.append('files', new Blob([contenido], { type: medio }), fichero)
    const [subida] = await api('/api/upload', { method: 'POST', body: cuerpo })

    await api(`/api/${plural}/${ficha.documentId}`, {
      method: 'PUT',
      body: JSON.stringify({ data: { [campo]: subida.id } }),
    })
    hechos++
    console.log(`  ${String(hechos).padStart(2)}/${ficheros.length}  ${slug}  (${kb} KB)`)
  }

  console.log(
    simular
      ? `\nSimulación: encajan ${hechos} imágenes. No se ha subido nada.`
      : `\nSubidas ${hechos} imágenes de ${tipo}.`
  )
  if (sinFicha.length) {
    console.log(`\nSin ficha a la que engancharlas (${sinFicha.length}) — revisa el nombre:`)
    for (const f of sinFicha) console.log(`  ${f}`)
  }
}

main().catch((e) => {
  console.error(`\n${e.message}`)
  process.exit(1)
})
