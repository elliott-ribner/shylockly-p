export interface IRule {
  id: string
  organisationId: string
  sendSlackNotice: boolean
  slackWebhookUrl: string | undefined
  createZenhubTicket: boolean
  retryPayment: boolean
  retryPaymentIntervalMins1: number
  retryPaymentIntervalMins2: number
  retryPaymentIntervalMins3: number
  failedPaymentEmailContent: string
  mandateEmailContent: string
  failedPaymentEmailSubject: string
  mandateEmailSubject: string
  fromEmail: string
  fromName: string
  replyToEmail: string
  replyToName: string
}

export type IEventResourceTypes = 'payments' | 'mandates' | 'payouts' | 'refunds' | 'subscriptions'

export interface IEvent {
  id: number
  action: string
  created_at: Date
  resource_type: IEventResourceTypes
  metadata: object
  details: IEventDetails
  links: IEventLinks
}

export interface IMandate {
  id: string
  created_at: Date
  links: IEventLinks
  metadata: object
  next_possible_charge_date: Date
  payments_require_approval: boolean
  reference: string
  scheme: string
  status: string
}

export interface IEventDetails {
  id: number
  cause?: string
  description?: string
  origin: string
  reason_code?: string
  scheme?: string
}

export interface IEventLinks {
  id: number
  mandate?: string
  new_customer_bank_account?: string
  previous_customer_bank_account?: string
  new_mandate?: string
  organization?: string
  payment?: string
  payout?: string
  refund?: string
  subscription?: string
}

export interface IUser {
  id: number
  redirect_uri?: string
  access_token?: string
  company: string
  created_at: Date
  code?: string
  organisation_id?: string
}

export interface IUserProfile {
  email: string
}

export interface ICustomer {
  id: string
  created_at: string
  email: string
  given_name: string
  family_name: string
  company_name: string
  address_line1: string
  address_line2: string
  address_line3: string
  city: string
  region: string
  postal_code: string
  country_code: string
  language: string
  swedish_identity_number: string
  danish_identity_number: string
  phone_number: string
  metadata: any
}

export interface IPayment {
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
