import React from 'react'
import * as Api from 'api'
import EntityListPage from 'ui/components/EntityListPage'
import { ICustomer } from 'types'

interface ICustomerRow {
  id: string
  created_at: string
  email: string
  given_name: string
  family_name: string
  company_name: string
  address_line1: string
  address_line2: string
  address_line3: string
  city: string
  region: string
  postal_code: string
  country_code: string
  language: string
  swedish_identity_number: string
  danish_identity_number: string
  phone_number: string
  metadata: any
  link: string
}

export default function(): JSX.Element {
  // Format events for table display
  const mapMandateToTableRow = React.useCallback(
    (mandates: ICustomer[]): ICustomerRow[] => mandates.map(e => ({ ...e, link: e.id })),
    [],
  )

  return (
    <EntityListPage<ICustomer, ICustomerRow>
      entityName="customer"
      apiFunc={Api.fetchCustomers}
      mapEntityToTableRows={mapMandateToTableRow}
      columns={[
        'id',
        'created_at',
        'email',
        'given_name',
        'family_name',
        'company_name',
        'phone_number',
        'metadata',
        'link',
      ]}
      keyField="id"
      searchableFields={[]}
      sortableFields={[
        'id',
        'created_at',
        'email',
        'given_name',
        'family_name',
        'company_name',
        'phone_number',
        'metadata',
        'link',
      ]}
    />
  )
}
