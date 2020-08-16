import React from 'react'
import EntityDetailsPage from 'ui/components/EntityDetailsPage'
import * as Api from 'api'
import { IPayment } from 'types'

export default () => <EntityDetailsPage<IPayment> entityName="payment" apiFunc={Api.fetchPayment} />
