export type Locale = 'es' | 'en'

export interface LocalizedText {
  es: string
  en: string
}

export interface ClientResult {
  metric: LocalizedText
  value: string
  icon: 'trending' | 'target' | 'zap'
}

export interface ClientCase {
  id: number
  name: string
  industry: LocalizedText
  description: LocalizedText
  challenge: LocalizedText
  solution: LocalizedText
  results: ClientResult[]
  tags: LocalizedText[]
  photo: string
  logo?: string
  url?: string
}