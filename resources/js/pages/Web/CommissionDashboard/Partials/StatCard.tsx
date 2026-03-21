import { StatCardProps } from '../types'

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 space-y-2">
        <p className="text-sm text-white/60">
          {title}
        </p>

        <h3 className="text-3xl font-semibold tracking-tight text-white">
          {value}
        </h3>

        {description && (
          <p className="text-sm text-white/45">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}