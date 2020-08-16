import React from 'react'
import * as Api from 'api'
import EntityListPage from 'ui/components/EntityListPage'
import { IMandate } from 'types'

interface IMandateRow {
  id: string
  created_at: Date
  metadata: object
  next_possible_charge_date: Date
  payments_require_approval: boolean
  reference: string
  scheme: string
  status: string
  link: string
}

export default function(): JSX.Element {
  // Format events for table display
  const mapMandateToTableRow = React.useCallback(
    (mandates: IMandate[]): IMandateRow[] => mandates.map(e => ({ ...e, link: e.id })),
    [],
  )

  return (
    <EntityListPage<IMandate, IMandateRow>
      entityName="mandate"
      apiFunc={Api.fetchMandates}
      mapEntityToTableRows={mapMandateToTableRow}
      columns={[
        'id',
        'created_at',
        'metadata',
        'next_possible_charge_date',
        'payments_require_approval',
        'reference',
        'scheme',
        'status',
        'link',
      ]}
      keyField="id"
      searchableFields={[]}
      sortableFields={[
        'id',
        'created_at',
        'metadata',
        'next_possible_charge_date',
        'payments_require_approval',
        'reference',
        'scheme',
        'status',
        'link',
      ]}
    />
  )
}
