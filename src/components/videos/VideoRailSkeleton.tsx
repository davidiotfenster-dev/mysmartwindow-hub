export function VideoRailSkeleton() {
  return (
    <section className="border-y border-line bg-bg-subtle py-20 sm:py-28">
      <div className="container-page">
        <div className="h-4 w-32 rounded-full bg-fg/8 shimmer" />
        <div className="mt-4 h-10 w-80 max-w-full rounded-xl bg-fg/8 shimmer" />
        <div className="mt-10 flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[17rem] shrink-0 overflow-hidden rounded-3xl border border-line sm:w-[20rem]"
            >
              <div className="aspect-video bg-fg/8 shimmer" />
              <div className="space-y-2.5 p-5">
                <div className="h-4 w-full rounded bg-fg/8 shimmer" />
                <div className="h-4 w-2/3 rounded bg-fg/8 shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
