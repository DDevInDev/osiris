import AppLayout from "@/layouts/app-layout"
import ClientForm from "./Partials/ClientForm"
import clients from "@/routes/clients"

export default function Edit({ users, client }: any) {

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">
          Editar Cliente
        </h1>

        <ClientForm
          users={users}
          submitUrl={clients.update({ client: client.id }).url}
          method="put"
          initialValues={{
            user_id: client.user_id,
            company_name: client.company_name,
            website: client.website,
            client_type: client.client_type,
            currency: client.currency,
            country: client.country,
            state: client.state,
            city: client.city,
            primary_email: client.primary_email,
            primary_phone: client.primary_phone,
            notes: client.notes
          }}
        />
      </div>
    </AppLayout>
  )
}