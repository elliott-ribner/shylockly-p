import * as React from 'react'
import { useSelector } from 'react-redux'
import Loader from 'ui/components/Loader'
import NotFound from 'ui/components/NotFound'
import { getProfile, isLoadingProfile } from 'store/selectors'
import { Text, Pane, defaultTheme, Button, majorScale, Icon, Heading } from 'evergreen-ui'
import { useDispatch } from 'react-redux'
import { IUserProfile } from 'types'

export default function(): JSX.Element {
  const dispatch = useDispatch()
  const profile = useSelector(getProfile)
  const loading = useSelector(isLoadingProfile)

  const handleLogout = React.useCallback(() => dispatch({ type: 'LOGOUT' }), [])

  React.useEffect(() => {
    dispatch({ type: 'FETCH_CURRENT_PROFILE' })
  }, [])

  if (loading) return <Loader />

  if (!profile) return <NotFound />

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
      <Icon icon="person" size={120} marginBottom={majorScale(1)} />
      <ProfileFields profile={profile} />

      <Button iconBefore="log-out" onClick={handleLogout}>
        Logout
      </Button>
    </Pane>
  )
}

function ProfileFields({ profile }: { profile: IUserProfile }) {
  return (
    <Pane marginY={majorScale(2)}>
      {Object.keys(profile).map((k: keyof IUserProfile) => (
        <Pane display="flex" flexDirection="column" alignItems="center" marginBottom={majorScale(2)}>
          <Heading size={600} display="block">
            {k}
          </Heading>
          <Text size={400} display="block">
            {profile[k] || '<none>'}
          </Text>
        </Pane>
      ))}
    </Pane>
  )
}
