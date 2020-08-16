import * as React from 'react'
import { useSelector } from 'react-redux'
import { isLoggedIn } from 'store/selectors'
import { useHistory } from 'react-router'
import { Text, Pane, defaultTheme, TextInputField, Button, majorScale, IconButton } from 'evergreen-ui'
import { useDispatch } from 'react-redux'

export default function(): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedIn = useSelector(isLoggedIn)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleChangeEmail = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [])
  const handleChangePassword = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    [],
  )

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch({ type: 'LOGIN', payload: { email, password } })
    },
    [email, password],
  )

  const handleLogout = React.useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
  }, [])

  if (loggedIn) {
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
        <Text size={600} marginBottom={majorScale(2)}>
          You Are Logged In
        </Text>
        <IconButton icon="log-out" onClick={handleLogout} marginBottom={majorScale(2)} />
      </Pane>
    )
  }

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
      <Text size={600} marginBottom={majorScale(2)}>
        Login
      </Text>
      <form onSubmit={handleSubmit}>
        <TextInputField placeholder="email" autoFocus value={email} onChange={handleChangeEmail} />
        <TextInputField placeholder="Password" type="password" value={password} onChange={handleChangePassword} />
        <Button appearance="primary" type="submit">
          Login
        </Button>
      </form>
    </Pane>
  )
}
