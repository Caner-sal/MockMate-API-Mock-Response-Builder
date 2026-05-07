import { describe, it, expect } from 'vitest'
import { safeParseJson, isValidJson, formatJson, normalizeJsonBody } from '../utils/json'

describe('safeParseJson', () => {
  it('accepts valid JSON object', () => {
    const result = safeParseJson('{"id":1}')
    expect(result.valid).toBe(true)
    expect(result.parsed).toEqual({ id: 1 })
  })

  it('accepts valid JSON array', () => {
    const result = safeParseJson('[1,2,3]')
    expect(result.valid).toBe(true)
  })

  it('returns valid:false for invalid JSON', () => {
    const result = safeParseJson('{bad json}')
    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('returns valid:true with empty object for empty string', () => {
    const result = safeParseJson('')
    expect(result.valid).toBe(true)
    expect(result.parsed).toEqual({})
  })

  it('does not throw on invalid input', () => {
    expect(() => safeParseJson('not json at all!!!')).not.toThrow()
  })
})

describe('isValidJson', () => {
  it('returns true for valid JSON', () => {
    expect(isValidJson('{"a":1}')).toBe(true)
  })

  it('returns false for invalid JSON', () => {
    expect(isValidJson('{a:1}')).toBe(false)
  })

  it('returns true for empty string', () => {
    expect(isValidJson('')).toBe(true)
  })
})

describe('formatJson', () => {
  it('pretty prints valid JSON', () => {
    const result = formatJson('{"a":1,"b":2}')
    expect(result).toContain('\n')
    expect(result).toContain('"a": 1')
  })

  it('returns {} for empty input', () => {
    expect(formatJson('')).toBe('{}')
  })

  it('returns original string for invalid JSON', () => {
    const bad = '{bad}'
    expect(formatJson(bad)).toBe(bad)
  })
})

describe('normalizeJsonBody', () => {
  it('returns {} for empty input', () => {
    expect(normalizeJsonBody('')).toBe('{}')
  })

  it('formats valid JSON', () => {
    const result = normalizeJsonBody('{"x":1}')
    expect(result).toContain('"x": 1')
  })

  it('returns original string for invalid JSON unchanged', () => {
    const bad = '{invalid}'
    expect(normalizeJsonBody(bad)).toBe(bad)
  })
})
