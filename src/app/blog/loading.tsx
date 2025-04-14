export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Placeholder */}
      <div className="px-4 pt-8 pb-4 bg-blue-100 grid gap-4 animate-pulse">
        <div className="flex gap-4 justify-center items-center">
          <div className="h-12 bg-gray-200 rounded-full w-1/4 mx-auto mb-4" />
        </div>
        <div className="grid place-items-center">
          <form className="relative w-full max-w-4xl">
            <div className="h-10 bg-gray-200 rounded-lg w-full mx-auto" />
            <div className="absolute top-2 right-2 w-5 h-5 bg-gray-200 rounded-full" />
          </form>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="h-6 bg-gray-200 rounded w-16 mx-2" />
          <div className="h-6 bg-gray-200 rounded w-16 mx-2" />
          <div className="h-6 bg-gray-200 rounded w-16 mx-2" />
        </div>
      </div>

      {/* Posts Grid Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col animate-pulse"
          >
            <div className="relative aspect-video bg-neutral-100 w-full">
              <div className="h-full bg-gray-200" />
            </div>
            <div className="p-4 flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-12 flex justify-center gap-2 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="px-4 py-2 rounded bg-gray-200 w-10 h-10"
          />
        ))}
      </div>
    </div>
  );
}
