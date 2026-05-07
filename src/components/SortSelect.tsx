import { EndpointSortOption } from '../types'

interface SortSelectProps {
  value: EndpointSortOption
  onChange: (value: EndpointSortOption) => void
}

const SORT_OPTIONS: { value: EndpointSortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'path-asc', label: 'Path A–Z' },
  { value: 'method-order', label: 'Method Order' },
  { value: 'status-asc', label: 'Status Code ↑' },
]

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="sort-select-wrapper">
      <label className="filter-label" htmlFor="sort-select">
        Sort
      </label>
      <select
        id="sort-select"
        className="select-control"
        value={value}
        onChange={(e) => onChange(e.target.value as EndpointSortOption)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
