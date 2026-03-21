import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react'
import { Locale, translations } from '@/lib/i18n'
import { getBrowserLocale, getStoredLocale, setStoredLocale } from '@/lib/locale'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.es
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

interface LocaleProviderProps {
  children: ReactNode
  initialLocale?: Locale
}

export function LocaleProvider({
  children,
  initialLocale = 'es',
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    const storedLocale = getStoredLocale()

    if (storedLocale) {
      setLocaleState(storedLocale)
      return
    }

    setLocaleState(getBrowserLocale())
  }, [])

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale)
    setStoredLocale(nextLocale)
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale]
  )

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}