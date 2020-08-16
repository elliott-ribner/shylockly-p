import React from 'react'
import { Spinner, Pane } from 'evergreen-ui'

export default function Loader() {
  return (
    <Pane width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Spinner />
    </Pane>
  )
}
