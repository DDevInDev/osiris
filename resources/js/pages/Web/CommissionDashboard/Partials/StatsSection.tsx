import StatCard from './StatCard'
import { CommissionStats } from '../types'

interface Props {
  stats: CommissionStats
}

export default function StatsSection({ stats }: Props) {
  return (
    <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Clientes totales"
        value={stats.total_clients}
        description="Clientes asignados a tu comisión"
      />

      <StatCard
        title="Proyectos totales"
        value={stats.total_projects}
        description="Proyectos vinculados a tus clientes"
      />

      <StatCard
        title="Clientes del mes"
        value={stats.monthly_clients}
        description="Nuevos clientes registrados este mes"
      />

      <StatCard
        title="Proyectos del mes"
        value={stats.monthly_projects}
        description="Proyectos generados este mes"
      />

      <StatCard
        title="Proyectos completados"
        value={stats.monthly_completed_projects}
        description="Completados durante el mes actual"
      />

      <StatCard
        title="Ingresos del mes"
        value={`${stats.currency} ${stats.monthly_revenue.toLocaleString()}`}
        description="Monto base mensual"
      />

      <StatCard
        title="Comisión estimada"
        value={`${stats.currency} ${stats.monthly_commission.toLocaleString()}`}
        description="Estimado calculado con tu esquema actual"
      />
    </section>
  )
}