import React from 'react'
import { Table, TextDropdownButton } from 'evergreen-ui'

interface IFancyTableHeaderProps {
  type: 'search' | 'sort' | 'plain'
  name: string
  value: string
  onUpdate?: (n: string, v: string) => void
  onSort?: (field: string) => void
  sortDirection?: ISortDirection
}

function FancyTableHeader({ type, name, value, onUpdate, onSort, sortDirection }: IFancyTableHeaderProps) {
  const handleChange = React.useCallback(
    (value: string) => {
      onUpdate(name, value)
    },
    [name, value],
  )
  const getIcon = React.useCallback((s: ISortDirection) => {
    if (s === 'none') return 'sort'
    if (s === 'asc') return 'sort-asc'
    if (s === 'desc') return 'sort-desc'
  }, [])

  const handleSort = React.useCallback(() => {
    onSort(name)
  }, [])
  switch (type) {
    case 'search':
      return (
        <Table.SearchHeaderCell
          className="search-header-cell"
          value={value}
          onChange={handleChange}
          placeholder={name}
        />
      )
    case 'plain':
      return <Table.TextHeaderCell textProps={{ size: 500 }}>{name}</Table.TextHeaderCell>
    case 'sort':
      return (
        <Table.TextHeaderCell textProps={{ size: 500 }} onClick={handleSort} cursor="pointer">
          <TextDropdownButton
            display="flex"
            justifyContent="space-between"
            fontSize="1.1rem"
            alignItems="center"
            icon={getIcon(sortDirection)}
          >
            {name}
          </TextDropdownButton>
        </Table.TextHeaderCell>
      )
    default:
      return <Table.TextHeaderCell>{name}</Table.TextHeaderCell>
  }
}

function FancyTableRow<ItemType>({
  item,
  key,
  fields,
  customRenderers,
}: {
  item: ItemType
  key: string
  fields: Array<keyof ItemType>
  customRenderers?: Partial<
    {
      [field in keyof ItemType]: (item: ItemType, value: any) => React.ReactNode
    }
  >
}) {
  const displayText = React.useCallback((item: any) => {
    if (item === null || item === undefined) return '<none>'
    if (typeof item === 'object') return JSON.stringify(item)
    return item.toString()
  }, [])
  return (
    <Table.Row key={key}>
      {fields.map(f => {
        if (customRenderers && customRenderers[f]) {
          return <Table.TextCell key={f.toString()}>{customRenderers[f](item, item[f])}</Table.TextCell>
        }
        return (
          <Table.TextCell key={f.toString()} textProps={{ size: 500 }}>
            {displayText(item[f])}
          </Table.TextCell>
        )
      })}
    </Table.Row>
  )
}

type ISortDirection = 'none' | 'asc' | 'desc'

interface IFancyTableProps<RowType> {
  data: Array<RowType>
  columns: Array<keyof RowType>
  keyField: keyof RowType
  searchableFields: Array<keyof RowType>
  sortableFields: Array<keyof RowType>
  customRenderers?: Partial<
    {
      [field in keyof RowType]: (item: RowType, value: any) => React.ReactNode
    }
  >
  minHeight: number
}

export default function FancyTable<RowType>({
  data,
  columns,
  keyField,
  searchableFields,
  sortableFields,
  customRenderers,
  minHeight,
}: IFancyTableProps<RowType>) {
  // Save a search query for each applicable column ({colName: 'search query', ...})
  const [searchQueries, setSearchQueries] = React.useState<{ [k in keyof Partial<RowType>]: string }>(
    searchableFields.reduce((acc, f) => ({ ...acc, [f]: '' }), {}) as { [k in keyof Partial<RowType>]: string },
  )
  // Save a sort order for each applicable column ({colName: 'asc', ...})
  const [sortSettings, setSortSettings] = React.useState<{ [k in keyof Partial<RowType>]: ISortDirection }>(
    sortableFields.reduce((acc, f) => ({ ...acc, [f]: 'none' }), {}) as {
      [k in keyof Partial<RowType>]: ISortDirection
    },
  )

  const nextSortDirection = React.useCallback((s: ISortDirection): ISortDirection => {
    if (s === 'asc') return 'desc'
    if (s === 'desc') return 'none'
    if (s === 'none') return 'asc'
    return 'desc'
  }, [])

  const handleSearchChange = React.useCallback(
    (field: string, value: string) => setSearchQueries({ ...searchQueries, [field]: value }),
    [searchQueries],
  )

  const handleSortChange = React.useCallback(
    (field: string) => {
      setSortSettings(sortSettings => ({
        ...sortSettings,
        [field]: nextSortDirection(sortSettings[field as keyof RowType]),
      }))
    },
    [sortSettings],
  )

  const filtered = React.useCallback(
    row => {
      return searchableFields.every(
        f =>
          searchQueries[f].length == 0 ||
          row[f]
            .toString()
            .toLowerCase()
            .includes(searchQueries[f].toLowerCase()),
      )
    },
    [data, searchableFields, searchQueries],
  )

  const sorted = React.useCallback(
    (row1, row2) => {
      for (let i = 0; i < sortableFields.length; i++) {
        const field = sortableFields[i]
        const s = sortSettings[field]
        if (s === 'none') continue
        else if (row1[field] > row2[field]) return s === 'asc' ? 1 : -1
        else if (row1[field] < row2[field]) return s === 'desc' ? 1 : -1
      }
      return 0
    },
    [data, sortableFields, sortSettings],
  )

  const rowsToDisplay = React.useMemo(() => data.filter(filtered).sort(sorted), [data, searchQueries, sortSettings])

  return (
    <Table border width="100%">
      <Table.Head>
        {columns.map((h: keyof RowType) => {
          if (searchableFields.includes(h)) {
            return (
              <FancyTableHeader
                key={h.toString()}
                type="search"
                onUpdate={handleSearchChange}
                name={h.toString()}
                value={searchQueries[h]}
              />
            )
          } else if (sortableFields.includes(h)) {
            return (
              <FancyTableHeader
                key={h.toString()}
                type="sort"
                onSort={handleSortChange}
                sortDirection={sortSettings[h]}
                name={h.toString()}
                value={h.toString()}
              />
            )
          } else {
            return <FancyTableHeader key={h.toString()} type="plain" name={h.toString()} value={searchQueries[h]} />
          }
        })}
      </Table.Head>
      <Table.VirtualBody minHeight={minHeight}>
        {rowsToDisplay.map(d => {
          return (
            <FancyTableRow<RowType>
              item={d}
              key={d[keyField].toString()}
              fields={columns}
              customRenderers={customRenderers}
            />
          )
        })}
      </Table.VirtualBody>
    </Table>
  )
}
