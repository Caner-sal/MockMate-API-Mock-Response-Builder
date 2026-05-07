import { MockEndpoint, HttpMethod, StatusGroup, EndpointSortOption } from '../types'

const METHOD_ORDER: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export function searchEndpoints(endpoints: MockEndpoint[], query: string): MockEndpoint[] {
  if (!query.trim()) return endpoints
  const q = query.toLowerCase()
  return endpoints.filter(
    (ep) =>
      ep.name.toLowerCase().includes(q) ||
      ep.path.toLowerCase().includes(q) ||
      ep.description.toLowerCase().includes(q) ||
      ep.method.toLowerCase().includes(q) ||
      ep.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

export function filterByMethod(endpoints: MockEndpoint[], method: HttpMethod | 'All'): MockEndpoint[] {
  if (method === 'All') return endpoints
  return endpoints.filter((ep) => ep.method === method)
}

export function filterByStatusGroup(endpoints: MockEndpoint[], group: StatusGroup): MockEndpoint[] {
  if (group === 'All') return endpoints
  return endpoints.filter((ep) => {
    if (group === '2xx') return ep.statusCode >= 200 && ep.statusCode < 300
    if (group === '4xx') return ep.statusCode >= 400 && ep.statusCode < 500
    if (group === '5xx') return ep.statusCode >= 500 && ep.statusCode < 600
    return true
  })
}

export function filterByTag(endpoints: MockEndpoint[], tag: string): MockEndpoint[] {
  if (!tag || tag === 'All') return endpoints
  return endpoints.filter((ep) => ep.tags.includes(tag))
}

export function sortEndpoints(endpoints: MockEndpoint[], option: EndpointSortOption): MockEndpoint[] {
  const copy = [...endpoints]
  switch (option) {
    case 'newest':
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    case 'oldest':
      return copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    case 'path-asc':
      return copy.sort((a, b) => a.path.localeCompare(b.path))
    case 'method-order':
      return copy.sort((a, b) => METHOD_ORDER.indexOf(a.method) - METHOD_ORDER.indexOf(b.method))
    case 'status-asc':
      return copy.sort((a, b) => a.statusCode - b.statusCode)
    default:
      return copy
  }
}

export function applyAllFilters(
  endpoints: MockEndpoint[],
  query: string,
  method: HttpMethod | 'All',
  statusGroup: StatusGroup,
  tag: string,
  sortOption: EndpointSortOption
): MockEndpoint[] {
  let result = searchEndpoints(endpoints, query)
  result = filterByMethod(result, method)
  result = filterByStatusGroup(result, statusGroup)
  result = filterByTag(result, tag)
  result = sortEndpoints(result, sortOption)
  return result
}

export function getAllTags(endpoints: MockEndpoint[]): string[] {
  const tagSet = new Set<string>()
  endpoints.forEach((ep) => ep.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}
