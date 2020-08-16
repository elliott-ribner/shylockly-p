import React from 'react'
import EntityDetailsPage from 'ui/components/EntityDetailsPage'
import * as Api from 'api'
import { ICustomer } from 'types'

export default () => <EntityDetailsPage<ICustomer> entityName="customer" apiFunc={Api.fetchCustomer} />
