import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import users from '@/routes/users'
import UserForm from './Partials/UserForm'

interface Props {
  roles: any[]
}

export default function Create({ roles }: Props) {

  return (
    <AppLayout>

      <Head title="Crear usuario" />

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-semibold">
          Crear usuario
        </h1>

        <UserForm
          roles={roles}
          submitUrl={users.store.url()}
        />

      </div>

    </AppLayout>
  )
}