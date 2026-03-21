import AppLayout from "@/layouts/app-layout"
import ClientForm from "./Partials/ClientForm"
import { BreadcrumbItem } from "@/types"
import clients from '@/routes/clients'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Clients',
    href: clients.index.url(),
  },
  {
    title: 'Create',
    href: ''
  }
]

export default function Create({ users, initialValues, commissioners }: any) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">
          Crear Cliente
        </h1>

        <ClientForm users={users} initialValues={initialValues} submitUrl={clients.store.url()} commissioners={commissioners}
        />
      </div>
    </AppLayout>
  )
}