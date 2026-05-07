import { useState, useEffect } from 'react'
import { MockEndpoint, HttpMethod } from '../types'
import { safeParseJson, formatJson } from '../utils/json'
import { nowIso } from '../utils/date'

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
const STATUS_CODE_OPTIONS = [200, 201, 204, 400, 401, 403, 404, 409, 422, 500, 502, 503]

interface EndpointFormProps {
  editTarget: MockEndpoint | null
  onSave: (endpoint: MockEndpoint) => void
  onCancel: () => void
}

function generateId(): string {
  return `ep-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

const EMPTY_FORM = {
  name: '',
  method: 'GET' as HttpMethod,
  path: '/api/',
  statusCode: 200,
  delayMs: 300,
  description: '',
  responseBody: '{}',
  tags: '',
}

export function EndpointForm({ editTarget, onSave, onCancel }: EndpointFormProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [jsonError, setJsonError] = useState('')

  useEffect(() => {
    if (editTarget) {
      setForm({
        name: editTarget.name,
        method: editTarget.method,
        path: editTarget.path,
        statusCode: editTarget.statusCode,
        delayMs: editTarget.delayMs,
        description: editTarget.description,
        responseBody: editTarget.responseBody,
        tags: editTarget.tags.join(', '),
      })
    } else {
      setForm({ ...EMPTY_FORM })
    }
    setJsonError('')
  }, [editTarget])

  function set<K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (key === 'responseBody') setJsonError('')
  }

  function handleFormatJson() {
    const result = safeParseJson(form.responseBody)
    if (result.valid) {
      setForm((prev) => ({ ...prev, responseBody: formatJson(prev.responseBody) }))
      setJsonError('')
    } else {
      setJsonError(result.error ?? 'Invalid JSON')
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validation
    if (!form.name.trim()) return
    if (!form.path.startsWith('/')) {
      setJsonError('Path must start with /.')
      return
    }
    if (form.statusCode < 100 || form.statusCode > 599) {
      setJsonError('Status code must be between 100 and 599.')
      return
    }
    if (form.delayMs < 0) {
      setJsonError('Delay cannot be negative.')
      return
    }

    const jsonResult = safeParseJson(form.responseBody)
    if (!jsonResult.valid) {
      setJsonError(jsonResult.error ?? 'Invalid JSON')
      return
    }

    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const now = nowIso()

    const endpoint: MockEndpoint = editTarget
      ? { ...editTarget, ...form, tags, updatedAt: now, responseBody: formatJson(form.responseBody) }
      : {
          id: generateId(),
          name: form.name.trim(),
          method: form.method,
          path: form.path.trim(),
          statusCode: form.statusCode,
          delayMs: form.delayMs,
          description: form.description.trim(),
          responseBody: formatJson(form.responseBody),
          tags,
          createdAt: now,
          updatedAt: now,
        }

    onSave(endpoint)
  }

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2 className="form-title">{editTarget ? 'Edit Endpoint' : 'New Endpoint'}</h2>
          <button className="btn-close" onClick={onCancel} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="endpoint-form">
          <div className="form-row form-row-2">
            <div className="form-field">
              <label htmlFor="ep-name">Name *</label>
              <input
                id="ep-name"
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Get User Profile"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="ep-method">Method</label>
              <select
                id="ep-method"
                value={form.method}
                onChange={(e) => set('method', e.target.value as HttpMethod)}
              >
                {HTTP_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row form-row-2">
            <div className="form-field">
              <label htmlFor="ep-path">Path *</label>
              <input
                id="ep-path"
                type="text"
                value={form.path}
                onChange={(e) => set('path', e.target.value)}
                placeholder="/api/resource"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="ep-status">Status Code</label>
              <select
                id="ep-status"
                value={form.statusCode}
                onChange={(e) => set('statusCode', Number(e.target.value))}
              >
                {STATUS_CODE_OPTIONS.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row form-row-2">
            <div className="form-field">
              <label htmlFor="ep-delay">Delay (ms)</label>
              <input
                id="ep-delay"
                type="number"
                min={0}
                value={form.delayMs}
                onChange={(e) => set('delayMs', Number(e.target.value))}
              />
            </div>

            <div className="form-field">
              <label htmlFor="ep-tags">Tags (comma separated)</label>
              <input
                id="ep-tags"
                type="text"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="user, auth, profile"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="ep-desc">Description</label>
            <input
              id="ep-desc"
              type="text"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Briefly describe what this endpoint does"
            />
          </div>

          <div className="form-field">
            <div className="field-label-row">
              <label htmlFor="ep-body">Response Body (JSON)</label>
              <button type="button" className="btn-format" onClick={handleFormatJson}>
                Format JSON
              </button>
            </div>
            <textarea
              id="ep-body"
              className={`json-textarea ${jsonError ? 'json-textarea-error' : ''}`}
              value={form.responseBody}
              onChange={(e) => set('responseBody', e.target.value)}
              rows={8}
              spellCheck={false}
            />
            {jsonError && <span className="json-error">{jsonError}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editTarget ? 'Save Changes' : 'Create Endpoint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
