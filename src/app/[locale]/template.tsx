'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Transición de entrada entre páginas.
 *
 * `template.tsx` se vuelve a montar en cada navegación (a diferencia de
 * `layout.tsx`), así que es el sitio correcto para animar la entrada. Sólo
 * opacidad y un desplazamiento mínimo: cualquier cosa más ambiciosa provoca
 * saltos de maquetación justo cuando el contenido está llegando.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
