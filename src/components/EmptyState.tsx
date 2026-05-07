interface EmptyStateProps {
  hasFilters: boolean
  onClearFilters: () => void
  onAdd: () => void
}

export function EmptyState({ hasFilters, onClearFilters, onAdd }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📭</div>
      <h3 className="empty-state-title">No mock endpoints found</h3>
      {hasFilters ? (
        <>
          <p className="empty-state-desc">No endpoints match your current filters.</p>
          <button className="btn btn-secondary" onClick={onClearFilters}>
            Clear Filters
          </button>
        </>
      ) : (
        <>
          <p className="empty-state-desc">Create your first mock endpoint to get started.</p>
          <button className="btn btn-primary" onClick={onAdd}>
            + Add Endpoint
          </button>
        </>
      )}
    </div>
  )
}
