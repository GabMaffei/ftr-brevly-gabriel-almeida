export function LoadingBar() {
  return (
    <div className="absolute top-0 left-0 w-full h-1 overflow-hidden bg-gray-100 rounded-t-lg">
      <div className="h-1 w-full bg-[var(--color-blue-base)] animate-indeterminate-progress" />
    </div>
  )
}
