export interface Lead {
  id: number
  name?: string | null
  email?: string | null
  phone?: string | null
  channel: string
  status: string
  assigned_user?: {
    id: number
    name: string
  } | null
  created_at: string
}
