import {
  BarChart3,
  Cpu,
  Globe,
  Smartphone,
  Search,
  Bot,
  ArrowRight
} from 'lucide-react'
import { useLocale } from '@/contexts/LocaleContext'

const serviceIcons = [
  Globe,
  Smartphone,
  Search,
  Cpu,
  Bot,
  BarChart3,
]

const ServicesSection = () => {
  const { t } = useLocale()

  return (
    <section id="services" className="relative overflow-hidden py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div>
            <p className="mb-3 text-xl uppercase tracking-widest text-muted-foreground">
              {t.services.badge}
            </p>

            <h2 className="mb-6 text-4xl font-display font-bold leading-tight md:text-5xl lg:text-6xl">
              {t.services.title}
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.services.highlight}
              </span>
            </h2>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index]

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-accent/20">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="mb-3 text-lg font-display font-semibold">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
          >
            {t.services.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-indigo-500 hover:text-white"
          >
            {t.services.secondaryCta}
          </a>
        </div>
      </div>

      <div className="dotted-line mx-6 mt-24" />
    </section>
  )
}

export default ServicesSection