export default function Loading() {

  return <div className="flex-center h-dvh">
    <div className="flex items-center gap-1">
      <div className="h-5 w-5 animate-bounce rounded-full bg-current [animation-delay:-0.5s]" />
      <div className="h-5 w-5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
      <div className="h-5 w-5 animate-bounce rounded-full bg-current" />
    </div>
  </div>
}
