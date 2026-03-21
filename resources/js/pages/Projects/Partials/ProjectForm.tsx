import { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface Option {
  value: string
  label: string
}

interface ClientOption {
  id: number
  company_name: string
  currency?: string | null
}

interface UserOption {
  id: number
  name: string
}

interface ProjectMeta {
  delivery_url?: string
  figma_url?: string
  repository_url?: string
  hours_estimated?: string
  hours_used?: string
}

interface ProjectFormData {
  client_id: string
  assigned_to: string
  name: string
  project_code: string
  type: string
  status: string
  budget: string
  final_price: string
  advance_amount: string
  currency: string
  start_date: string
  due_date: string
  completed_at: string
  description: string
  notes: string
  internal_notes: string
  meta: ProjectMeta
}

interface Props {
  clients: ClientOption[]
  users: UserOption[]
  statuses: Option[]
  types: Option[]
  initialValues?: Partial<ProjectFormData>
  submitUrl: string
  method?: 'post' | 'put'
}

export default function ProjectForm({
  clients,
  users,
  statuses,
  types,
  initialValues,
  submitUrl,
  method = 'post',
}: Props) {
  const { data, setData, post, put, processing, errors } = useForm<ProjectFormData>({
    client_id: initialValues?.client_id ?? '',
    assigned_to: initialValues?.assigned_to ?? '0',
    name: initialValues?.name ?? '',
    project_code: initialValues?.project_code ?? '',
    type: initialValues?.type ?? 'development',
    status: initialValues?.status ?? 'pending',
    budget: initialValues?.budget ?? '',
    final_price: initialValues?.final_price ?? '',
    advance_amount: initialValues?.advance_amount ?? '',
    currency: initialValues?.currency ?? 'MXN',
    start_date: initialValues?.start_date ?? '',
    due_date: initialValues?.due_date ?? '',
    completed_at: initialValues?.completed_at ?? '',
    description: initialValues?.description ?? '',
    notes: initialValues?.notes ?? '',
    internal_notes: initialValues?.internal_notes ?? '',
    meta: {
      delivery_url: initialValues?.meta?.delivery_url ?? '',
      figma_url: initialValues?.meta?.figma_url ?? '',
      repository_url: initialValues?.meta?.repository_url ?? '',
      hours_estimated: initialValues?.meta?.hours_estimated ?? '',
      hours_used: initialValues?.meta?.hours_used ?? '',
    },
  })

  useEffect(() => {
    if (!data.client_id) return

    const selectedClient = clients.find(
      (client) => String(client.id) === String(data.client_id)
    )

    if (selectedClient?.currency) {
      setData('currency', selectedClient.currency)
    }
  }, [data.client_id, clients, setData])

  function setMeta<K extends keyof ProjectMeta>(key: K, value: ProjectMeta[K]) {
    setData('meta', {
      ...data.meta,
      [key]: value,
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (method === 'put') {
      put(submitUrl)
      return
    }

    post(submitUrl)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 rounded-lg border bg-background p-6">
          <h2 className="text-lg font-semibold">
            Project information
          </h2>

          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Client
              </label>

              <Select
                value={data.client_id}
                onValueChange={(value) => setData('client_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
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

              {errors.client_id && (
                <p className="text-sm text-red-500">
                  {errors.client_id}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Project name
              </label>

              <Input
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Ex. Corporate website"
              />

              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Project code
              </label>

              <Input
                value={data.project_code}
                onChange={(e) => setData('project_code', e.target.value)}
                placeholder="Ex. PRJ-2026-001"
              />

              {errors.project_code && (
                <p className="text-sm text-red-500">
                  {errors.project_code}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description
              </label>

              <Textarea
                rows={5}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Describe the general scope of the project"
              />

              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-lg border bg-background p-6">
          <h2 className="text-lg font-semibold">
            Commercial management
          </h2>

          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Assigned to
              </label>

              <Select
                value={data.assigned_to}
                onValueChange={(value) => setData('assigned_to', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="0">
                    Unassigned
                  </SelectItem>

                  {users.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={String(user.id)}
                    >
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.assigned_to && (
                <p className="text-sm text-red-500">
                  {errors.assigned_to}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Project type
              </label>

              <Select
                value={data.type}
                onValueChange={(value) => setData('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
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

              {errors.type && (
                <p className="text-sm text-red-500">
                  {errors.type}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Status
              </label>

              <Select
                value={data.status}
                onValueChange={(value) => setData('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
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

              {errors.status && (
                <p className="text-sm text-red-500">
                  {errors.status}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Currency
              </label>

              <Input
                value={data.currency}
                onChange={(e) => setData('currency', e.target.value)}
                placeholder="MXN"
              />

              {errors.currency && (
                <p className="text-sm text-red-500">
                  {errors.currency}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-lg border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Dates and budget
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Budget
            </label>

            <Input
              type="number"
              step="0.01"
              value={data.budget}
              onChange={(e) => setData('budget', e.target.value)}
            />

            {errors.budget && (
              <p className="text-sm text-red-500">
                {errors.budget}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Final price
            </label>

            <Input
              type="number"
              step="0.01"
              value={data.final_price}
              onChange={(e) => setData('final_price', e.target.value)}
            />

            {errors.final_price && (
              <p className="text-sm text-red-500">
                {errors.final_price}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Advance amount
            </label>

            <Input
              type="number"
              step="0.01"
              value={data.advance_amount}
              onChange={(e) => setData('advance_amount', e.target.value)}
            />

            {errors.advance_amount && (
              <p className="text-sm text-red-500">
                {errors.advance_amount}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Start date
            </label>

            <Input
              type="date"
              value={data.start_date}
              onChange={(e) => setData('start_date', e.target.value)}
            />

            {errors.start_date && (
              <p className="text-sm text-red-500">
                {errors.start_date}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Due date
            </label>

            <Input
              type="date"
              value={data.due_date}
              onChange={(e) => setData('due_date', e.target.value)}
            />

            {errors.due_date && (
              <p className="text-sm text-red-500">
                {errors.due_date}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Completion date
            </label>

            <Input
              type="date"
              value={data.completed_at}
              onChange={(e) => setData('completed_at', e.target.value)}
            />

            {errors.completed_at && (
              <p className="text-sm text-red-500">
                {errors.completed_at}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-lg border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Deliverables and resources
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Delivery URL
            </label>

            <Input
              value={data.meta.delivery_url ?? ''}
              onChange={(e) => setMeta('delivery_url', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Figma URL
            </label>

            <Input
              value={data.meta.figma_url ?? ''}
              onChange={(e) => setMeta('figma_url', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Repository URL
            </label>

            <Input
              value={data.meta.repository_url ?? ''}
              onChange={(e) => setMeta('repository_url', e.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Estimated hours
              </label>

              <Input
                type="number"
                value={data.meta.hours_estimated ?? ''}
                onChange={(e) => setMeta('hours_estimated', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Hours used
              </label>

              <Input
                type="number"
                value={data.meta.hours_used ?? ''}
                onChange={(e) => setMeta('hours_used', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-lg border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Notes and follow-up
        </h2>

        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Client notes
            </label>

            <Textarea
              rows={4}
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
            />

            {errors.notes && (
              <p className="text-sm text-red-500">
                {errors.notes}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Internal notes
            </label>

            <Textarea
              rows={4}
              value={data.internal_notes}
              onChange={(e) => setData('internal_notes', e.target.value)}
            />

            {errors.internal_notes && (
              <p className="text-sm text-red-500">
                {errors.internal_notes}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={processing}>
          {processing
            ? 'Saving...'
            : method === 'put'
              ? 'Update project'
              : 'Save project'}
        </Button>
      </div>
    </form>
  )
}