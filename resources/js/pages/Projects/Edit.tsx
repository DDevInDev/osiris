import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { dashboard } from '@/routes'
import projects from '@/routes/projects'
import ProjectForm from './Partials/ProjectForm'

interface Props {
  project: any
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
]

export default function Edit({
  project,
  clients,
  users,
  statuses,
  types,
}: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar proyecto" />

      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">
          Editar proyecto
        </h1>

        <ProjectForm
          clients={clients}
          users={users}
          statuses={statuses}
          types={types}
          initialValues={{
            ...project,
            client_id: String(project.client_id ?? ''),
            assigned_to: project.assigned_to ? String(project.assigned_to) : '0',
            budget: project.budget ? String(project.budget) : '',
            final_price: project.final_price ? String(project.final_price) : '',
            advance_amount: project.advance_amount ? String(project.advance_amount) : '',
            meta: {
              delivery_url: project.meta?.delivery_url ?? '',
              figma_url: project.meta?.figma_url ?? '',
              repository_url: project.meta?.repository_url ?? '',
              hours_estimated: project.meta?.hours_estimated
                ? String(project.meta.hours_estimated)
                : '',
              hours_used: project.meta?.hours_used
                ? String(project.meta.hours_used)
                : '',
            },
          }}
          submitUrl={projects.update({ project: project.id }).url}
          method="put"
        />
      </div>
    </AppLayout>
  )
}