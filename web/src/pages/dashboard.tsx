import { LinksList } from '../components/dashboard/links-list'
import { NewLinkForm } from '../components/dashboard/new-link-form'
import { Header } from '../components/header'

//* Componente principal da aplicação
export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
        <Header />

        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <NewLinkForm />
            </div>
            <div className="lg:col-span-2">
              <LinksList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
