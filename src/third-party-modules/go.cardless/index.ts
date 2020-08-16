import request from '../../request'
import { CreateEventDto } from '../../events/create.event.dto'

require('dotenv').config()

const url = process.env.GO_CARDLESS_URL
const getOptions = (accessToken) => ({
  auth: {
    bearer: accessToken,
  },
  headers: {
    'GoCardless-Version': '2015-07-06',
  },
  'content-type': 'application/json',
})

export default {
  retryPayment: async (paymentId: string, retry_number: number, accessToken: string) => {
    const optionExtension = {
      body: {
        metadata: {
          // eslint-disable-next-line camelcase
          retry_number: retry_number + 1,
        },
      },
      json: true,
    }
    const retryResult = await request({
      method: 'POST',
      url: `${url}/payments/${paymentId}/actions/retry`,
      ...optionExtension,
      ...getOptions(accessToken),
    })
    const response = JSON.parse(retryResult)
    return response
  },
  getMandate: async (mandateId: string, accessToken: string) => {
    const mandateResult = await request({
      method: 'GET',
      url: `${url}/mandates/${mandateId}`,
      ...getOptions(accessToken),
    })
    const { mandates } = JSON.parse(mandateResult)
    return mandates
  },
  getMandates: async (accessToken: string) => {
    const mandateResult = await request({
      method: 'GET',
      url: `${url}/mandates/`,
      ...getOptions(accessToken),
    })
    const { mandates } = JSON.parse(mandateResult)
    return mandates
  },
  getPayment: async (paymentId: string, accessToken: string) => {
    const paymentResult = await request({
      method: 'GET',
      url: `${url}/payments/${paymentId}`,
      ...getOptions(accessToken),
    })
    const { payments } = JSON.parse(paymentResult)
    return payments
  },
  getPayments: async (accessToken: string) => {
    const paymentResult = await request({
      method: 'GET',
      url: `${url}/payments/`,
      ...getOptions(accessToken),
    })
    const { payments } = JSON.parse(paymentResult)
    return payments
  },
  getCustomer: async (customerId: string, accessToken: string) => {
    const customerResult = await request({
      method: 'GET',
      url: `${url}/customers/${customerId}`,
      ...getOptions(accessToken),
    })
    const { customers } = JSON.parse(customerResult)
    return customers
  },
  getCustomers: async (accessToken: string) => {
    const customerResult = await request({
      method: 'GET',
      url: `${url}/customers/`,
      ...getOptions(accessToken),
    })
    const { customers } = JSON.parse(customerResult)
    return customers
  },
  getDataFromMandateEvent: async (event: CreateEventDto, accessToken: string) => {
    const { links: eventLinks } = event
    const { mandate: mandateId } = eventLinks
    const mandates = await this.default.getMandate(mandateId, accessToken)
    const mandateLinks = mandates.links
    const { customer: customerId } = mandateLinks
    const customer = await this.default.getCustomer(customerId, accessToken)
    return {
      customer,
      mandate: mandates,
    }
  },
  getDataFromPaymentEvent: async (event: CreateEventDto, accessToken: string) => {
    const { links } = event
    const { payment } = links
    const paymentResult = await request({
      method: 'GET',
      url: `${url}/payments/${payment}`,
      ...getOptions(accessToken),
    })
    const { payments } = JSON.parse(paymentResult)
    const mandateData = await this.getDataFromMandateEvent(event, accessToken)
    return {
      payments,
      ...mandateData,
    }
  },
}
