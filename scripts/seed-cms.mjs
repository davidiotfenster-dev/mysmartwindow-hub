/**
 * Importa el catalogo estatico (src/data/*.ts) a Strapi, en los tres idiomas.
 *
 * Requiere Strapi arrancado y un token de API con acceso completo (Settings
 * -> API Tokens -> Create new API Token -> Full access) en STRAPI_API_TOKEN.
 *
 *   STRAPI_API_TOKEN=xxxx node scripts/seed-cms.mjs
 *
 * Es idempotente: si un slug ya existe lo actualiza en vez de duplicarlo, asi
 * que se puede volver a ejecutar tras cambiar el catalogo.
 */
import { categories, devices } from '../src/data/taxonomy.ts'
import { resources } from '../src/data/resources.ts'
import { ecosystems } from '../src/data/ecosystems.ts'
import { faqs } from '../src/data/faq.ts'
import { news } from '../src/data/news.ts'
import { partners } from '../src/data/partners.ts'
import { team } from '../src/data/team.ts'
import { legalDocuments } from '../src/data/legal.ts'

const STRAPI_URL = (process.env.STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
const TOKEN = process.env.STRAPI_API_TOKEN

if (!TOKEN) {
  console.error(
    'Falta STRAPI_API_TOKEN.\n' +
      'Crea uno en el panel: Settings -> API Tokens -> Create new API Token -> Full access.\n' +
      'Luego: STRAPI_API_TOKEN=xxxx node scripts/seed-cms.mjs'
  )
  process.exit(1)
}

const LOCALES = ['es', 'en', 'it']

async function api(path, options = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      ...(options.headers ?? {}),
    },
  })
  const text = await res.text()
  const body = text ? JSON.parse(text) : null
  if (!res.ok) {
    throw new Error(`${options.method ?? 'GET'} ${path} -> ${res.status}: ${text}`)
  }
  return body
}

function qs(params) {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

/** Crea o actualiza una ficha en los tres idiomas y devuelve su documentId. */
/**
 * `shared` son los campos no traducidos (categoria, tipo, oculto...). Van en
 * las TRES llamadas, no solo en la espanola: Strapi no los sincroniza solo
 * porque el schema los marque como no localizados, eso solo afecta a como se
 * ve en el panel de administracion. Sin esto, la entrada inglesa e italiana
 * se quedan sin esos campos, y el dia que una de las dos pase a ser "la mas
 * reciente" el recurso entero desaparece del sitio sin ningun aviso -es
 * justo lo que le paso al catalogo completo el 24 de septiembre.
 */
async function upsert(plural, slug, byLocale, shared = {}) {
  const existing = await api(
    `/api/${plural}?${qs({ 'filters[slug][$eq]': slug, locale: 'es' })}`
  )

  let documentId = existing.data[0]?.documentId

  if (documentId) {
    await api(`/api/${plural}/${documentId}?locale=es`, {
      method: 'PUT',
      body: JSON.stringify({ data: { ...shared, ...byLocale.es } }),
    })
  } else {
    const created = await api(`/api/${plural}?locale=es`, {
      method: 'POST',
      body: JSON.stringify({ data: { slug, ...shared, ...byLocale.es } }),
    })
    documentId = created.data.documentId
  }

  for (const locale of ['en', 'it']) {
    await api(`/api/${plural}/${documentId}?locale=${locale}`, {
      method: 'PUT',
      body: JSON.stringify({ data: { ...shared, ...byLocale[locale] } }),
    })
  }

  return documentId
}

async function seedCategories() {
  const bySlug = {}
  for (const c of categories) {
    const id = await upsert(
      'categories',
      c.id,
      {
        es: { name: c.name.es, description: c.description.es },
        en: { name: c.name.en, description: c.description.en },
        it: { name: c.name.it, description: c.description.it },
      },
      { icon: c.icon }
    )
    bySlug[c.id] = id
  }
  console.log(`categorias: ${Object.keys(bySlug).length}`)
  return bySlug
}

async function seedDevices() {
  const bySlug = {}
  for (const d of devices) {
    const features = (locale) => (d.features ?? []).map((f) => ({ text: f[locale] }))
    const id = await upsert(
      'devices',
      d.id,
      {
        es: { tagline: d.tagline.es, description: d.description.es, features: features('es') },
        en: { tagline: d.tagline.en, description: d.description.en, features: features('en') },
        it: { tagline: d.tagline.it, description: d.description.it, features: features('it') },
      },
      { name: d.name, url: d.url, hidden: Boolean(d.hidden) }
    )
    bySlug[d.id] = id
  }
  console.log(`dispositivos: ${Object.keys(bySlug).length}`)
  return bySlug
}

async function seedEcosystems() {
  let count = 0
  for (const e of ecosystems) {
    await upsert(
      'ecosystems',
      e.id,
      {
        es: { description: e.description.es },
        en: { description: e.description.en },
        it: { description: e.description.it },
      },
      { name: e.name, vendor: e.vendor, match: e.match, color: e.color }
    )
    count++
  }
  console.log(`ecosistemas: ${count}`)
}

async function seedPartners() {
  let count = 0
  for (const p of partners) {
    await upsert(
      'partners',
      p.id,
      {
        es: { tagline: p.tagline.es, description: p.description.es, country: p.country.es },
        en: { tagline: p.tagline.en, description: p.description.en, country: p.country.en },
        it: { tagline: p.tagline.it, description: p.description.it, country: p.country.it },
      },
      { name: p.name, url: p.url, contactUrl: p.contactUrl, accent: p.accent, brands: p.brands }
    )
    count++
  }
  console.log(`distribuidores: ${count}`)
}

async function seedTeam() {
  let count = 0
  for (const m of team) {
    await upsert(
      'team-members',
      m.id,
      {
        es: { role: m.role.es, bio: m.bio.es },
        en: { role: m.role.en, bio: m.bio.en },
        it: { role: m.role.it, bio: m.bio.it },
      },
      { name: m.name, order: m.order, linkedin: m.linkedin }
    )
    count++
  }
  console.log(`equipo: ${count}`)
}

async function seedResources(categoryIds, deviceIds) {
  let count = 0
  for (const r of resources) {
    await upsert(
      'resources',
      r.id,
      {
        es: { title: r.title.es, summary: r.summary?.es },
        en: { title: r.title.en, summary: r.summary?.en },
        it: { title: r.title.it, summary: r.summary?.it },
      },
      {
        type: r.type,
        category: categoryIds[r.category],
        device: deviceIds[r.device],
        url: r.url,
        youtubeId: r.youtubeId,
        playlistId: r.playlistId,
        updatedOn: r.updated,
        broken: Boolean(r.broken),
        featured: Boolean(r.featured),
        tags: r.tags ?? [],
      }
    )
    count++
  }
  console.log(`recursos: ${count}`)
  return count
}

async function seedFaqs(resourceIds) {
  let count = 0
  for (const f of faqs) {
    await upsert(
      'faq-items',
      f.id,
      {
        es: { question: f.question.es, answer: f.answer.es },
        en: { question: f.question.en, answer: f.answer.en },
        it: { question: f.question.it, answer: f.answer.it },
      },
      {
        resource: f.resourceId ? resourceIds[f.resourceId] : undefined,
        resourceHref: f.href,
      }
    )
    count++
  }
  console.log(`faq: ${count}`)
}

async function seedNews() {
  let count = 0
  for (const n of news) {
    await upsert(
      'news-posts',
      n.slug,
      {
        es: { title: n.title.es, excerpt: n.excerpt.es, body: n.body.es, tag: n.tag.es },
        en: { title: n.title.en, excerpt: n.excerpt.en, body: n.body.en, tag: n.tag.en },
        it: { title: n.title.it, excerpt: n.excerpt.it, body: n.body.it, tag: n.tag.it },
      },
      {
        postDate: n.publishedAt,
        readingMinutes: n.readingMinutes,
        gradient: n.gradient,
        featured: Boolean(n.featured),
      }
    )
    count++
  }
  console.log(`noticias: ${count}`)
}

async function seedLegalPages() {
  let count = 0
  for (const doc of legalDocuments) {
    await upsert(
      'legal-pages',
      doc.id,
      {
        es: { title: doc.title.es, intro: doc.intro.es, body: doc.body.es },
        en: { title: doc.title.en, intro: doc.intro.en, body: doc.body.en },
        it: { title: doc.title.it, intro: doc.intro.it, body: doc.body.it },
      },
      { lastUpdated: doc.lastUpdated }
    )
    count++
  }
  console.log(`paginas legales: ${count}`)
}

async function seedSiteSettings() {
  const description = {
    es: 'Ingeniería electrónica e IoT para fabricantes de cerramientos: domótica para ventanas, puertas, persianas y toldos.',
    en: 'Electronic and IoT engineering for enclosure manufacturers: home automation for windows, doors, blinds and awnings.',
    it: 'Ingegneria elettronica e IoT per i produttori di chiusure: domotica per finestre, porte, tapparelle e tende da sole.',
  }
  for (const locale of LOCALES) {
    await api(`/api/site-setting?locale=${locale}`, {
      method: 'PUT',
      body: JSON.stringify({
        data:
          locale === 'es'
            ? { siteName: 'MySmartWindow', organizationDescription: description.es }
            : { organizationDescription: description[locale] },
      }),
    })
  }
  console.log('ajustes del sitio: listo')
}

async function main() {
  console.log(`Importando catalogo a ${STRAPI_URL} ...\n`)

  const categoryIds = await seedCategories()
  const deviceIds = await seedDevices()
  await seedEcosystems()
  await seedPartners()
  await seedTeam()
  await seedResources(categoryIds, deviceIds)

  // El FAQ enlaza a recursos por slug: necesita que ya existan.
  const resourceIds = {}
  for (const r of resources) {
    const found = await api(`/api/resources?${qs({ 'filters[slug][$eq]': r.id, locale: 'es' })}`)
    if (found.data[0]) resourceIds[r.id] = found.data[0].documentId
  }
  await seedFaqs(resourceIds)

  await seedNews()
  await seedLegalPages()
  await seedSiteSettings()

  console.log('\nListo. Revisa el contenido en ' + STRAPI_URL + '/admin')
}

main().catch((err) => {
  console.error('\nFallo el seed:', err.message)
  process.exit(1)
})
