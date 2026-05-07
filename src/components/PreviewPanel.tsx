import { MockEndpoint } from '../types'
import { MockRequestResult } from '../types'
import { formatJson } from '../utils/json'

interface PreviewPanelProps {
  endpoint: MockEndpoint | null
  requestResult: MockRequestResult
  onSendRequest: (endpoint: MockEndpoint) => void
  onClose: () => void
}

function getStatusText(code: number): string {
  const texts: Record<number, string> = {
    200: 'OK', 201: 'Created', 204: 'No Content',
    400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
    404: 'Not Found', 409: 'Conflict', 422: 'Unprocessable Entity',
    500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable',
  }
  return texts[code] ?? ''
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Clipboard API unavailable
  }
}

export function PreviewPanel({ endpoint, requestResult, onSendRequest, onClose }: PreviewPanelProps) {
  if (!endpoint) {
    return (
      <div className="preview-panel preview-panel-empty">
        <p className="preview-hint">Select an endpoint to preview its response.</p>
      </div>
    )
  }

  const prettyBody = formatJson(endpoint.responseBody)

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <div className="preview-title-row">
          <span className={`method-badge method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
          <span className="preview-path">{endpoint.path}</span>
        </div>
        <button className="btn-close-preview" onClick={onClose} aria-label="Close preview">
          ✕
        </button>
      </div>

      <div className="preview-meta">
        <span className={`status-badge status-${Math.floor(endpoint.statusCode / 100)}xx`}>
          {endpoint.statusCode} {getStatusText(endpoint.statusCode)}
        </span>
        <span className="preview-delay">⏱ {endpoint.delayMs}ms delay</span>
      </div>

      {endpoint.description && <p className="preview-desc">{endpoint.description}</p>}

      <div className="preview-section">
        <div className="preview-section-header">
          <span className="preview-section-title">Response Body</span>
          <button
            className="btn btn-xs btn-secondary"
            onClick={() => copyToClipboard(prettyBody)}
            title="Copy response"
          >
            Copy
          </button>
        </div>
        <pre className="json-preview">{prettyBody}</pre>
      </div>

      <div className="preview-section">
        <button
          className="btn btn-primary btn-full"
          onClick={() => onSendRequest(endpoint)}
          disabled={requestResult.loading}
        >
          {requestResult.loading ? 'Sending…' : 'Send Mock Request'}
        </button>

        {requestResult.loading && (
          <div className="mock-loading">
            <div className="spinner" />
            <span>Simulating request ({endpoint.delayMs}ms)…</span>
          </div>
        )}

        {!requestResult.loading && requestResult.response !== null && (
          <div className="mock-result">
            <div className="mock-result-header">
              <span className={`status-badge status-${Math.floor((requestResult.statusCode ?? 200) / 100)}xx`}>
                {requestResult.statusCode} {getStatusText(requestResult.statusCode ?? 200)}
              </span>
              <span className="mock-elapsed">{requestResult.elapsedMs}ms</span>
              <button
                className="btn btn-xs btn-secondary"
                onClick={() => copyToClipboard(requestResult.response ?? '')}
              >
                Copy
              </button>
            </div>
            <pre className="json-preview">{requestResult.response}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
