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

interface User {
  id: number
  name: string
}

interface ClientFormData {
  user_id: number | null
  company_name: string
  website: string
  client_type: string
  currency: string
  country: string
  state: string
  city: string
  primary_email: string
  primary_phone: string
  notes: string
}

interface Props {
  users: User[]
  initialValues?: ClientFormData
  submitUrl: string
  method?: 'post' | 'put'
}

export default function ClientForm({
  users,
  initialValues,
  submitUrl,
  method = 'post'
}: Props) {

  const { data, setData, post, put, processing, errors } = useForm<ClientFormData>({
    user_id: initialValues?.user_id ?? null,
    company_name: initialValues?.company_name ?? '',
    website: initialValues?.website ?? '',
    client_type: initialValues?.client_type ?? 'development',
    currency: initialValues?.currency ?? 'USD',
    country: initialValues?.country ?? '',
    state: initialValues?.state ?? '',
    city: initialValues?.city ?? '',
    primary_email: initialValues?.primary_email ?? '',
    primary_phone: initialValues?.primary_phone ?? '',
    notes: initialValues?.notes ?? ''
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (method === 'put') {
      put(submitUrl)
      return
    }

    post(submitUrl)
  }

  return (
    <form onSubmit={submit} className="space-y-8">

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Client Info */}

        <div className="space-y-6 border rounded-lg p-6 bg-background">

          <h2 className="text-lg font-semibold">
            Información del cliente
          </h2>

          <div className="grid gap-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Empresa
              </label>

              <Input
                value={data.company_name}
                onChange={(e) =>
                  setData('company_name', e.target.value)
                }
              />

              {errors.company_name && (
                <p className="text-sm text-red-500">
                  {errors.company_name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Website
              </label>

              <Input
                value={data.website}
                onChange={(e) =>
                  setData('website', e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email principal
              </label>

              <Input
                type="email"
                value={data.primary_email}
                onChange={(e) =>
                  setData('primary_email', e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Teléfono
              </label>

              <Input
                value={data.primary_phone}
                onChange={(e) =>
                  setData('primary_phone', e.target.value)
                }
              />
            </div>

          </div>

        </div>

        {/* Comercial */}

        <div className="space-y-6 border rounded-lg p-6 bg-background">

          <h2 className="text-lg font-semibold">
            Información comercial
          </h2>

          <div className="grid gap-4">

            {/* User */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Usuario asignado
              </label>

              <Select
                value={data.user_id ? String(data.user_id) : ''}
                onValueChange={(value) =>
                  setData('user_id', value === '0' ? null : Number(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar usuario" />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="0">
                    Sin usuario
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

            </div>

            {/* Client Type */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tipo de cliente
              </label>

              <Select
                value={data.client_type}
                onValueChange={(value) =>
                  setData('client_type', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                </SelectContent>

              </Select>
            </div>

            {/* Currency */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Moneda
              </label>

              <Select
                value={data.currency}
                onValueChange={(value) =>
                  setData('currency', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="MXN">MXN</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>

              </Select>

            </div>

          </div>

        </div>

      </div>

      {/* Location */}

      <div className="border rounded-lg p-6 bg-background space-y-6">

        <h2 className="text-lg font-semibold">
          Ubicación
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              País
            </label>

            <Input
              value={data.country}
              onChange={(e) =>
                setData('country', e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Estado
            </label>

            <Input
              value={data.state}
              onChange={(e) =>
                setData('state', e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Ciudad
            </label>

            <Input
              value={data.city}
              onChange={(e) =>
                setData('city', e.target.value)
              }
            />
          </div>

        </div>

      </div>

      {/* Notes */}

      <div className="border rounded-lg p-6 bg-background space-y-4">

        <label className="text-sm font-medium">
          Notas
        </label>

        <Input
          value={data.notes}
          onChange={(e) =>
            setData('notes', e.target.value)
          }
        />

      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={processing}>
          Guardar cliente
        </Button>
      </div>

    </form>
  )
}