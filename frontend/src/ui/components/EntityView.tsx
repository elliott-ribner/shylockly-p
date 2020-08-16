import React from 'react'
import { Text, Heading, Pane, defaultTheme, majorScale, Icon } from 'evergreen-ui'

interface IEntityViewProps<EntityType> {
  entity: EntityType
}

export default function EntityView<EntityType>({ entity }: IEntityViewProps<EntityType>) {
  const entityFields = React.useRef(entity ? Object.entries(entity) : undefined)

  const renderField = React.useCallback((name: string, val) => {
    if (val === null || val === undefined) return <EntityTextField />
    if (typeof val === 'object') return <EntityView entity={val} />
    if (typeof val === 'boolean') return <EntityBoolField val={val} />
    if (typeof val === 'string' || typeof val === 'number') return <EntityTextField val={val} />
    return <EntityTextField val={val} />
  }, [])
  return (
    <Pane
      display="flex"
      flexDirection="column"
      marginTop={majorScale(2)}
      marginBottom={majorScale(2)}
      paddingLeft={majorScale(2)}
    >
      {entityFields.current.map(([name, value]) => (
        <Pane key={name} display="flex" flexDirection="row" alignItems="flex-start" marginBottom={majorScale(1)}>
          <Icon icon="chevron-right" marginRight={majorScale(2)} size={18} color={defaultTheme.colors.icon.default} />
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            width={majorScale(16)}
          >
            <Heading size={600}>{name}</Heading>
            {renderField(name, value)}
          </Pane>
        </Pane>
      ))}
    </Pane>
  )
}

const EntityTextField = ({ val }: { val?: string | number }) => <Text>{val || '<empty>'}</Text>

const EntityBoolField = ({ val }: { val: boolean }) => (
  <Pane display="flex" alignItems="center">
    <Icon icon={val ? 'tick-circle' : 'disable'} />
    <Text marginLeft={majorScale(1)}>{val ? 'Yes' : 'No'}</Text>
  </Pane>
)
