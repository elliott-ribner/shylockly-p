import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Pane, defaultTheme } from 'evergreen-ui'
import PrivateRoute from 'ui/components/PrivateRoute'
import Navbar from 'ui/components/Navbar'
import Home from 'ui/pages/Home'
import Login from 'ui/pages/Login'
import Profile from 'ui/pages/Profile'
import Rules from 'ui/pages/Rules'
import Events from 'ui/pages/Events'
import Mandates from 'ui/pages/Mandates'
import MandateDetails from 'ui/pages/MandateDetails'
import Customers from 'ui/pages/Customers'
import CustomerDetails from 'ui/pages/CustomerDetails'
import Payments from 'ui/pages/Payments'
import PaymentDetails from 'ui/pages/PaymentDetails'
import EventDetails from 'ui/pages/EventDetails'
import Connect from 'ui/pages/Connect'
import Callback from 'ui/pages/Callback'
import 'ui/App.styl'

export default function(): JSX.Element {
  return (
    <Router>
      <Pane
        height="100%"
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="start"
        alignItems="start"
        margin="-8px"
        overflow="hidden"
        backgroundColor={defaultTheme.colors.background.tint1}
      >
        <Navbar />
        <Pane width="100%" overflowY="scroll" maxHeight="100vh">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/rules">
              <Rules />
            </PrivateRoute>
            <PrivateRoute exact path="/events">
              <Events />
            </PrivateRoute>
            <PrivateRoute exact path="/events/:id">
              <EventDetails />
            </PrivateRoute>
            <PrivateRoute exact path="/mandates">
              <Mandates />
            </PrivateRoute>
            <PrivateRoute exact path="/mandates/:id">
              <MandateDetails />
            </PrivateRoute>
            <PrivateRoute exact path="/customers">
              <Customers />
            </PrivateRoute>
            <PrivateRoute exact path="/customers/:id">
              <CustomerDetails />
            </PrivateRoute>
            <PrivateRoute exact path="/payments">
              <Payments />
            </PrivateRoute>
            <PrivateRoute exact path="/payments/:id">
              <PaymentDetails />
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/connect">
              <Connect />
            </PrivateRoute>
            <PrivateRoute exact path="/callback">
              <Callback />
            </PrivateRoute>
          </Switch>
        </Pane>
      </Pane>
    </Router>
  )
}
