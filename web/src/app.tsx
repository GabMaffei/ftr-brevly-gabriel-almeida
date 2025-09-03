import { Outlet } from 'react-router-dom'

export function App() {
  return (
    <div className="min-h-screen antialiased">
      <main className="p-4 sm:p-6 lg:p-8">
        {/* As páginas definidas no router serão renderizadas aqui */}
        <Outlet />
      </main>
    </div>
  )
}
