/**
 * Genera las capturas del README.
 *
 * Usa el Chrome ya instalado en el sistema a traves de playwright-core, asi no
 * hay que descargar ningun navegador. Requiere el sitio corriendo en :3000.
 *
 *   node scripts/screenshots.mjs
 */
import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:3000'
const OUT = 'docs/screenshots'

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
]

const shots = [
  { name: 'home', path: '/es', width: 1440, height: 900, full: false },
  { name: 'recursos', path: '/es/recursos', width: 1440, height: 1100, full: false },
  { name: 'recurso-ficha', path: '/es/recursos/ins-connect-2-video', width: 1440, height: 1000, full: false },
  { name: 'dispositivo', path: '/es/dispositivos/connect-2', width: 1440, height: 1000, full: false },
  { name: 'videos', path: '/es/videos', width: 1440, height: 1000, full: false },
  { name: 'movil-home', path: '/es', width: 390, height: 844, full: false },
  { name: 'movil-recursos', path: '/es/recursos', width: 390, height: 844, full: false },
]

const executablePath = CHROME.find((p) => existsSync(p))
if (!executablePath) {
  console.error('No encuentro Chrome. Edita la lista CHROME en este script.')
  process.exit(1)
}

const browser = await chromium.launch({ executablePath, headless: true })
await mkdir(OUT, { recursive: true })

for (const shot of shots) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  })

  await page.goto(`${BASE}${shot.path}`, { waitUntil: 'networkidle', timeout: 60_000 })

  // El banner de cookies tapa el contenido en las capturas
  try {
    await page.evaluate(() => localStorage.setItem('msw-cookie-choice', 'rejected'))
    await page.reload({ waitUntil: 'networkidle' })
  } catch {}

  // Dar tiempo a las animaciones de entrada y a las miniaturas de YouTube
  await page.waitForTimeout(2500)

  await page.screenshot({ path: `${OUT}/${shot.name}.png`, fullPage: shot.full })
  console.log(`  ${shot.name}.png  (${shot.width}x${shot.height})`)
  await page.close()
}

await browser.close()
console.log(`\nListo: ${shots.length} capturas en ${OUT}/`)
