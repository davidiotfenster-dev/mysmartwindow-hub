import { PageHeaderSkeleton, SkeletonBlock } from '@/components/ui/Skeletons'

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <SkeletonBlock className="aspect-video w-full rounded-3xl" />
          <div className="mt-6 flex gap-2.5">
            <SkeletonBlock className="h-11 w-40 rounded-full" />
            <SkeletonBlock className="h-11 w-32 rounded-full" />
          </div>
          <div className="mt-12 space-y-3 border-t border-line pt-10">
            <SkeletonBlock className="h-6 w-48" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </>
  )
}
