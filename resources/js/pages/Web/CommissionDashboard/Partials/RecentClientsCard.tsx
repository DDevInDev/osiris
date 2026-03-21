import { RecentClient } from '../types'

interface Props {
  recentClients: RecentClient[]
}

export default function RecentClientsCard({ recentClients }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Clientes recientes
        </h2>
        <p className="text-sm text-white/55">
          Últimos clientes vinculados a esta cuenta.
        </p>
      </div>

      <div className="space-y-4">
        {recentClients.length > 0 ? (
          recentClients.map((client) => (
            <div
              key={client.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-indigo-400/30 hover:bg-white/[0.07]"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-white">
                    {client.company_name}
                  </p>
                  <p className="text-sm text-white/55">
                    {client.primary_email || 'Sin email'}
                  </p>
                  <p className="text-sm text-white/55">
                    {client.primary_phone || 'Sin teléfono'}
                  </p>
                </div>

                <div className="text-sm text-white/50">
                  <p>Tipo: {client.client_type}</p>
                  <p>Alta: {client.created_at}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-6 text-sm text-white/45">
            No hay clientes recientes.
          </div>
        )}
      </div>
    </div>
  )
}