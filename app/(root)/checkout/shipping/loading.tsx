export default function ShippingLoading() {
  return (
    <div className="wrapper max-w-lg mx-auto">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mb-8 mx-auto" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
          </div>
        ))}
        <div className="h-10 w-full bg-muted animate-pulse rounded mt-6" />
      </div>
    </div>
  );
}
