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
import { dashboard } from '@/routes'
import projects from '@/routes/projects'

interface ProjectItem {
  id: number
  name: string
  project_code?: string | null
  type: string
  type_label: string
  status: string
  status_label: string
  budget: string
  final_price?: string | null
  advance_amount?: string | null
  currency: string
  start_date?: string | null
  due_date?: string | null
  completed_at?: string | null
  client?: {
    id: number
    company_name: string
  } | null
  assigned_user?: {
    id: number
    name: string
  } | null
}

interface Props {
  projectsData: {
    data: ProjectItem[]
  }
  filters: {
    status?: string
    type?: string
    client_id?: string
  }
  statuses: {
    value: string
    label: string
  }[]
  types: {
    value: string
    label: string
  }[]
  clients: {
    id: number
    company_name: string
  }[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: dashboard().url,
  },
]

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  in_progress: 'default',
  on_hold: 'outline',
  completed: 'default',
  cancelled: 'destructive',
}

export default function ProjectsIndex({
  projectsData,
  filters,
  statuses,
  types,
  clients,
}: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />

      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Projects
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={filters.status ?? ''}
              onValueChange={(value) =>
                router.get(
                  projects.index.url(),
                  { ...filters, status: value || undefined },
                  { preserveState: true }
                )
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                  >
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.type ?? ''}
              onValueChange={(value) =>
                router.get(
                  projects.index.url(),
                  { ...filters, type: value || undefined },
                  { preserveState: true }
                )
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.client_id ?? ''}
              onValueChange={(value) =>
                router.get(
                  projects.index.url(),
                  { ...filters, client_id: value || undefined },
                  { preserveState: true }
                )
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem
                    key={client.id}
                    value={String(client.id)}
                  >
                    {client.company_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => router.get(projects.index.url())}
            >
              Clear filters
            </Button>
          </div>

          <Button
            onClick={() => router.get(projects.create.url())}
          >
            New project
          </Button>
        </div>

        <div className="rounded-lg border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Project
                </TableHead>
                <TableHead>
                  Client
                </TableHead>
                <TableHead>
                  Type
                </TableHead>
                <TableHead>
                  Status
                </TableHead>
                <TableHead>
                  Budget
                </TableHead>
                <TableHead>
                  Dates
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
              {projectsData.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div>
                      {project.name}
                    </div>

                    {project.project_code && (
                      <div className="text-xs text-muted-foreground">
                        {project.project_code}
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    {project.client?.company_name ?? '—'}
                  </TableCell>

                  <TableCell>
                    {project.type_label}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        statusVariant[project.status] ?? 'secondary'
                      }
                    >
                      {project.status_label}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      <div>
                        {project.currency} {project.budget}
                      </div>

                      {project.advance_amount && (
                        <div className="text-muted-foreground">
                          Advance: {project.currency} {project.advance_amount}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      {project.start_date && (
                        <div>
                          Start: {project.start_date}
                        </div>
                      )}

                      {project.due_date && (
                        <div className="text-muted-foreground">
                          Due: {project.due_date}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    {project.assigned_user?.name ?? 'Unassigned'}
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
                              projects.edit({ project: project.id }).url
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this project?')) {
                              router.delete(
                                projects.destroy({ project: project.id }).url
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

              {projectsData.data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground"
                  >
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  )
}