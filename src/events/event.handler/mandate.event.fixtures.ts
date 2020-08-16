// this file can be used to store fake responses from go cardless that will be used in the test suite when we stub out the actual http calls
// Ideally you will first test the actual http call to make sure it works, then record and save the response here. After it is saved here
// you should stub out the call in the test suite using this response

const paymentsResponse = {
  payments: {
    id: 'PM000Q83J01Z3Q',
    created_at: '2019-10-11T20:19:36.487Z',
    charge_date: '2019-10-17',
    amount: 200,
    description: 'monthly internet',
    currency: 'USD',
    status: 'pending_submission',
    amount_refunded: 0,
    reference: '1209393',
    metadata: {},
    links: { mandate: 'MD00075QG8WSNC', creditor: 'CR00005YDP5X3T' },
  },
}

const mandatesResponse = {
  mandates: {
    id: 'MD00075QG8WSNC',
    created_at: '2019-10-11T20:18:15.901Z',
    reference: 'CJV9SQ3',
    status: 'pending_submission',
    scheme: 'ach',
    next_possible_charge_date: '2019-10-17',
    payments_require_approval: false,
    metadata: {},
    links: {
      customer_bank_account: 'BA00076ACQ4HKT',
      creditor: 'CR00005YDP5X3T',
      customer: 'CU0007FR34N4NA',
    },
  },
}

const customersRepsonse = {
  customers: {
    id: 'CU0007FR34N4NA',
    created_at: '2019-10-11T20:11:28.501Z',
    email: 'email@gmail.com',
    given_name: 'Randy',
    family_name: 'Rubner',
    company_name: 'Ot Labs',
    address_line1: 'Address',
    address_line2: null,
    address_line3: null,
    city: 'City',
    region: 'MA',
    postal_code: '01812',
    country_code: 'US',
    language: 'en',
    swedish_identity_number: null,
    danish_identity_number: null,
    phone_number: null,
    metadata: {},
  },
}

const paymentEventCancelled = {
  id: 'EV451',
  created_at: '2014-08-03T12:00:00.000Z',
  action: 'failed',
  resource_type: 'payments',
  links: {
    payment: 'PM000Q83J01Z3Q',
  },
  details: {
    origin: 'bank',
    cause: 'mandate_cancelled',
    description: 'Customer cancelled the mandate at their bank branch.',
    scheme: 'bacs',
    reason_code: 'ARUDD-1',
  },
}

const paymentEventCollected = {
  id: 'EV123',
  created_at: '2014-08-03T12:00:00.000Z',
  action: 'confirmed',
  resource_type: 'payments',
  links: {
    payment: 'PM000Q83J01Z3Q',
  },
  details: {
    origin: 'gocardless',
    cause: 'payment_confirmed',
    description: 'Payment was confirmed as collected',
  },
}

const mandateEventClosedAcct = {
  id: 'EV123',
  created_at: '2014-08-04T12:00:00.000Z',
  action: 'cancelled',
  resource_type: 'mandates',
  links: {
    mandate: 'MD00075QG8WSNC',
  },
  details: {
    origin: 'bank',
    cause: 'bank_account_disabled',
    description: 'Your customer closed their bank account.',
    scheme: 'bacs',
    reason_code: 'ADDACS-B',
  },
  // TODO is meta data an empty object or stringified empty object?
  metadata: '{}',
}

const mandateEventExpiration = {
  id: 'EV456',
  created_at: '2014-08-04T12:00:00.000Z',
  action: 'expired',
  resource_type: 'mandates',
  links: {
    mandate: 'MD00075QG8WSNC',
  },
  details: {
    origin: 'gocardless',
    cause: 'mandate_expired',
    description: 'The mandate expired due to inactivity.',
  },
  // TODO is meta data an empty object or stringified empty object?
  metadata: '{}',
}

const failedPaymentEvent = {
  id: 'EV123',
  created_at: '2014-04-08T17:01:06.000Z',
  resource_type: 'payments',
  action: 'failed',
  details: {
    origin: 'bank',
    cause: 'insufficient_funds',
    description: "The customer's account had insufficient funds to make this payment.",
    scheme: 'sepa_core',
    reason_code: 'AM04',
  },
  metadata: {},
  links: {
    payment: 'PM123',
  },
}

const failedPayment = {
  id: 'PM000Q83J01Z3Q',
  created_at: '2019-10-11T20:19:36.487Z',
  charge_date: '2019-10-17',
  amount: 200,
  description: 'monthly internet',
  currency: 'USD',
  status: 'pending_submission',
  amount_refunded: 0,
  reference: '1209393',
  metadata: {},
  links: { mandate: 'MD00075QG8WSNC', creditor: 'CR00005YDP5X3T' },
}

export {
  customersRepsonse,
  mandatesResponse,
  paymentsResponse,
  paymentEventCancelled,
  paymentEventCollected,
  mandateEventClosedAcct,
  mandateEventExpiration,
  failedPayment,
  failedPaymentEvent,
}
