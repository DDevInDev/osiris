import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { dashboard } from '@/routes'
import LeadForm from './partials/LeadForm'
import leads from '@/routes/leads'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Leads',
        href: leads.index().url,
    },
    {
        title: 'Create Lead',
        href: '',
    }
]

interface PageProps {
  users: {
    id: number
    name: string
  }[]
}

export default function LeadsCreate() {
    const { users = [] } = usePage<PageProps>().props
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Lead" />

            <div className="p-6 space-y-6">

                <h1 className="text-2xl font-bold">
                    Create new Lead
                </h1>

                <LeadForm
                    submitUrl={leads.store().url}
                    users={users}
                />

            </div>
        </AppLayout>
    )
}