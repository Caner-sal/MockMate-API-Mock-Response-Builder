import { describe, it, expect } from 'vitest'
import { MockEndpoint } from '../types'
import {
  searchEndpoints,
  filterByMethod,
  filterByStatusGroup,
  filterByTag,
  sortEndpoints,
} from '../utils/endpointFilters'

const makeEndpoint = (overrides: Partial<MockEndpoint> = {}): MockEndpoint => ({
  id: 'test-1',
  name: 'Test Endpoint',
  method: 'GET',
  path: '/api/test',
  statusCode: 200,
  delayMs: 100,
  description: 'A test endpoint',
  responseBody: '{}',
  tags: ['test'],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

const endpoints: MockEndpoint[] = [
  makeEndpoint({ id: '1', name: 'Get User', method: 'GET', path: '/api/users', statusCode: 200, tags: ['user'] }),
  makeEndpoint({ id: '2', name: 'Create Post', method: 'POST', path: '/api/posts', statusCode: 201, tags: ['post'] }),
  makeEndpoint({ id: '3', name: 'Delete Order', method: 'DELETE', path: '/api/orders', statusCode: 200, tags: ['order'] }),
  makeEndpoint({ id: '4', name: 'Auth Error', method: 'GET', path: '/api/auth', statusCode: 401, tags: ['auth', 'error'] }),
  makeEndpoint({ id: '5', name: 'Server Error', method: 'POST', path: '/api/fail', statusCode: 500, tags: ['error'] }),
  makeEndpoint({
    id: '6', name: 'Oldest', method: 'PUT', path: '/api/z-last', statusCode: 200, tags: ['misc'],
    createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z',
  }),
]

describe('searchEndpoints', () => {
  it('returns all endpoints when query is empty', () => {
    expect(searchEndpoints(endpoints, '')).toHaveLength(endpoints.length)
  })

  it('searches by endpoint name (case-insensitive)', () => {
    const result = searchEndpoints(endpoints, 'get user')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('searches by tag', () => {
    const result = searchEndpoints(endpoints, 'error')
    expect(result.length).toBeGreaterThanOrEqual(2)
    expect(result.some((e) => e.tags.includes('error'))).toBe(true)
  })

  it('searches by path', () => {
    const result = searchEndpoints(endpoints, '/api/posts')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('returns empty array when no match', () => {
    expect(searchEndpoints(endpoints, 'xyznonexistent')).toHaveLength(0)
  })
})

describe('filterByMethod', () => {
  it('returns all when method is All', () => {
    expect(filterByMethod(endpoints, 'All')).toHaveLength(endpoints.length)
  })

  it('filters by GET', () => {
    const result = filterByMethod(endpoints, 'GET')
    expect(result.every((e) => e.method === 'GET')).toBe(true)
  })

  it('filters by POST', () => {
    const result = filterByMethod(endpoints, 'POST')
    expect(result.every((e) => e.method === 'POST')).toBe(true)
    expect(result).toHaveLength(2)
  })
})

describe('filterByStatusGroup', () => {
  it('returns all for All group', () => {
    expect(filterByStatusGroup(endpoints, 'All')).toHaveLength(endpoints.length)
  })

  it('filters 2xx', () => {
    const result = filterByStatusGroup(endpoints, '2xx')
    expect(result.every((e) => e.statusCode >= 200 && e.statusCode < 300)).toBe(true)
  })

  it('filters 4xx', () => {
    const result = filterByStatusGroup(endpoints, '4xx')
    expect(result.every((e) => e.statusCode >= 400 && e.statusCode < 500)).toBe(true)
    expect(result).toHaveLength(1)
  })

  it('filters 5xx', () => {
    const result = filterByStatusGroup(endpoints, '5xx')
    expect(result.every((e) => e.statusCode >= 500)).toBe(true)
    expect(result).toHaveLength(1)
  })
})

describe('filterByTag', () => {
  it('returns all when tag is All', () => {
    expect(filterByTag(endpoints, 'All')).toHaveLength(endpoints.length)
  })

  it('filters by specific tag', () => {
    const result = filterByTag(endpoints, 'user')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
})

describe('sortEndpoints', () => {
  it('sorts by path A-Z', () => {
    const result = sortEndpoints(endpoints, 'path-asc')
    const paths = result.map((e) => e.path)
    expect(paths).toEqual([...paths].sort())
  })

  it('sorts newest first', () => {
    const result = sortEndpoints(endpoints, 'newest')
    expect(result[result.length - 1].id).toBe('6')
  })

  it('sorts oldest first', () => {
    const result = sortEndpoints(endpoints, 'oldest')
    expect(result[0].id).toBe('6')
  })

  it('sorts by status ascending', () => {
    const result = sortEndpoints(endpoints, 'status-asc')
    for (let i = 1; i < result.length; i++) {
      expect(result[i].statusCode).toBeGreaterThanOrEqual(result[i - 1].statusCode)
    }
  })
})
