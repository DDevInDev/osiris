import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import UserForm from './Partials/UserForm'
import users from '@/routes/users'

interface Props {
  user: any
  roles: any[]
}

export default function Edit({ user, roles }: Props) {

  return (
    <AppLayout>

      <Head title="Editar usuario" />

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-semibold">
          Editar usuario
        </h1>

        <UserForm
          user={user}
          roles={roles}
          submitUrl={users.update({ user: user.id}).url}
          method="put"
        />

      </div>

    </AppLayout>
  )
}