import React from 'react'
import * as Api from 'api'
import EntityListPage from 'ui/components/EntityListPage'
import { IEvent } from 'types'

interface IEventRow extends Omit<IEvent, 'metadata' | 'details'> {
  metadata: string
  details: string
  link: number
}

export default function(): JSX.Element {
  // Format events for table display
  const mapEventsToTableRows = React.useCallback(
    (events: IEvent[]): IEventRow[] =>
      events.map(e => ({ ...e, metadata: JSON.stringify(e.metadata), details: JSON.stringify(e.details), link: e.id })),
    [],
  )

  return (
    <EntityListPage<IEvent, IEventRow>
      entityName="event"
      apiFunc={Api.fetchEvents}
      mapEntityToTableRows={mapEventsToTableRows}
      columns={['id', 'created_at', 'action', 'resource_type', 'metadata', 'link']}
      keyField="id"
      searchableFields={['details', 'id', 'metadata']}
      sortableFields={['created_at', 'action', 'id']}
    />
  )
}
