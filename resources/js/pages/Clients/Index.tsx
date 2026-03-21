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
import { BreadcrumbItem } from '@/types'

import clients from '@/routes/clients'
import { dashboard } from '@/routes'

interface Client {
  id: number
  company_name: string
  website?: string
  client_type: string
  currency: string
  city?: string
  country?: string
}

interface Props {
  clientsData: {
    data: Client[]
  }

  filters: {
    client_type?: string
    currency?: string
  }
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Clients',
    href: dashboard().url,
  },
]

export default function ClientsIndex({ clientsData, filters }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clients" />

      <div className="space-y-6 p-4">

        {/* Header */}

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Clients
          </h1>
        </div>

        {/* Filters */}

        <div className="flex flex-wrap items-center gap-4 justify-between">

          <div className="flex items-center gap-2">

            {/* Client Type */}

            <Select
              value={filters.client_type ?? ''}
              onValueChange={(value) =>
                router.get(
                  clients.index.url(),
                  { ...filters, client_type: value || undefined },
                  { preserveState: true }
                )
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="design">
                  Design
                </SelectItem>

                <SelectItem value="development">
                  Development
                </SelectItem>

                <SelectItem value="marketing">
                  Marketing
                </SelectItem>

                <SelectItem value="ai">
                  AI
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Currency */}

            <Select
              value={filters.currency ?? ''}
              onValueChange={(value) =>
                router.get(
                  clients.index.url(),
                  { ...filters, currency: value || undefined },
                  { preserveState: true }
                )
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="USD">
                  USD
                </SelectItem>

                <SelectItem value="MXN">
                  MXN
                </SelectItem>

                <SelectItem value="EUR">
                  EUR
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}

            <Button
              variant="outline"
              onClick={() => router.get(clients.index.url())}
            >
              Clear filters
            </Button>

          </div>

          {/* Create Client */}

          <Button
            onClick={() => router.get(clients.create.url())}
          >
            New client
          </Button>

        </div>

        {/* Table */}

        <div className="rounded-lg border bg-background">

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Company
                </TableHead>

                <TableHead>
                  Type
                </TableHead>

                <TableHead>
                  Website
                </TableHead>

                <TableHead>
                  Currency
                </TableHead>

                <TableHead>
                  Location
                </TableHead>

                <TableHead className="text-right">
                  Actions
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {clientsData.data.map((client) => (

                <TableRow key={client.id}>

                  <TableCell className="font-medium">
                    {client.company_name}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {client.client_type}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {client.website ?? '—'}
                  </TableCell>

                  <TableCell>
                    {client.currency}
                  </TableCell>

                  <TableCell>
                    {client.city ?? '—'} {client.country ?? ''}
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
                              clients.edit({ client: client.id }).url
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            if (confirm('Delete this client?')) {
                              router.delete(
                                clients.destroy({ client: client.id }).url
                              )
                            }
                          }}
                        >
                          Delete
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