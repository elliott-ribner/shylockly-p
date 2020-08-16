import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApiCall } from 'hooks'
import pluralize from 'pluralize'
import { titleCaseWord } from 'utils'
import { Heading, Pane, defaultTheme, majorScale, BackButton } from 'evergreen-ui'
import LoadableContent from 'ui/components/LoadableContent'
import EntityView from 'ui/components/EntityView'

interface IEntityDetailsPageProps<EntityType> {
  entityName: string
  apiFunc: (entityId: string) => Promise<EntityType>
}

interface IModelEntityType {
  id: number | string
}

export default function<EntityType extends IModelEntityType>({
  entityName,
  apiFunc,
}: IEntityDetailsPageProps<EntityType>): JSX.Element {
  const { id: entityId } = useParams()
  const [loading, entity, error] = useApiCall(apiFunc, [entityId])

  return (
    <Pane
      width="100%"
      backgroundColor={defaultTheme.colors.background.greenTint}
      padding={majorScale(2)}
      overflow="hidden"
    >
      <BackButton is={Link} to={`/${pluralize(entityName)}/`} icon="circle-arrow-left" marginBottom={majorScale(4)} />
      <LoadableContent isLoading={loading || (!loading && !error && !entity)} failure={error}>
        {() => {
          return (
            <>
              <Heading size={700}>{titleCaseWord(entityName)}</Heading>
              <EntityView<EntityType> entity={entity} />
            </>
          )
        }}
      </LoadableContent>
    </Pane>
  )
}
