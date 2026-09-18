/**
 * Prefijo de ruta cuando el sitio no vive en la raíz del dominio.
 *
 * `next/link` y el router ya aplican el basePath por su cuenta. Lo que NO lo
 * aplica es nada que escriba una URL a mano: un `fetch()`, el `src` de un
 * iframe o el `action` de un formulario. Para esos casos está esta función.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '')

export function withBasePath(path: string): string {
  if (!BASE_PATH) return path
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}

/** URL del proxy de PDFs, ya con el prefijo correcto. */
export function pdfProxyUrl(url: string): string {
  // Lo que ya vive en nuestro origen -los PDF del CMS se sirven por
  // /api/media- no necesita proxy: el proxy existe justo para traer aquí los
  // que están en otro dominio.
  if (url.startsWith('/')) return withBasePath(url)
  return withBasePath(`/api/pdf?url=${encodeURIComponent(url)}`)
}
