'use client'

import type { ReactNode } from 'react'
import { TiltCard } from '@/components/ui/motion'
import { cn } from '@/lib/utils'

/**
 * Inclinación 3D sólo en escritorio: en pantallas táctiles no aporta nada y
 * añade trabajo de composición innecesario.
 */
export function TiltWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <>
      <TiltCard className={cn('hidden h-full lg:block', className)} intensity={6}>
        {children}
      </TiltCard>
      <div className={cn('h-full lg:hidden', className)}>{children}</div>
    </>
  )
}
