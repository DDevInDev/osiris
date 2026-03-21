import { router } from '@inertiajs/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import {
  CommissionerData,
  CommissionerOption,
  CommissionFilters,
  ViewerData,
} from '../types'

interface Props {
  commissioner: CommissionerData
  viewer: ViewerData
  filters: CommissionFilters
  commissioners: CommissionerOption[]
}

export default function DashboardHero({
  commissioner,
  viewer,
  filters,
  commissioners,
}: Props) {
  const handleCommissionerChange = (value: string) => {
    router.get(
      window.location.pathname,
      {
        commissioner_id: Number(value),
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
  }

  return (
    <section className="mb-10 space-y-6">
      <div className="inline-flex items-center gap-3">
        <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <span className="text-xs uppercase tracking-[0.3em] text-indigo-400">
          Dashboard privado
        </span>
        <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Panel de comisiones
        </h1>

        <p className="max-w-3xl text-sm text-white/60 md:text-base">
          Visualiza tus clientes, proyectos y el estimado de comisión mensual
          en un solo lugar.
        </p>
      </div>

      {viewer.is_admin && commissioners.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <div className="mb-3">
            <p className="text-sm font-medium text-white">
              Ver dashboard de comisionista
            </p>
            <p className="text-sm text-white/55">
              Como administrador puedes cambiar el usuario comisionado que deseas consultar.
            </p>
          </div>

          <div className="max-w-md">
            <Select
              value={String(filters.commissioner_id ?? commissioner.id)}
              onValueChange={handleCommissionerChange}
            >
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue placeholder="Selecciona un comisionista" />
              </SelectTrigger>

              <SelectContent className="border-white/10 bg-[#0b1020] text-white">
                {commissioners.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={String(item.id)}
                    className="text-white"
                  >
                    {item.name} - {item.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-gradient-to-br from-indigo-500/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl" />

        <div className="relative z-10 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-white/50">
              Comisionista
            </p>
            <p className="text-xl font-semibold text-white">
              {commissioner.name}
            </p>
            <p className="text-sm text-white/60">
              {commissioner.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}