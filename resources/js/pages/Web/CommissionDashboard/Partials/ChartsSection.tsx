import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from 'recharts'

import { CommissionCharts } from '../types'

interface Props {
  charts: CommissionCharts
}

export default function ChartsSection({ charts }: Props) {
  return (
    <section className="mb-10 grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Clientes por mes
          </h2>
          <p className="text-sm text-white/55">
            Evolución de clientes captados en los últimos meses.
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.clients}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
              <YAxis allowDecimals={false} stroke="rgba(255,255,255,0.45)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 14, 35, 0.95)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
                cursor={{ fill: 'rgba(99,102,241,0.08)' }}
              />
              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                fill="url(#clientsBarGradient)"
              />
              <defs>
                <linearGradient id="clientsBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Proyectos por mes
          </h2>
          <p className="text-sm text-white/55">
            Actividad mensual de proyectos asociados a tus clientes.
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={charts.projects}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
              <YAxis allowDecimals={false} stroke="rgba(255,255,255,0.45)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 14, 35, 0.95)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#a855f7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}