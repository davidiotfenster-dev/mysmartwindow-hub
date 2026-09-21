'use client'

import { openCookiePreferences } from '@/lib/consent'

/**
 * Enlace del pie que vuelve a abrir el aviso de cookies.
 *
 * Existe porque la normativa exige que retirar el consentimiento sea tan
 * sencillo como prestarlo, y el aviso solo se muestra la primera vez.
 * El resto del pie es servidor; esto es lo único que necesita ser cliente.
 */
export function CookiePreferencesLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="transition-colors hover:text-brand-500"
    >
      {label}
    </button>
  )
}
