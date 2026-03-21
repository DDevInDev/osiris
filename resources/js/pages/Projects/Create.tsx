import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { dashboard } from '@/routes'
import projects from '@/routes/projects'
import ProjectForm from './Partials/ProjectForm'

interface Props {
  clients: { id: number; company_name: string; currency?: string | null }[]
  users: { id: number; name: string }[]
  statuses: { value: string; label: string }[]
  types: { value: string; label: string }[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: dashboard().url,
  },
  {
    title: 'Create',
    href: ''
  }
]

export default function Create({
  clients,
  users,
  statuses,
  types,
}: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear proyecto" />

      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">
          Create project
        </h1>

        <ProjectForm
          clients={clients}
          users={users}
          statuses={statuses}
          types={types}
          submitUrl={projects.store().url}
        />
      </div>
    </AppLayout>
  )
}