import { JsonValidationResult } from '../types'

export function safeParseJson(str: string): JsonValidationResult {
  const trimmed = str.trim()
  if (!trimmed) {
    return { valid: true, parsed: {} }
  }
  try {
    const parsed = JSON.parse(trimmed)
    return { valid: true, parsed }
  } catch (err) {
    const message = err instanceof SyntaxError ? err.message : 'Unknown parse error'
    return { valid: false, error: `Invalid JSON. Please check brackets, commas, or quotes. (${message})` }
  }
}

export function isValidJson(str: string): boolean {
  const trimmed = str.trim()
  if (!trimmed) return true
  try {
    JSON.parse(trimmed)
    return true
  } catch {
    return false
  }
}

export function formatJson(str: string): string {
  const trimmed = str.trim()
  if (!trimmed) return '{}'
  try {
    const parsed = JSON.parse(trimmed)
    return JSON.stringify(parsed, null, 2)
  } catch {
    return str
  }
}

export function normalizeJsonBody(str: string): string {
  const trimmed = str.trim()
  if (!trimmed) return '{}'
  if (!isValidJson(trimmed)) return trimmed
  return formatJson(trimmed)
}
