import { MockEndpoint } from '../types'
import { EndpointCard } from './EndpointCard'
import { EmptyState } from './EmptyState'

interface EndpointListProps {
  endpoints: MockEndpoint[]
  selectedId: string | null
  hasFilters: boolean
  onSelect: (endpoint: MockEndpoint) => void
  onEdit: (endpoint: MockEndpoint) => void
  onDuplicate: (endpoint: MockEndpoint) => void
  onDelete: (id: string) => void
  onClearFilters: () => void
  onAdd: () => void
}

export function EndpointList({
  endpoints,
  selectedId,
  hasFilters,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
  onClearFilters,
  onAdd,
}: EndpointListProps) {
  if (endpoints.length === 0) {
    return <EmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} onAdd={onAdd} />
  }

  return (
    <div className="endpoint-list">
      {endpoints.map((ep) => (
        <EndpointCard
          key={ep.id}
          endpoint={ep}
          isSelected={selectedId === ep.id}
          onSelect={onSelect}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
