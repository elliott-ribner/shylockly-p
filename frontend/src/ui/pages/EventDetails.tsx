import React from 'react'
import EntityDetailsPage from 'ui/components/EntityDetailsPage'
import * as Api from 'api'
import { IEvent } from 'types'

export default () => <EntityDetailsPage<IEvent> entityName="event" apiFunc={Api.fetchEvent} />
