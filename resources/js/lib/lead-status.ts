export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'converted'
  | 'discarded'

export const leadStatusLabel: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  converted: 'Converted',
  discarded: 'Discarded',
}

export const leadStatusVariant: Record<
  LeadStatus,
  'default' | 'secondary' | 'success' | 'destructive'
> = {
  new: 'secondary',
  contacted: 'default',
  qualified: 'default',
  converted: 'success',
  discarded: 'destructive',
}
