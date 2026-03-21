import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface LeadMeta {
  lead_value?: number
  company?: string
  billing_name?: string
  billing_address?: string
  notes?: string
}

interface LeadFormData {
  name: string
  email: string
  phone: string
  channel: string
  status: string
  meta: LeadMeta
  assigned_to: number | null
}

interface User {
  id: number
  name: string
}

interface Props {
  users: User[]
  initialValues?: LeadFormData
  submitUrl: string
  method?: 'post' | 'put'
}

export default function LeadForm({
  users,
  initialValues,
  submitUrl,
  method = 'post'
}: Props) {

  const { data, setData, post, put, processing, errors } = useForm<LeadFormData>({
    name: initialValues?.name ?? '',
    email: initialValues?.email ?? '',
    phone: initialValues?.phone ?? '',
    channel: initialValues?.channel ?? 'web',
    status: initialValues?.status ?? 'new',
    assigned_to: initialValues?.assigned_to ?? null,

    meta: {
      lead_value: initialValues?.meta?.lead_value ?? 0,
      company: initialValues?.meta?.company ?? '',
      billing_name: initialValues?.meta?.billing_name ?? '',
      billing_address: initialValues?.meta?.billing_address ?? '',
      notes: initialValues?.meta?.notes ?? '',
    }
  })

  function setMeta<K extends keyof LeadMeta>(key: K, value: LeadMeta[K]) {
    setData('meta', {
      ...data.meta,
      [key]: value
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

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Lead Info */}
        <div className="space-y-6 border rounded-lg p-6 bg-background">

          <h2 className="text-lg font-semibold">
            Lead information
          </h2>

          <div className="grid gap-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">First name</label>
              <Input
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Input
                value={data.meta.company ?? ''}
                onChange={(e) => setMeta('company', e.target.value)}
              />
            </div>

          </div>

        </div>

        {/* Commercial */}
        <div className="space-y-6 border rounded-lg p-6 bg-background">

          <h2 className="text-lg font-semibold">
            Commercial information
          </h2>

          <div className="grid gap-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Assigned to
              </label>

              <Select
                value={data.assigned_to ? String(data.assigned_to) : ''}
                onValueChange={(value) => setData('assigned_to', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="0">
                    Unassigned
                  </SelectItem>

                  {users?.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={String(user.id)}
                    >
                      {user.name}
                    </SelectItem>
                  ))}

                </SelectContent>

              </Select>

            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Channel</label>

              <Select
                value={data.channel}
                onValueChange={(value) => setData('channel', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="ads">Ads</SelectItem>
                </SelectContent>
              </Select>

            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>

              <Select
                value={data.status}
                onValueChange={(value) => setData('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="discarded">Discarded</SelectItem>
                </SelectContent>

              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Lead value</label>
              <Input
                type="number"
                value={data.meta.lead_value ?? 0}
                onChange={(e) =>
                  setMeta('lead_value', Number(e.target.value))
                }
              />
            </div>

          </div>

        </div>

      </div>

      {/* Billing */}
      <div className="border rounded-lg p-6 bg-background space-y-6">

        <h2 className="text-lg font-semibold">
          Billing information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Billing name
            </label>
            <Input
              value={data.meta.billing_name ?? ''}
              onChange={(e) =>
                setMeta('billing_name', e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Address
            </label>
            <Input
              value={data.meta.billing_address ?? ''}
              onChange={(e) =>
                setMeta('billing_address', e.target.value)
              }
            />
          </div>

        </div>

      </div>

      {/* Notes */}
      <div className="border rounded-lg p-6 bg-background space-y-4">

        <label className="text-sm font-medium">
          Notes
        </label>

        <Input
          value={data.meta.notes ?? ''}
          onChange={(e) => setMeta('notes', e.target.value)}
        />

      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={processing}>
          {method === 'put' ? 'Update lead' : 'Save lead'}
        </Button>
      </div>

    </form>
  )
}