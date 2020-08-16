import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { useSelector } from 'react-redux'
import { isLoggedIn } from 'store/selectors'

interface IPrivateRoute extends RouteProps {
  children: React.ReactNode
}

export default function PrivateRoute({ children, ...rest }: IPrivateRoute) {
  const loggedIn = useSelector(isLoggedIn)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  )
}
