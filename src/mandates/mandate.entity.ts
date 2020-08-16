export interface IMandate {
  id: string
  created_at: Date
  links: object
  metadata: object
  next_possible_charge_date: Date
  payments_require_approval: boolean
  reference: string
  scheme: string
  status: string
}
