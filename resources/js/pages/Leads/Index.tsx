import { Head, router } from '@inertiajs/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import AppLayout from '@/layouts/app-layout'

import { Lead } from '@/types/lead'
import { BreadcrumbItem } from '@/types'

import {
  LeadStatus,
  leadStatusLabel,
  leadStatusVariant,
} from '@/lib/lead-status'

import { dashboard } from '@/routes'
import leads from '@/routes/leads'
import clients from '@/routes/clients'

interface Props {
  leadsData: {
    data: Lead[]
  }

  filters: {
    status?: string
    channel?: string
  }
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Leads',
    href: dashboard().url,
  },
]

export default function LeadsIndex({ leadsData, filters }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Leads" />

      <div className="space-y-6 p-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Leads
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <Select
              value={filters.status ?? ''}
              onValueChange={(value) =>
                router.get(
                  leads.index.url(),
                  { ...filters, status: value || undefined },
                  { preserveState: true }
                )
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">
                  New
                </SelectItem>
                <SelectItem value="contacted">
                  Contacted
                </SelectItem>
                <SelectItem value="qualified">
                  Qualified
                </SelectItem>
                <SelectItem value="converted">
                  Converted
                </SelectItem>
                <SelectItem value="discarded">
                  Discarded
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Channel Filter */}
            <Select
              value={filters.channel ?? ''}
              onValueChange={(value) =>
                router.get(
                  leads.index.url(),
                  { ...filters, channel: value || undefined },
                  { preserveState: true }
                )
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">
                  WhatsApp
                </SelectItem>

                <SelectItem value="web">
                  Web
                </SelectItem>
                <SelectItem value="referral">
                  Referral
                </SelectItem>
                <SelectItem value="ads">
                  Ads
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => router.get(leads.index.url())}
            >
              Clear filters
            </Button>
          </div>

          {/* Create Lead */}
          <Button
            onClick={() => router.get(leads.create.url())}
          >
            Nuevo lead
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Name
                </TableHead>
                <TableHead>
                  Contact
                </TableHead>
                <TableHead>
                  Channel
                </TableHead>
                <TableHead>
                  Status
                </TableHead>
                <TableHead>
                  Assigned
                </TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {leadsData.data.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    {lead.name ?? '—'}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {lead.email && (
                        <div>
                          {lead.email}
                        </div>
                      )}

                      {lead.phone && (
                        <div className="text-muted-foreground">
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="capitalize">
                    {lead.channel}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        leadStatusVariant[
                        lead.status as LeadStatus
                        ]
                      }
                    >
                      {
                        leadStatusLabel[
                        lead.status as LeadStatus
                        ]
                      }
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {lead.assigned_user?.name ?? 'Unassigned'}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          ⋮
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.get(
                              clients.create.url(),
                              { lead_id: lead.id }
                            )
                          }
                        >
                          Convert to client
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.get(
                              leads.edit({ lead: lead.id }).url
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            if (confirm('Are you sure you want to discard this lead?')) {
                              router.delete(
                                leads.destroy({ lead: lead.id }).url
                              )
                            }
                          }}
                        >
                          Discard
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  )
}