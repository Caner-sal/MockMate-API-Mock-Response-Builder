export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type StatusGroup = 'All' | '2xx' | '4xx' | '5xx'

export type EndpointSortOption =
  | 'newest'
  | 'oldest'
  | 'path-asc'
  | 'method-order'
  | 'status-asc'

export interface MockEndpoint {
  id: string
  name: string
  method: HttpMethod
  path: string
  statusCode: number
  delayMs: number
  description: string
  responseBody: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface MockMatePreferences {
  searchQuery: string
  selectedMethod: HttpMethod | 'All'
  selectedStatusGroup: StatusGroup
  selectedTag: string
  sortOption: EndpointSortOption
}

export interface MockMateData {
  endpoints: MockEndpoint[]
  preferences: MockMatePreferences
}

export interface JsonValidationResult {
  valid: boolean
  error?: string
  parsed?: unknown
}

export interface MockRequestResult {
  loading: boolean
  response: string | null
  statusCode: number | null
  elapsedMs: number | null
}
