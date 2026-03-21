import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import users from '@/routes/users'
import UserForm from './Partials/UserForm'
import { dashboard } from '@/routes'
import { BreadcrumbItem } from '@/types'

interface Props {
  roles: any[]
}
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Users',
    href: users.index().url,
  },
  {
    title: 'Create User',
    href: '',
  }
]

export default function Create({ roles }: Props) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>

      <Head title="Crear usuario" />

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-semibold">
          Create new user
        </h1>

        <UserForm
          roles={roles}
          submitUrl={users.store.url()}
        />

      </div>

    </AppLayout>
  )
}