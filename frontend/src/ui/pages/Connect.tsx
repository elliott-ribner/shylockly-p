import * as React from 'react'
import { Text, Pane, defaultTheme, Button } from 'evergreen-ui'
import { useDispatch } from 'react-redux'

export default function (): JSX.Element {
  const dispatch = useDispatch()
  dispatch({ type: 'FETCH_USER', payload: {} })

  const clientId = 'someClientId'
  const responseType = 'code'
  const scope = 'read_write'
  const redirectUri = 'http://localhost:3000/callback'
  const state = 'null'
  const initialView = 'login'
  const queryParams = `response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&initial_view=${initialView}`

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
      <a href={`https://connect-sandbox.gocardless.com/oauth/authorize?${queryParams}`}>
        <Button>
          <Text>Connect your goCardless account!</Text>
        </Button>
      </a>
    </Pane>
  )
}
