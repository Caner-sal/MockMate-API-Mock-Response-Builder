import { useState, useCallback } from 'react'
import { MockEndpoint, MockRequestResult } from '../types'
import { formatJson } from '../utils/json'

const INITIAL_STATE: MockRequestResult = {
  loading: false,
  response: null,
  statusCode: null,
  elapsedMs: null,
}

export function useMockRequest() {
  const [result, setResult] = useState<MockRequestResult>(INITIAL_STATE)

  const sendMockRequest = useCallback((endpoint: MockEndpoint) => {
    setResult({ loading: true, response: null, statusCode: null, elapsedMs: null })
    const start = Date.now()
    setTimeout(() => {
      const elapsedMs = Date.now() - start
      setResult({
        loading: false,
        response: formatJson(endpoint.responseBody),
        statusCode: endpoint.statusCode,
        elapsedMs,
      })
    }, endpoint.delayMs)
  }, [])

  const reset = useCallback(() => setResult(INITIAL_STATE), [])

  return { result, sendMockRequest, reset }
}
