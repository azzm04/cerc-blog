// app/blog/loading.tsx
// BAB 3 — loading.tsx khusus halaman /blog
// Skeleton card ditampilkan otomatis saat getAllPosts() sedang berjalan

export default function BlogLoading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header skeleton */}
      <div className="mb-10 space-y-3">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-64 bg-gray-100 rounded animate-pulse" />
      </div>
      {/* Card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="border border-gray-100 rounded-xl p-6 space-y-3 animate-pulse">
            <div className="h-4 w-16 bg-blue-100 rounded-full" />
            <div className="h-6 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded w-4/5" />
            <div className="h-4 bg-gray-100 rounded w-3/5" />
            <div className="flex justify-between pt-3">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100" />
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                  <div className="h-3 w-16 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
