export default function ProfileLoading() {
  return (
    <div className="wrapper max-w-2xl mx-auto">
      <div className="h-8 w-32 bg-muted animate-pulse rounded mb-8" />
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-muted animate-pulse rounded-full" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="border rounded-lg p-6 space-y-4">
          <div className="h-6 w-40 bg-muted animate-pulse rounded" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
