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

import { Input } from '@/components/ui/input'

import AppLayout from '@/layouts/app-layout'

import { BreadcrumbItem } from '@/types'

import { dashboard } from '@/routes'
import users from '@/routes/users'

interface User {
  id: number
  name: string
  last_name: string
  email: string
  phone?: string
  position?: string
  role: string
}

interface Props {
  usersData: {
    data: User[]
  }
  filters: {
    search?: string
    role?: string
  }
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: dashboard().url,
  },
]

export default function UsersIndex({ usersData, filters }: Props) {
  const handleSearch = (value: string) => {
    router.get(
      users.index.url(),
      { ...filters, search: value || undefined },
      { preserveState: true }
    )
  }

  const handleRoleChange = (value: string) => {
    router.get(
      users.index.url(),
      { ...filters, role: value || undefined },
      { preserveState: true }
    )
  }

  const handleClearFilters = () => {
    router.get(users.index.url())
  }

  const handleCreateUser = () => {
    router.get(users.create.url())
  }

  const handleEditUser = (userId: number) => {
    router.get(users.edit({ user: userId }).url)
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(users.destroy({ user: userId }).url)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Users
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search by name, email, or phone"
              defaultValue={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-[260px]"
            />

            <Select
              value={filters.role ?? ''}
              onValueChange={handleRoleChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="admin">
                  Admin
                </SelectItem>

                <SelectItem value="sales">
                  Sales
                </SelectItem>

                <SelectItem value="developer">
                  Developer
                </SelectItem>

                <SelectItem value="manager">
                  Manager
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={handleClearFilters}
            >
              Clear filters
            </Button>
          </div>

          <Button onClick={handleCreateUser}>
            New user
          </Button>
        </div>

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
                  Position
                </TableHead>

                <TableHead>
                  Role
                </TableHead>

                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {usersData.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name} {user.last_name}
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      <div>{user.email}</div>

                      {user.phone && (
                        <div className="text-muted-foreground">
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    {user.position ?? '—'}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {user.role}
                    </Badge>
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
                          onClick={() => handleEditUser(user.id)}
                        >
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteUser(user.id)}
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