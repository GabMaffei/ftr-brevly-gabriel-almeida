import { NotFoundCard } from '../components/not-found/not-found-card'

export function NotFound() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <NotFoundCard />
      </div>
    </div>
  )
}
