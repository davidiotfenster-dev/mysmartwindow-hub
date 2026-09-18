import { CardGridSkeleton, PageHeaderSkeleton } from '@/components/ui/Skeletons'

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="container-page py-14">
        <CardGridSkeleton count={3} />
      </div>
    </>
  )
}
