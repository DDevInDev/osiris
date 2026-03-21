import { ChevronDown } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { useLocale } from '@/contexts/LocaleContext'

interface HeroSectionProps {
  backgroundImage?: string
}

const HeroLottie = lazy(() => import('./HeroLottie'))

const HeroSection = ({ backgroundImage }: HeroSectionProps) => {
  const { t } = useLocale()

  return (
    <section
      id="inicio"
      aria-label={t.hero.ariaLabel}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : 'none',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="absolute top-1/2 right-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-indigo-600/30 blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16 px-6 py-24 lg:flex-row lg:py-32">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-indigo-400 sm:text-sm">
            {t.hero.badge}
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
            {t.hero.title}
          </h1>

          <p className="mx-auto mb-10 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base lg:mx-0">
            {t.hero.description}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
            >
              {t.hero.servicesCta}
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30">
                <ChevronDown className="h-3 w-3" />
              </span>
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-indigo-500 hover:text-white"
            >
              {t.hero.quoteCta}
            </a>
          </div>
        </div>

        <div className="relative mt-16 flex flex-1 justify-center lg:mt-0">
          <div className="relative rounded-full border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-pink-500/40 blur-2xl" />

            <div className="relative z-10 w-[300px] sm:w-[400px] lg:w-[450px]">
              <Suspense fallback={<div className="h-[400px] w-full" />}>
                <HeroLottie />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-6 w-6 animate-bounce text-white/50" />
      </div>
    </section>
  )
}

export default HeroSection