export default function CartLoading() {
  return (
    <div className="wrapper">
      <div className="h-8 w-32 bg-muted animate-pulse rounded mb-8" />
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-lg">
              <div className="w-24 h-24 bg-muted animate-pulse rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4 space-y-4">
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
