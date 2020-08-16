import React from 'react'
import EntityDetailsPage from 'ui/components/EntityDetailsPage'
import * as Api from 'api'
import { IMandate } from 'types'

export default () => <EntityDetailsPage<IMandate> entityName="mandate" apiFunc={Api.fetchMandate} />
