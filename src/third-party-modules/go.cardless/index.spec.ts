import {
  customersRepsonse,
  mandatesResponse,
  paymentsResponse,
  mandateEventClosedAcct,
} from '../../events/event.handler/mandate.event.fixtures'
import * as sinon from 'sinon'
import goCardlessModule from './index'
import request from '../../request'

let rpStub

const fakeAccessToken = 'sandbox_cT0uXQEorHD4mOGgP_nc-D5qrQklTW7St4V7rJ'

describe('Go cardless api module', () => {
  beforeAll(async () => {
    rpStub = sinon.stub(request, 'rp')
    rpStub.callsFake(({ url, method }) => {
      if (method === 'GET' && url.includes('/customers/')) {
        return Promise.resolve(JSON.stringify(customersRepsonse))
      }
      if (method === 'GET' && url.includes('/mandates/')) {
        return Promise.resolve(JSON.stringify(mandatesResponse))
      }
      if (method === 'GET' && url.includes('/payments/')) {
        return Promise.resolve(JSON.stringify(paymentsResponse))
      }
      if (method === 'POST' && url.includes('/retry')) {
        return Promise.resolve(JSON.stringify({}))
      }
      if (method === 'POST' && url.includes('hooks.slack.com/')) {
        return Promise.resolve(JSON.stringify({}))
      }
      throw new Error('This kind of request not yet handled')
    })
  })

  it('get mandate returns mandate', async () => {
    const result = await goCardlessModule.getMandate('MD00075QG8WSNC', fakeAccessToken)
    expect(result).toHaveProperty('status')
    expect(result.id).toEqual('MD00075QG8WSNC')
  })

  it('get data from mandate event returns correct data', async () => {
    const result = await goCardlessModule.getDataFromMandateEvent(mandateEventClosedAcct, fakeAccessToken)
    expect(result).toHaveProperty('customer')
    expect(result).toHaveProperty('mandate')
  })
})
