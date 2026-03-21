import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { X, ArrowRight, TrendingUp, Target, Zap } from 'lucide-react'
import { useLocale } from '@/contexts/LocaleContext'
import { clientCases } from '@/data/client-cases'
import { ClientCase } from '@/types/client-case'

const iconMap = {
  trending: TrendingUp,
  target: Target,
  zap: Zap,
}

interface ClientsSectionProps {
  clients?: ClientCase[]
}

const ClientsSection = ({
  clients = clientCases,
}: ClientsSectionProps) => {
  const { t, locale } = useLocale()
  const [selectedClient, setSelectedClient] = useState<ClientCase | null>(null)

  useEffect(() => {
    if (selectedClient) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedClient])

  const normalizedClients = useMemo(() => clients, [clients])

  return (
    <>
      <section id="portfolio" className="relative overflow-hidden py-32">
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[150px]" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
                {t.portfolio.badge}
              </p>
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </div>

            <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              {t.portfolio.title}{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.portfolio.highlight}
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-white/60">
              {t.portfolio.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {normalizedClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedClient(client)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/50"
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${client.photo})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
                    {client.industry[locale]}
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold transition-colors group-hover:text-indigo-400">
                      {client.name}
                    </h3>

                    <p className="line-clamp-2 text-sm leading-relaxed text-white/60">
                      {client.description[locale]}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {client.results.slice(0, 3).map((result, i) => {
                      const Icon = iconMap[result.icon]

                      return (
                        <div key={i} className="rounded-lg bg-white/5 p-2 text-center">
                          <Icon className="mx-auto mb-1 h-4 w-4 text-indigo-400" />
                          <div className="text-lg font-bold text-white">
                            {result.value}
                          </div>
                          <div className="text-[10px] uppercase text-white/50">
                            {result.metric[locale].split(' ')[0]}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag, tagIndex) => (
                      <span
                        key={`${client.id}-${tagIndex}`}
                        className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 text-xs text-indigo-300"
                      >
                        {tag[locale]}
                      </span>
                    ))}
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-3 text-sm font-medium transition-all hover:border-indigo-500/50 hover:bg-white/5">
                    {t.portfolio.viewProject}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
            >
              {t.portfolio.startProject}
            </a>
          </div>
        </div>

        <div className="dotted-line mx-6 mt-24" />
      </section>

      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedClient(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-black"
            >
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              <div className="grid lg:grid-cols-2">
                <div
                  className="relative min-h-[400px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedClient.photo})` }}
                />

                <div className="space-y-6 p-10">
                  <h3 className="text-3xl font-bold">{selectedClient.name}</h3>

                  <p className="text-white/70">
                    {selectedClient.description[locale]}
                  </p>

                  <div>
                    <h4 className="mb-2 text-indigo-400">
                      {t.portfolio.challengeLabel}
                    </h4>
                    <p className="text-white/70">
                      {selectedClient.challenge[locale]}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 text-purple-400">
                      {t.portfolio.solutionLabel}
                    </h4>
                    <p className="text-white/70">
                      {selectedClient.solution[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ClientsSection