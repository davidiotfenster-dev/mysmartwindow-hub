import { ImageResponse } from 'next/og'
import { resourceTypeMeta } from '@/data/taxonomy'
import { getCategoryMap, getDeviceMap, getResourceById } from '@/lib/content'
import type { Locale } from '@/i18n/config'

export const alt = 'Recurso de MySmartWindow'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const typeColor = { manual: '#0097b2', video: '#22d3ee', tarjeta: '#f59e0b' } as const

/** Imagen social propia de cada ficha: título, categoría y dispositivo. */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const [resource, categoryMap, deviceMap] = await Promise.all([
    getResourceById(id),
    getCategoryMap(),
    getDeviceMap(),
  ])
  const l = locale as Locale

  const title = resource?.title[l] ?? 'MySmartWindow'
  const category = resource ? categoryMap[resource.category].name[l] : ''
  const device = resource ? deviceMap[resource.device] : undefined
  const typeLabel = resource ? resourceTypeMeta[resource.type].short[l] : ''
  const accent = resource ? typeColor[resource.type] : '#0097b2'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #05080a 0%, #0a0e11 55%, #083c49 100%)',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
              <g stroke="#0097b2" strokeWidth={9}>
                <path d="M8 27h22" />
                <path d="M70 27h22" />
                <path d="M50 21v40" />
                <path d="M18 27 50 87 82 27" />
              </g>
            </svg>
            <div style={{ display: 'flex', fontSize: 24, letterSpacing: 5, fontWeight: 700 }}>
              <span style={{ color: '#0097b2' }}>IOT</span>
              <span style={{ color: '#ffffff' }}>FENSTER</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '10px 26px',
              borderRadius: 999,
              border: `2px solid ${accent}`,
              color: accent,
              fontSize: 24,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            {typeLabel}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 60 ? 52 : 66,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', marginTop: 26, gap: 14, alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 26, color: accent, fontWeight: 700 }}>
              {category}
            </div>
            {device && device.id !== 'general' && (
              <>
                <div style={{ display: 'flex', fontSize: 26, color: '#3a4a55' }}>·</div>
                <div style={{ display: 'flex', fontSize: 26, color: '#9aabb6' }}>{device.name}</div>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', width: 48, height: 4, background: accent }} />
          <div style={{ display: 'flex', fontSize: 22, color: '#6c7f8b' }}>
            MySmartWindow · iotfenster.com
          </div>
        </div>
      </div>
    ),
    size
  )
}
