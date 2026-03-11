import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Lead } from '@/types/lead'
import { BreadcrumbItem } from '@/types'
import { dashboard } from '@/routes'
import LeadForm from './partials/LeadForm'
import leads from '@/routes/leads'

interface Props {
    lead: Lead
}

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
        title: 'Edit Lead',
        href: '',
    }
]

interface PageProps {
    users: {
        id: number
        name: string
    }[]
}

export default function LeadsEdit({ lead }: Props) {
    const { users = [] } = usePage<PageProps>().props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Lead" />

            <div className="p-6 space-y-6">

                <h1 className="text-2xl font-bold">
                    Editar lead
                </h1>

                <LeadForm
                    method="put"
                    submitUrl={leads.update({ lead: lead.id }).url}
                    users={users}
                    initialValues={{
                        name: lead.name ?? '',
                        email: lead.email ?? '',
                        phone: lead.phone ?? '',
                        channel: lead.channel,
                        status: lead.status,
                        assigned_to: lead.assigned_to ?? null,

                        meta: {
                            lead_value: lead.meta?.lead_value ?? 0,
                            company: lead.meta?.company ?? '',
                            billing_name: lead.meta?.billing_name ?? '',
                            billing_address: lead.meta?.billing_address ?? '',
                            notes: lead.meta?.notes ?? '',
                        }
                    }}
                />

            </div>
        </AppLayout>
    )
}