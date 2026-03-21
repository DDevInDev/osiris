import { Locale } from './i18n'

const STORAGE_KEY = 'locale'

export function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'es'

  const language = window.navigator.language.toLowerCase()

  if (language.startsWith('en')) return 'en'
  return 'es'
}

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (stored === 'es' || stored === 'en') {
    return stored
  }

  return null
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, locale)
}