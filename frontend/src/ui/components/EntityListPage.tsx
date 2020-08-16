import React from 'react'
import { Text, Pane, defaultTheme, majorScale, IconButton } from 'evergreen-ui'
import { useApiCall } from 'hooks'
import { Link } from 'react-router-dom'
import { titleCaseWord } from 'utils'
import LoadableContent from 'ui/components/LoadableContent'
import FancyTable from 'ui/components/FancyTable'
import Error from 'ui/components/Error'
import pluralize from 'pluralize'

interface IEntityDetailsPageProps<EntityType, RowType> {
  entityName: string
  apiFunc: (entityId: string) => Promise<EntityType[]>
  mapEntityToTableRows: (entities: EntityType[]) => Array<RowType>
  columns: Array<keyof RowType>
  searchableFields: Array<keyof RowType>
  sortableFields: Array<keyof RowType>
  keyField: keyof RowType
  customRenderers?: { [k in keyof RowType]: (item: RowType, value: any) => React.ReactNode }
}

interface IModelEntityType {
  id: number | string
}

export default function<EntityType extends IModelEntityType, RowType>({
  entityName,
  apiFunc,
  mapEntityToTableRows,
  columns,
  searchableFields,
  sortableFields,
  keyField,
  customRenderers,
}: IEntityDetailsPageProps<EntityType, RowType>): JSX.Element {
  const [loading, entities, error] = useApiCall<EntityType[]>(apiFunc, [])

  const _customRenderers = React.useRef({
    ...(customRenderers || {}),
    link: (_: any, val: string) => (
      <IconButton is={Link} to={`/${pluralize(entityName)}/${val}`} icon="circle-arrow-right" />
    ),
  })

  if (error) return <Error />

  return (
    <Pane
      height="100%"
      width="100%"
      display="flex"
      justifyContent="start"
      alignItems="start"
      padding={majorScale(2)}
      flexDirection="column"
      backgroundColor={defaultTheme.colors.background.purpleTint}
    >
      <Text alignSelf="center" marginY={majorScale(2)} size={600}>
        {titleCaseWord(entityName)}
      </Text>
      <LoadableContent isLoading={loading}>
        {() => (
          <FancyTable<RowType>
            data={mapEntityToTableRows(entities)}
            columns={columns}
            keyField={keyField}
            searchableFields={searchableFields}
            sortableFields={sortableFields}
            minHeight={800}
            customRenderers={_customRenderers.current}
          />
        )}
      </LoadableContent>
    </Pane>
  )
}
