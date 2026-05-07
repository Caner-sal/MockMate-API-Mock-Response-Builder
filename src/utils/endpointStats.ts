import { MockEndpoint, HttpMethod } from '../types'

export function getTotalCount(endpoints: MockEndpoint[]): number {
  return endpoints.length
}

export function getMethodCount(endpoints: MockEndpoint[], method: HttpMethod): number {
  return endpoints.filter((ep) => ep.method === method).length
}

export function getSuccessCount(endpoints: MockEndpoint[]): number {
  return endpoints.filter((ep) => ep.statusCode >= 200 && ep.statusCode < 300).length
}

export function getErrorCount(endpoints: MockEndpoint[]): number {
  return endpoints.filter((ep) => ep.statusCode >= 400).length
}

export function getMostUsedTag(endpoints: MockEndpoint[]): string {
  if (endpoints.length === 0) return '—'
  const freq: Record<string, number> = {}
  endpoints.forEach((ep) => {
    ep.tags.forEach((tag) => {
      freq[tag] = (freq[tag] ?? 0) + 1
    })
  })
  const entries = Object.entries(freq)
  if (entries.length === 0) return '—'
  entries.sort((a, b) => b[1] - a[1])
  return entries[0][0]
}
