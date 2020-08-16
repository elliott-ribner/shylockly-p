import * as React from 'react'
import { Pane, defaultTheme, Heading } from 'evergreen-ui'

export default function(): JSX.Element {
  return (
    <Pane
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor={defaultTheme.colors.background.tint1}
    >
      <Heading size={800}>Welcome to failed payments</Heading>
    </Pane>
  )
}
