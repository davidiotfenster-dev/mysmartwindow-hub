import { cn } from '@/lib/utils'

/**
 * Esqueletos de carga.
 *
 * Las páginas que consultan YouTube en servidor tardan un momento en responder.
 * Sin un `loading.tsx` el navegador se queda en la página anterior sin dar
 * señales y luego cambia de golpe; con esto la navegación responde al instante.
 */
export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn('rounded-xl bg-fg/8 shimmer', className)} aria-hidden="true" />
}

export function PageHeaderSkeleton() {
  return (
    <header className="relative overflow-hidden border-b border-line pb-12 pt-28 sm:pb-16 sm:pt-36">
      <div className="grid-tech pointer-events-none absolute inset-0 mask-fade-b opacity-60" aria-hidden="true" />
      <div className="container-page relative">
        <SkeletonBlock className="h-3.5 w-36 rounded-full" />
        <SkeletonBlock className="mt-5 h-12 w-[26rem] max-w-full sm:h-14" />
        <SkeletonBlock className="mt-5 h-4 w-[34rem] max-w-full" />
      </div>
    </header>
  )
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-3xl border border-line">
          <SkeletonBlock className="aspect-video rounded-none" />
          <div className="space-y-3 p-5">
            <SkeletonBlock className="h-3 w-20 rounded-full" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
