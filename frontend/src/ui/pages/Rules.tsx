import React, { useEffect } from 'react'
import { Pane, defaultTheme, majorScale, Heading } from 'evergreen-ui'
import { useDispatch } from 'react-redux'
import { useApiCall } from 'hooks'
import * as Api from 'api'
import Rule from 'ui/components/Rule'
import Error from 'ui/components/Error'
import LoadableContent from 'ui/components/LoadableContent'

export default function(): JSX.Element {
  const dispatch = useDispatch()
  const [isLoading, rules, error] = useApiCall(Api.fetchRule, [])

  if (error) return <Error />

  useEffect(() => {
    dispatch({ type: 'FETCH_RULE' })
  }, [])
  return (
    <Pane
      height="100%"
      width="100%"
      display="flex"
      overflowY="scroll"
      justifyContent="start"
      alignItems="start"
      padding={majorScale(2)}
      flexDirection="column"
      backgroundColor={defaultTheme.colors.background.tint1}
    >
      <Heading alignSelf="center" size={800} marginTop={majorScale(2)} marginBottom={majorScale(4)}>
        Failed Payment Action Rules
      </Heading>
      <LoadableContent isLoading={isLoading}>{() => rules.length && <Rule rule={rules[0]} />}</LoadableContent>
    </Pane>
  )
}
