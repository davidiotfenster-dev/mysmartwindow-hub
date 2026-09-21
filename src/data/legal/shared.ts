import type { Localized } from '@/i18n/config'

/**
 * Textos legales del sitio.
 *
 * Son el catálogo de partida: si Strapi está configurado y tiene la página
 * publicada, manda el CMS (ver `src/lib/content/legal.ts`). Si no, se sirven
 * estos, para que las páginas legales nunca desaparezcan del sitio -que es
 * justo lo que no puede pasar con un aviso legal-.
 *
 * `body` es Markdown de un subconjunto reducido: `##` para los apartados,
 * listas con `-`, tablas con `|`, **negrita** y enlaces `[texto](url)`. Lo
 * pinta `LegalContent` sin insertar HTML crudo. Dentro del texto no se usan
 * comillas invertidas porque colisionan con las plantillas de TypeScript:
 * donde haría falta código en línea, va en negrita.
 */
export interface LegalDocument {
  /** Slug compartido por los tres idiomas; es parte de la URL. */
  id: string
  title: Localized
  /** Entradilla bajo el título, fuera del cuerpo. */
  intro: Localized
  /** Cuerpo en el Markdown reducido descrito arriba. */
  body: Localized
  /** Fecha de la última revisión, en ISO. Se muestra en la cabecera. */
  lastUpdated: string
}

/**
 * Datos identificativos de la empresa, en un solo sitio: aparecen en los tres
 * documentos y en los tres idiomas, y es justo lo que no puede quedar
 * descuadrado entre unos y otros.
 */
export const COMPANY = {
  name: 'IoT Fenster, S.L.',
  /**
   * Letra + 8 caracteres. La política de privacidad del portal antiguo
   * publicaba «B30780191E», con un carácter de más respecto al aviso legal
   * del mismo sitio. Aquí se unifica al que sí tiene formato válido.
   */
  cif: 'B30780191',
  address:
    'Avda. Isaac Peral s/n, Parque Tecnológico Fuente Álamo, Ctra. del Estrecho-Lobosillo, 30320 Fuente Álamo de Murcia (Murcia), España',
  email: 'info@iotfenster.com',
  site: 'www.iotfenster.com',
} as const

/** Fecha de la última revisión de los tres documentos. */
export const LAST_UPDATED = '2026-09-21'

/* ==========================================================================
   Slugs
   ==========================================================================
   Compartidos por los tres idiomas, igual que el resto de rutas del sitio
   (ver `src/lib/navigation.ts`): un enlace a una página legal se puede pasar
   a cualquiera sin preocuparse del idioma con el que se generó.
   ========================================================================== */

export const LEGAL_SLUGS = {
  privacy: 'politica-de-privacidad',
  notice: 'aviso-legal',
  cookies: 'politica-de-cookies',
} as const
