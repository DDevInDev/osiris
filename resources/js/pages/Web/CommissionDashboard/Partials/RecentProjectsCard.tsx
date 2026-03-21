import { RecentProject } from '../types'

interface Props {
  recentProjects: RecentProject[]
}

export default function RecentProjectsCard({ recentProjects }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Proyectos recientes
        </h2>
        <p className="text-sm text-white/55">
          Últimos proyectos asociados a esta cuenta.
        </p>
      </div>

      <div className="space-y-4">
        {recentProjects.length > 0 ? (
          recentProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-purple-400/30 hover:bg-white/[0.07]"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-white">
                    {project.name}
                  </p>
                  <p className="text-sm text-white/55">
                    Cliente: {project.client?.company_name ?? '—'}
                  </p>
                  <p className="text-sm text-white/55">
                    Estado: {project.status_label ?? project.status}
                  </p>
                </div>

                <div className="text-sm text-white/50">
                  <p>
                    {project.currency} {Number(project.final_price ?? project.budget).toLocaleString()}
                  </p>
                  <p>
                    Alta: {project.created_at}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-6 text-sm text-white/45">
            No hay proyectos recientes.
          </div>
        )}
      </div>
    </div>
  )
}