import { CardGridSkeleton, PageHeaderSkeleton } from '@/components/ui/Skeletons'

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="container-page py-14 sm:py-20">
        <CardGridSkeleton count={6} />
      </div>
    </>
  )
}
