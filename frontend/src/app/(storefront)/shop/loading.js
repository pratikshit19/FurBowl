export default function ShopLoading() {
  return (
    <div className="section-padding py-10 bg-butter-50/20 min-h-screen">
      <div className="container-main">
        {/* Banner Skeleton */}
        <div className="w-full h-32 sm:h-44 rounded-2xl bg-plum-900/5 animate-pulse mb-8" />

        {/* Categories Bar Skeleton */}
        <div className="flex gap-2 sm:gap-3 mb-8 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-28 sm:w-36 rounded-full bg-plum-900/5 animate-pulse shrink-0" />
          ))}
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-2xl border border-plum-900/10 bg-white p-3 sm:p-4 space-y-3">
              <div className="w-full aspect-square rounded-xl bg-plum-900/5 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-plum-900/5 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-plum-900/5 animate-pulse" />
              <div className="h-8 w-full rounded-lg bg-plum-900/5 animate-pulse mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
