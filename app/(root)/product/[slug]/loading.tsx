export default function ProductLoading() {
  return (
    <div className="wrapper py-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left: Images skeleton */}
        <div className="flex flex-col-reverse lg:flex-row gap-3.5 lg:gap-[14px]">
          <div className="flex flex-row lg:flex-col gap-3.5 lg:gap-[14px]">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-[111px] h-[106px] lg:w-[152px] lg:h-[167px] rounded-[20px] bg-muted animate-pulse"
              />
            ))}
          </div>
          <div className="w-full lg:w-[444px] h-[290px] lg:h-[530px] rounded-[20px] bg-muted animate-pulse" />
        </div>

        {/* Right: Product info skeleton */}
        <div className="flex-1 space-y-6">
          <div className="h-10 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-6 bg-muted animate-pulse rounded w-1/4" />
          <div className="h-8 bg-muted animate-pulse rounded w-1/2" />
          <div className="h-20 bg-muted animate-pulse rounded" />
          <div className="h-10 bg-muted animate-pulse rounded w-full" />
          <div className="h-12 bg-muted animate-pulse rounded w-full" />
        </div>
      </div>
    </div>
  );
}
