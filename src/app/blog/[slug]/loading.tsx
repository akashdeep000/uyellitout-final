export default function Loading() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
      {/* Title */}
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-6" />

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-10">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-12 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
      </div>

      {/* Thumbnail Placeholder */}
      <div className="w-full aspect-video bg-gray-200 rounded-lg mb-10" />

      {/* Content Skeleton */}
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full" />
        ))}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-3/4" />
        ))}
      </div>

      {/* Related Posts Placeholder */}
      <div className="mt-16">
        <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
        <div className="grid gap-6 sm:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4 border rounded space-y-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
