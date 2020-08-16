import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { isLoggedIn } from 'store/selectors'
import { Link } from 'react-router-dom'
import { Pane, majorScale, defaultTheme, Icon, IconName, Text } from 'evergreen-ui'

import 'ui/components/Navbar.styl'

export default function(): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedIn = useSelector(isLoggedIn)

  const handleLogout = React.useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
  }, [])
  return (
    <Pane
      className="navbar-component"
      height="100%"
      width={majorScale(40)}
      display="flex"
      alignItems="stretch"
      flexDirection="column"
      border="none"
      margin="0"
      paddingTop={majorScale(5)}
      backgroundColor={defaultTheme.palette.green.dark}
    >
      <NavItem text="Home" link="/" iconName="home" />
      <NavItem text="Rules" link="/rules" iconName="fork" />
      <NavItem text="Events" link="/events" iconName="timeline-events" />
      <NavItem text="Mandates" link="/mandates" iconName="flows" />
      <NavItem text="Customers" link="/customers" iconName="people" />
      <NavItem text="Payments" link="/payments" iconName="credit-card" />
      <NavItem text="Profile" link="/profile" iconName="person" />
      {loggedIn ? (
        <NavItem text="Log Out" onClick={handleLogout} iconName="log-out" />
      ) : (
        <NavItem text="Log In" link="/login" iconName="log-in" />
      )}
      <NavItem text="Connect GC" link="/connect" iconName="arrows-horizontal" />
    </Pane>
  )
}

interface INavItemProps {
  iconName: IconName
  text: string
  link?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

function NavItem({ iconName, text, link, onClick }: INavItemProps) {
  const location = useLocation()
  const active = link && location.pathname === link

  if (link) {
    return (
      <Link to={link} onClick={onClick} className={active ? 'active' : ''}>
        <Pane display="flex" alignItems="center" height={majorScale(7)} cursor="pointer" paddingX={majorScale(2)}>
          <Icon icon={iconName} marginRight={majorScale(2)} size={majorScale(3)} color="white" />
          <Text onClick={onClick}>{text}</Text>
        </Pane>
      </Link>
    )
  }

  return (
    <Pane
      className={active ? 'static-nav-item active' : 'static-nav-item'}
      display="flex"
      alignItems="center"
      height={majorScale(7)}
      cursor="pointer"
      paddingX={majorScale(2)}
      onClick={onClick}
    >
      <Icon icon={iconName} marginRight={majorScale(2)} size={majorScale(3)} color="white" />
      <Text className="nav-text">{text}</Text>
    </Pane>
  )
}
