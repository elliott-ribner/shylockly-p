import React from 'react'
import * as Api from 'api'
import EntityListPage from 'ui/components/EntityListPage'
import { IPayment } from 'types'

interface IPaymentRow {
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
  link: string
}

export default function(): JSX.Element {
  // Format events for table display
  const mapPaymentToTableRow = React.useCallback(
    (payments: IPayment[]): IPaymentRow[] => payments.map(e => ({ ...e, link: e.id })),
    [],
  )

  return (
    <EntityListPage<IPayment, IPaymentRow>
      entityName="payment"
      apiFunc={Api.fetchPayments}
      mapEntityToTableRows={mapPaymentToTableRow}
      columns={[
        'id',
        'created_at',
        'charge_date',
        'amount',
        'description',
        'currency',
        'status',
        'amount_refunded',
        'reference',
        'metadata',
        'links',
        'link',
      ]}
      keyField="id"
      searchableFields={[]}
      sortableFields={[
        'id',
        'created_at',
        'charge_date',
        'amount',
        'description',
        'currency',
        'status',
        'amount_refunded',
        'reference',
        'metadata',
        'links',
        'link',
      ]}
    />
  )
}
