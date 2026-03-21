export interface StatCardProps {
  title: string
  value: string | number
  description?: string
}

export interface ChartPoint {
  month: string
  value: number
}

export interface RecentClient {
  id: number
  company_name: string
  primary_email: string
  primary_phone: string
  client_type: string
  created_at: string
}

export interface RecentProject {
  id: number
  name: string
  status: string
  status_label: string
  budget: string
  final_price: string | null
  currency: string
  created_at: string
  client: {
    id: number
    company_name: string
  } | null
}

export interface CommissionerOption {
  id: number
  name: string
  email: string
}

export interface CommissionStats {
  total_clients: number
  total_projects: number
  monthly_clients: number
  monthly_projects: number
  monthly_completed_projects: number
  monthly_revenue: number
  monthly_commission: number
  currency: string
}

export interface CommissionCharts {
  clients: ChartPoint[]
  projects: ChartPoint[]
}

export interface CommissionerData {
  id: number
  name: string
  email: string
  commission_enabled: boolean
  commission_type: string | null
  commission_rate: number | null
  commission_applies_on: string | null
}

export interface ViewerData {
  id: number
  is_admin: boolean
  is_viewing_another_commissioner: boolean
}

export interface CommissionFilters {
  commissioner_id: number | null
}

export interface CommissionDashboardProps {
  stats: CommissionStats
  charts: CommissionCharts
  recentClients: RecentClient[]
  recentProjects: RecentProject[]
  commissioner: CommissionerData
  viewer: ViewerData
  filters: CommissionFilters
  commissioners: CommissionerOption[]
}