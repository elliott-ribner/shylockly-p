import React, { useState, ReactNode } from 'react'
import { Pane, Icon, Text } from 'evergreen-ui'

interface IExpandableContentProps {
  text: ReactNode
  children: ReactNode
}
export default function ExpandableContent({ children, text }: IExpandableContentProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <Pane
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <Text>{text}</Text>
        <Icon icon={expanded ? 'caret-down' : 'caret-up'} />
      </Pane>
      {expanded && <Pane>{children}</Pane>}
    </>
  )
}
