import { MockMateData, MockMatePreferences, MockEndpoint } from '../types'

const STORAGE_KEY = 'mockmate-data-v1'

const DEFAULT_PREFERENCES: MockMatePreferences = {
  searchQuery: '',
  selectedMethod: 'All',
  selectedStatusGroup: 'All',
  selectedTag: 'All',
  sortOption: 'newest',
}

const DEFAULT_DATA: MockMateData = {
  endpoints: [],
  preferences: DEFAULT_PREFERENCES,
}

function isValidEndpoint(ep: unknown): ep is MockEndpoint {
  if (!ep || typeof ep !== 'object') return false
  const e = ep as Record<string, unknown>
  return (
    typeof e.id === 'string' &&
    typeof e.name === 'string' &&
    typeof e.method === 'string' &&
    typeof e.path === 'string' &&
    typeof e.statusCode === 'number' &&
    typeof e.delayMs === 'number' &&
    typeof e.description === 'string' &&
    typeof e.responseBody === 'string' &&
    Array.isArray(e.tags) &&
    typeof e.createdAt === 'string' &&
    typeof e.updatedAt === 'string'
  )
}

function sanitizeEndpoint(ep: unknown): MockEndpoint | null {
  if (!isValidEndpoint(ep)) return null
  return ep
}

export function loadData(initialEndpoints: MockEndpoint[] = []): MockMateData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { endpoints: initialEndpoints, preferences: DEFAULT_PREFERENCES }
    }
    const parsed = JSON.parse(raw) as Partial<MockMateData>
    const endpoints = Array.isArray(parsed.endpoints)
      ? (parsed.endpoints.map(sanitizeEndpoint).filter(Boolean) as MockEndpoint[])
      : initialEndpoints
    const preferences: MockMatePreferences = {
      ...DEFAULT_PREFERENCES,
      ...(parsed.preferences ?? {}),
    }
    return { endpoints, preferences }
  } catch {
    return { endpoints: initialEndpoints, preferences: DEFAULT_PREFERENCES }
  }
}

export function saveData(data: MockMateData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded)
  }
}

export function exportData(data: MockMateData): string {
  return JSON.stringify(data, null, 2)
}

export function importData(jsonStr: string): { success: true; data: MockMateData } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(jsonStr) as Partial<MockMateData>
    const endpoints = Array.isArray(parsed.endpoints)
      ? (parsed.endpoints.map(sanitizeEndpoint).filter(Boolean) as MockEndpoint[])
      : []
    const preferences: MockMatePreferences = {
      ...DEFAULT_PREFERENCES,
      ...(parsed.preferences ?? {}),
    }
    return { success: true, data: { endpoints, preferences } }
  } catch {
    return { success: false, error: 'Invalid JSON. Please check the file and try again.' }
  }
}

export { DEFAULT_DATA, DEFAULT_PREFERENCES }
