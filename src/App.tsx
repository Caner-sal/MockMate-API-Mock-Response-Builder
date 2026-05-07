import { useState, useCallback } from 'react'
import { MockEndpoint, MockMatePreferences } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useEndpointFilters } from './hooks/useEndpointFilters'
import { useMockRequest } from './hooks/useMockRequest'
import { nowIso } from './utils/date'
import { getAllTags } from './utils/endpointFilters'
import { Dashboard } from './components/Dashboard'
import { SearchBar } from './components/SearchBar'
import { FilterPanel } from './components/FilterPanel'
import { SortSelect } from './components/SortSelect'
import { EndpointList } from './components/EndpointList'
import { EndpointForm } from './components/EndpointForm'
import { PreviewPanel } from './components/PreviewPanel'
import { ImportExportPanel } from './components/ImportExportPanel'

export default function App() {
  const { data, setData } = useLocalStorage()
  const { endpoints, preferences } = data

  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState<MockEndpoint | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { result: requestResult, sendMockRequest, reset: resetRequest } = useMockRequest()

  const filteredEndpoints = useEndpointFilters(endpoints, preferences)
  const availableTags = getAllTags(endpoints)
  const selectedEndpoint = endpoints.find((ep) => ep.id === selectedId) ?? null

  const hasFilters =
    preferences.searchQuery !== '' ||
    preferences.selectedMethod !== 'All' ||
    preferences.selectedStatusGroup !== 'All' ||
    preferences.selectedTag !== 'All'

  function updatePreferences(patch: Partial<MockMatePreferences>) {
    setData((prev) => ({ ...prev, preferences: { ...prev.preferences, ...patch } }))
  }

  function clearFilters() {
    updatePreferences({
      searchQuery: '',
      selectedMethod: 'All',
      selectedStatusGroup: 'All',
      selectedTag: 'All',
    })
  }

  const handleSave = useCallback(
    (endpoint: MockEndpoint) => {
      setData((prev) => {
        const exists = prev.endpoints.find((ep) => ep.id === endpoint.id)
        const updated = exists
          ? prev.endpoints.map((ep) => (ep.id === endpoint.id ? endpoint : ep))
          : [endpoint, ...prev.endpoints]
        return { ...prev, endpoints: updated }
      })
      setShowForm(false)
      setEditTarget(null)
      setSelectedId(endpoint.id)
    },
    [setData]
  )

  function handleEdit(endpoint: MockEndpoint) {
    setEditTarget(endpoint)
    setShowForm(true)
  }

  function handleDuplicate(endpoint: MockEndpoint) {
    const now = nowIso()
    const copy: MockEndpoint = {
      ...endpoint,
      id: `ep-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: `${endpoint.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
    }
    setData((prev) => ({ ...prev, endpoints: [copy, ...prev.endpoints] }))
  }

  function handleDelete(id: string) {
    setData((prev) => ({ ...prev, endpoints: prev.endpoints.filter((ep) => ep.id !== id) }))
    if (selectedId === id) {
      setSelectedId(null)
      resetRequest()
    }
  }

  function handleSelect(endpoint: MockEndpoint) {
    setSelectedId(endpoint.id)
    resetRequest()
  }

  function handleClosePreview() {
    setSelectedId(null)
    resetRequest()
  }

  function handleOpenAdd() {
    setEditTarget(null)
    setShowForm(true)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">MockMate</span>
          <span className="brand-sub">API Mock Response Builder</span>
        </div>
        <div className="header-actions">
          <ImportExportPanel
            data={data}
            onImport={(importedData) => {
              setData(importedData)
              setSelectedId(null)
              resetRequest()
            }}
          />
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            + New Endpoint
          </button>
        </div>
      </header>

      <main className="app-main">
        <Dashboard endpoints={endpoints} />

        <div className="controls-bar">
          <SearchBar
            value={preferences.searchQuery}
            onChange={(q) => updatePreferences({ searchQuery: q })}
          />
          <SortSelect
            value={preferences.sortOption}
            onChange={(s) => updatePreferences({ sortOption: s })}
          />
        </div>

        <FilterPanel
          selectedMethod={preferences.selectedMethod}
          onMethodChange={(m) => updatePreferences({ selectedMethod: m })}
          selectedStatusGroup={preferences.selectedStatusGroup}
          onStatusGroupChange={(g) => updatePreferences({ selectedStatusGroup: g })}
          selectedTag={preferences.selectedTag}
          onTagChange={(t) => updatePreferences({ selectedTag: t })}
          availableTags={availableTags}
        />

        <div className="content-grid">
          <section className="list-section">
            <div className="list-header">
              <h2 className="section-title">
                Endpoints{' '}
                <span className="endpoint-count">{filteredEndpoints.length}</span>
              </h2>
            </div>
            <EndpointList
              endpoints={filteredEndpoints}
              selectedId={selectedId}
              hasFilters={hasFilters}
              onSelect={handleSelect}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onClearFilters={clearFilters}
              onAdd={handleOpenAdd}
            />
          </section>

          <aside className="preview-section">
            <PreviewPanel
              endpoint={selectedEndpoint}
              requestResult={requestResult}
              onSendRequest={sendMockRequest}
              onClose={handleClosePreview}
            />
          </aside>
        </div>
      </main>

      {showForm && (
        <EndpointForm
          editTarget={editTarget}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditTarget(null)
          }}
        />
      )}
    </div>
  )
}
