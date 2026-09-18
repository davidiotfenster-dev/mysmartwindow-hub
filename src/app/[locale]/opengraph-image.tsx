import { ImageResponse } from 'next/og'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export const alt = 'MySmartWindow — Centro de recursos de IoT Fenster'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Imagen social del sitio.
 *
 * Se genera en el servidor con los colores y el isotipo de la marca: no
 * dependemos de ningún fichero de imagen y siempre está en sintonía con el
 * diseño. Sin fuentes externas, para que nunca falle el renderizado.
 */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale as Locale)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #05080a 0%, #0a0e11 45%, #01657a 100%)',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Isotipo: la V descendente de IOT FENSTER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
            <g stroke="#0097b2" strokeWidth={9}>
              <path d="M8 27h22" />
              <path d="M70 27h22" />
              <path d="M50 21v40" />
              <path d="M18 27 50 87 82 27" />
            </g>
          </svg>
          <div style={{ display: 'flex', fontSize: 30, letterSpacing: 6, fontWeight: 700 }}>
            <span style={{ color: '#0097b2' }}>IOT</span>
            <span style={{ color: '#ffffff' }}>FENSTER</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, color: '#ffffff', lineHeight: 1.05 }}>
            MySmartWindow
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 32,
              color: '#9aabb6',
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {dict.explorer.title} · {dict.pillars.manual.title} · {dict.pillars.video.title} ·{' '}
            {dict.pillars.card.title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', width: 56, height: 4, background: '#0097b2' }} />
          <div style={{ display: 'flex', fontSize: 24, color: '#6c7f8b' }}>iotfenster.com</div>
        </div>
      </div>
    ),
    size
  )
}
