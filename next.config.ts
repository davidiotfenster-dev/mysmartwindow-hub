import type { NextConfig } from 'next'

/**
 * Prefijo de ruta, sólo si el sitio NO vive en la raíz del dominio.
 * Ejemplo: NEXT_PUBLIC_BASE_PATH=/manuales para iotfenster.com/manuales
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || ''

// Las imágenes del CMS no necesitan estar aquí: se sirven desde nuestro propio
// dominio a través de `src/app/api/media`.

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Salida autocontenida: genera .next/standalone con su propio server.js y
   * sólo las dependencias que realmente se usan. Es lo que permite llevar el
   * sitio a un servidor de empresa sin copiar node_modules entero, y funciona
   * igual en Linux, en Windows y dentro de Docker.
   */
  output: 'standalone',

  ...(basePath ? { basePath } : {}),

  images: {
    // Las fotos que suben al CMS vienen del móvil o de la cámara, a varios
    // megas. Next las reescala al tamaño que pide cada hueco y las reparte en
    // estos formatos, que pesan la mitad que un JPEG: quien sube no tiene que
    // acordarse de optimizar nada.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'i1.ytimg.com' },
      { protocol: 'https', hostname: 'i2.ytimg.com' },
      { protocol: 'https', hostname: 'i3.ytimg.com' },
      { protocol: 'https', hostname: 'i4.ytimg.com' },
      { protocol: 'https', hostname: 'i9.ytimg.com' },
      { protocol: 'https', hostname: 'yt3.ggpht.com' },
      { protocol: 'https', hostname: 'www.iotfenster.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig
