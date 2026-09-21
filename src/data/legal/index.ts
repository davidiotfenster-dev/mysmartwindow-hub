import { cookies } from './cookies'
import { notice } from './notice'
import { privacy } from './privacy'
import type { LegalDocument } from './shared'

export { LEGAL_SLUGS, COMPANY, type LegalDocument } from './shared'

/**
 * Orden en el que aparecen en el pie de página y en el índice de cada
 * documento: privacidad primero porque es el que más se consulta.
 */
export const legalDocuments: LegalDocument[] = [privacy, notice, cookies]
