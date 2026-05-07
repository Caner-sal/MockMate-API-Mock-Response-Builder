import { HttpMethod, StatusGroup } from '../types'

const HTTP_METHODS: (HttpMethod | 'All')[] = ['All', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
const STATUS_GROUPS: StatusGroup[] = ['All', '2xx', '4xx', '5xx']

interface FilterPanelProps {
  selectedMethod: HttpMethod | 'All'
  onMethodChange: (method: HttpMethod | 'All') => void
  selectedStatusGroup: StatusGroup
  onStatusGroupChange: (group: StatusGroup) => void
  selectedTag: string
  onTagChange: (tag: string) => void
  availableTags: string[]
}

export function FilterPanel({
  selectedMethod,
  onMethodChange,
  selectedStatusGroup,
  onStatusGroupChange,
  selectedTag,
  onTagChange,
  availableTags,
}: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label className="filter-label">Method</label>
        <div className="filter-chips">
          {HTTP_METHODS.map((m) => (
            <button
              key={m}
              className={`chip chip-method chip-${m.toLowerCase()} ${selectedMethod === m ? 'chip-active' : ''}`}
              onClick={() => onMethodChange(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Status</label>
        <div className="filter-chips">
          {STATUS_GROUPS.map((g) => (
            <button
              key={g}
              className={`chip chip-status ${selectedStatusGroup === g ? 'chip-active' : ''}`}
              onClick={() => onStatusGroupChange(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {availableTags.length > 0 && (
        <div className="filter-group">
          <label className="filter-label" htmlFor="tag-filter">
            Tag
          </label>
          <select
            id="tag-filter"
            className="select-control"
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
          >
            <option value="All">All Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
