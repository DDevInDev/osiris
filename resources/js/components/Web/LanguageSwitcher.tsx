import { Languages } from 'lucide-react'
import { useLocale } from '@/contexts/LocaleContext'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2 py-2 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.15)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-600/80 text-white shadow-lg shadow-indigo-500/30">
          <Languages className="h-4 w-4" />
        </div>

        <div className="flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5">
          <button
            type="button"
            onClick={() => setLocale('es')}
            className={`px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
              locale === 'es'
                ? 'bg-white text-black'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            ES
          </button>

          <button
            type="button"
            onClick={() => setLocale('en')}
            className={`px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
              locale === 'en'
                ? 'bg-white text-black'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  )
}