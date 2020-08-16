import * as React from 'react'
import { Text, Pane, defaultTheme } from 'evergreen-ui'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function(): JSX.Element {
  const location = useLocation()
  const dispatch = useDispatch()
  const { search } = location
  const params = new URLSearchParams(search)
  const code = params.get('code')
  dispatch({ type: 'UPDATE_GC_ACCESS_TOKEN', payload: code })
  return (
    <Pane
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor={defaultTheme.colors.background.greenTint}
    >
      <Text>Go cardless account connected!</Text>
    </Pane>
  )
}
