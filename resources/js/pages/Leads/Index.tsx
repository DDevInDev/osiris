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
import { Lead } from '@/types/lead'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  LeadStatus,
  leadStatusLabel,
  leadStatusVariant,
} from '@/lib/lead-status'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { dashboard } from '@/routes';
import { leads } from '@/routes' 

interface Props {
  leads: {
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
];

export default function LeadsIndex({ leads, filters }: Props) {
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Leads" />

      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Leads</h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Select
            value={filters.status ?? ''}
            onValueChange={(value) =>
              router.get(
                leads,
                { ...filters, status: value || undefined },
                { preserveState: true }
              )
            }
          >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="discarded">Discarded</SelectItem>
          </SelectContent>
        </Select>

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
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="web">Web</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => router.get(route('leads.index'))}
        >
          Clear filters
        </Button>
      </div>


      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leads.data.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  {lead.name ?? '—'}
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    {lead.email && <div>{lead.email}</div>}
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
                  <Badge variant={leadStatusVariant[lead.status as LeadStatus]}>
                    {leadStatusLabel[lead.status as LeadStatus]}
                  </Badge>
                </TableCell>

                <TableCell>
                  {lead.assigned_user?.name ?? 'Unassigned'}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        ⋮
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Assign user
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
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
    </AppLayout >
  )
}
