/**
 * Elección del usuario sobre el aviso de cookies.
 *
 * Este sitio no instala analítica ni publicidad: lo único que se guarda en el
 * navegador es esta elección y la preferencia de tema (esa la gestiona
 * `next-themes` con la clave `theme`). Ambas están exentas del deber de
 * consentimiento, pero la normativa sí exige que retirar la elección sea tan
 * fácil como darla, así que el pie de página puede volver a abrir el aviso
 * en cualquier momento mediante `openCookiePreferences()`.
 *
 * La clave y el nombre del evento se documentan en la política de cookies
 * (`src/data/legal/cookies.ts`): si cambian aquí, hay que cambiarlos allí.
 */

export const COOKIE_CHOICE_KEY = 'msw-cookie-choice'

/** Evento que reabre el aviso desde cualquier punto de la página. */
export const COOKIE_PREFERENCES_EVENT = 'msw:cookie-preferences'

export type CookieChoice = 'accepted' | 'rejected'

/** `null` = todavía no ha elegido, o el navegador no nos deja leer. */
export function readCookieChoice(): CookieChoice | null {
  try {
    const stored = localStorage.getItem(COOKIE_CHOICE_KEY)
    return stored === 'accepted' || stored === 'rejected' ? stored : null
  } catch {
    // Modo privado o almacenamiento bloqueado: se trata como "sin elegir".
    return null
  }
}

export function storeCookieChoice(choice: CookieChoice): void {
  try {
    localStorage.setItem(COOKIE_CHOICE_KEY, choice)
  } catch {
    /* Sin persistencia, pero la interfaz responde igual. */
  }
}

export function openCookiePreferences(): void {
  window.dispatchEvent(new CustomEvent(COOKIE_PREFERENCES_EVENT))
}
