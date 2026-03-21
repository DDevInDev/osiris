import { motion } from 'framer-motion'
import { useLocale } from '@/contexts/LocaleContext'

const technologies = [
  { name: 'Laravel', logo: '/icons/laravel.svg' },
  { name: 'React', logo: '/icons/react.svg' },
  { name: 'TypeScript', logo: '/icons/typescript.svg' },
  { name: 'Node.js', logo: '/icons/node.svg' },
  { name: 'Android', logo: '/icons/android.svg' },
  { name: 'iOS', logo: '/icons/ios.svg' },
]

const AboutSection = () => {
  const { t } = useLocale()

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

            <p className="text-sm tracking-[0.3em] uppercase text-indigo-400 font-medium">
              {t.about.badge}
            </p>

            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            {t.about.title}
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.about.highlight}
            </span>
          </h2>
        </motion.div>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="flex-[2]">
            <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">

              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                {t.about.mainTitle}
              </h3>

              <p className="text-white/70 text-lg mb-8">
                {t.about.description}
              </p>

              <div className="space-y-4">
                {t.about.features.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 mt-2" />

                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech */}
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">
                  {t.about.technologies}
                </p>

                <div className="flex flex-wrap gap-6">
                  {technologies.map((tech) => (
                    <img key={tech.name} src={tech.logo} alt={tech.name} className="h-8 opacity-70" />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="text-5xl font-bold text-indigo-400 mb-2">8+</div>
              <p>{t.about.stats.experience.title}</p>
              <p className="text-sm text-white/50 mt-2">
                {t.about.stats.experience.description}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="text-5xl font-bold text-purple-400 mb-2">120+</div>
              <p>{t.about.stats.projects.title}</p>
              <p className="text-sm text-white/50 mt-2">
                {t.about.stats.projects.description}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="text-5xl font-bold text-pink-400 mb-2">95%</div>
              <p>{t.about.stats.satisfaction.title}</p>
              <p className="text-sm text-white/50 mt-2">
                {t.about.stats.satisfaction.description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection