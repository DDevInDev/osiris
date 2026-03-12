import AppLayout from "@/layouts/app-layout"
import ClientForm from "./Partials/ClientForm"
import clients from "@/routes/clients"

export default function Create({ users }: any) {

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">
          Crear Cliente
        </h1>

        <ClientForm users={users} submitUrl={clients.store.url()}/>
      </div>
    </AppLayout>
  )
}