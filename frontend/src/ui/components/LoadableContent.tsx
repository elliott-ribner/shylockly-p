import React from 'react'
import { Pane, Text } from 'evergreen-ui'
import Loader from 'ui/components/Loader'

interface IContentLoadingProps {
  isLoading: boolean
  failure?: boolean
  notFound?: boolean
  children: any
}

export default function LoadableContent({ isLoading, notFound, failure, children }: IContentLoadingProps) {
  if (isLoading) {
    return <Loader />
  } else if (failure) {
    return (
      <Pane>
        <Text>Error</Text>
      </Pane>
    )
  } else if (notFound) {
    return (
      <Pane>
        <Text>Not Found</Text>
      </Pane>
    )
  } else {
    return children() || null
  }
}
