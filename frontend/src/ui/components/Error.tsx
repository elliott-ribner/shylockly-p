import React from 'react'
import { Icon, Pane, Heading, majorScale } from 'evergreen-ui'

export default function Error() {
  return (
    <Pane width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Heading size={800} marginBottom={majorScale(3)}>
        Error Loading Content
      </Heading>
      <Icon icon="heart-broken" size={80} color="red" />
    </Pane>
  )
}
