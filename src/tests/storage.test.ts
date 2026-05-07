import { describe, it, expect, beforeEach } from 'vitest'
import { loadData, saveData, exportData, importData } from '../utils/storage'
import { MockMateData } from '../types'

const STORAGE_KEY = 'mockmate-data-v1'

const validData: MockMateData = {
  endpoints: [
    {
      id: 'ep-1',
      name: 'Test',
      method: 'GET',
      path: '/api/test',
      statusCode: 200,
      delayMs: 100,
      description: 'desc',
      responseBody: '{}',
      tags: ['test'],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ],
  preferences: {
    searchQuery: '',
    selectedMethod: 'All',
    selectedStatusGroup: 'All',
    selectedTag: 'All',
    sortOption: 'newest',
  },
}

describe('loadData', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial endpoints when storage is empty', () => {
    const result = loadData(validData.endpoints)
    expect(result.endpoints).toHaveLength(1)
  })

  it('falls back to default when localStorage has invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json')
    const result = loadData([])
    expect(result.endpoints).toHaveLength(0)
  })

  it('loads valid data from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validData))
    const result = loadData([])
    expect(result.endpoints).toHaveLength(1)
    expect(result.endpoints[0].id).toBe('ep-1')
  })

  it('filters out invalid endpoint records', () => {
    const bad = { ...validData, endpoints: [{ id: 'bad' }] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bad))
    const result = loadData([])
    expect(result.endpoints).toHaveLength(0)
  })
})

describe('exportData', () => {
  it('produces valid JSON string', () => {
    const json = exportData(validData)
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it('includes endpoints in exported JSON', () => {
    const json = exportData(validData)
    const parsed = JSON.parse(json) as MockMateData
    expect(parsed.endpoints).toHaveLength(1)
    expect(parsed.endpoints[0].id).toBe('ep-1')
  })
})

describe('importData', () => {
  it('accepts valid JSON', () => {
    const result = importData(JSON.stringify(validData))
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.endpoints).toHaveLength(1)
    }
  })

  it('rejects invalid JSON', () => {
    const result = importData('{invalid json}')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBeDefined()
    }
  })

  it('ignores invalid endpoint records during import', () => {
    const withBadRecord = { ...validData, endpoints: [{ id: 'broken' }] }
    const result = importData(JSON.stringify(withBadRecord))
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.endpoints).toHaveLength(0)
    }
  })

  it('handles missing endpoints array gracefully', () => {
    const result = importData(JSON.stringify({ preferences: {} }))
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.endpoints).toHaveLength(0)
    }
  })
})

describe('saveData', () => {
  it('saves data to localStorage without throwing', () => {
    expect(() => saveData(validData)).not.toThrow()
  })

  it('saves data that can be retrieved', () => {
    saveData(validData)
    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!) as MockMateData
    expect(parsed.endpoints).toHaveLength(1)
  })
})
