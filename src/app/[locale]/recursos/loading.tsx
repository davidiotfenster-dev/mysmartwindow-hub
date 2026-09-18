import { CardGridSkeleton, PageHeaderSkeleton, SkeletonBlock } from '@/components/ui/Skeletons'

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="container-page py-10 sm:py-14">
        <SkeletonBlock className="mb-8 h-14 w-full rounded-2xl sm:rounded-full" />
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
          <div className="hidden space-y-6 lg:block">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <SkeletonBlock className="h-3 w-24 rounded-full" />
                {Array.from({ length: 5 }).map((__, j) => (
                  <SkeletonBlock key={j} className="h-9 w-full rounded-xl" />
                ))}
              </div>
            ))}
          </div>
          <CardGridSkeleton />
        </div>
      </div>
    </>
  )
}
