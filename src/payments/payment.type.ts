export class PaymentType {
  id: string
  created_at: string
  charge_date: string
  amount: number
  description: string
  currency: string
  status: string
  amount_refunded: number
  reference: string
  metadata: any
  links: { mandate: string; creditor: string }
}
