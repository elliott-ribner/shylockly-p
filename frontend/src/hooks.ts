import React from 'react'

export function useApiCall<ResponseType>(
  func: (...args: any[]) => Promise<ResponseType>,
  funcArgs: Array<any>,
  dataSelector: (res: any) => ResponseType = res => res.data,
): [boolean, ResponseType, boolean] {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [failed, setFailed] = React.useState(false)
  const [result, setResult] = React.useState<ResponseType>(undefined)

  React.useEffect(() => {
    func(...funcArgs)
      .then((res: ResponseType) => {
        setResult(dataSelector(res))
        setIsLoading(false)
      })
      .catch(() => {
        setFailed(true)
        setIsLoading(false)
      })
  }, [])

  return [isLoading, result, failed]
}
