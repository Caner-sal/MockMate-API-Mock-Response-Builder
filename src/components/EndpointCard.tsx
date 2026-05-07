import { MockEndpoint } from '../types'
import { formatDate } from '../utils/date'

interface EndpointCardProps {
  endpoint: MockEndpoint
  isSelected: boolean
  onSelect: (endpoint: MockEndpoint) => void
  onEdit: (endpoint: MockEndpoint) => void
  onDuplicate: (endpoint: MockEndpoint) => void
  onDelete: (id: string) => void
}

export function EndpointCard({
  endpoint,
  isSelected,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
}: EndpointCardProps) {
  return (
    <div
      className={`endpoint-card ${isSelected ? 'endpoint-card-selected' : ''}`}
      onClick={() => onSelect(endpoint)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(endpoint)}
    >
      <div className="card-header">
        <span className={`method-badge method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
        <span className="card-path">{endpoint.path}</span>
        <span className={`status-badge status-${Math.floor(endpoint.statusCode / 100)}xx`}>
          {endpoint.statusCode}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-name">{endpoint.name}</h3>
        {endpoint.description && <p className="card-desc">{endpoint.description}</p>}
        <div className="card-meta">
          <span className="card-delay">⏱ {endpoint.delayMs}ms</span>
          {endpoint.tags.length > 0 && (
            <div className="card-tags">
              {endpoint.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="card-date">Updated {formatDate(endpoint.updatedAt)}</div>
      </div>

      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        <button className="btn-icon btn-preview" title="Preview" onClick={() => onSelect(endpoint)}>
          👁
        </button>
        <button className="btn-icon btn-edit" title="Edit" onClick={() => onEdit(endpoint)}>
          ✏️
        </button>
        <button className="btn-icon btn-duplicate" title="Duplicate" onClick={() => onDuplicate(endpoint)}>
          📋
        </button>
        <button
          className="btn-icon btn-delete"
          title="Delete"
          onClick={() => {
            if (confirm(`Delete "${endpoint.name}"?`)) onDelete(endpoint.id)
          }}
        >
          🗑
        </button>
      </div>
    </div>
  )
}
