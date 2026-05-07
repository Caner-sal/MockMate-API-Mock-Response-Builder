import { describe, it, expect } from 'vitest'
import { MockEndpoint } from '../types'
import {
  getTotalCount,
  getMethodCount,
  getSuccessCount,
  getErrorCount,
  getMostUsedTag,
} from '../utils/endpointStats'

const makeEndpoint = (overrides: Partial<MockEndpoint> = {}): MockEndpoint => ({
  id: 'test',
  name: 'Test',
  method: 'GET',
  path: '/test',
  statusCode: 200,
  delayMs: 0,
  description: '',
  responseBody: '{}',
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

const endpoints: MockEndpoint[] = [
  makeEndpoint({ id: '1', method: 'GET', statusCode: 200, tags: ['user', 'auth'] }),
  makeEndpoint({ id: '2', method: 'GET', statusCode: 201, tags: ['user'] }),
  makeEndpoint({ id: '3', method: 'POST', statusCode: 201, tags: ['post'] }),
  makeEndpoint({ id: '4', method: 'POST', statusCode: 400, tags: ['error'] }),
  makeEndpoint({ id: '5', method: 'DELETE', statusCode: 404, tags: ['error'] }),
  makeEndpoint({ id: '6', method: 'PUT', statusCode: 500, tags: ['error'] }),
]

describe('getTotalCount', () => {
  it('returns total number of endpoints', () => {
    expect(getTotalCount(endpoints)).toBe(6)
  })

  it('returns 0 for empty list', () => {
    expect(getTotalCount([])).toBe(0)
  })
})

describe('getMethodCount', () => {
  it('counts GET endpoints', () => {
    expect(getMethodCount(endpoints, 'GET')).toBe(2)
  })

  it('counts POST endpoints', () => {
    expect(getMethodCount(endpoints, 'POST')).toBe(2)
  })

  it('counts DELETE endpoints', () => {
    expect(getMethodCount(endpoints, 'DELETE')).toBe(1)
  })

  it('returns 0 for PATCH when none exist', () => {
    expect(getMethodCount(endpoints, 'PATCH')).toBe(0)
  })
})

describe('getSuccessCount', () => {
  it('counts 2xx responses', () => {
    expect(getSuccessCount(endpoints)).toBe(3)
  })

  it('returns 0 for empty list', () => {
    expect(getSuccessCount([])).toBe(0)
  })
})

describe('getErrorCount', () => {
  it('counts 4xx and 5xx responses', () => {
    expect(getErrorCount(endpoints)).toBe(3)
  })

  it('returns 0 for empty list', () => {
    expect(getErrorCount([])).toBe(0)
  })
})

describe('getMostUsedTag', () => {
  it('returns the most frequent tag', () => {
    expect(getMostUsedTag(endpoints)).toBe('error')
  })

  it('returns — for empty list', () => {
    expect(getMostUsedTag([])).toBe('—')
  })

  it('returns — when no endpoints have tags', () => {
    const noTags = [makeEndpoint({ tags: [] })]
    expect(getMostUsedTag(noTags)).toBe('—')
  })
})
