import { useState } from 'react'
import { MockMateData } from '../types'
import { exportData, importData } from '../utils/storage'

interface ImportExportPanelProps {
  data: MockMateData
  onImport: (data: MockMateData) => void
}

export function ImportExportPanel({ data, onImport }: ImportExportPanelProps) {
  const [importText, setImportText] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showImport, setShowImport] = useState(false)

  function handleExport() {
    const json = exportData(data)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mockmate-export.json'
    a.click()
    URL.revokeObjectURL(url)
    setMessage({ type: 'success', text: 'Exported successfully.' })
    setTimeout(() => setMessage(null), 3000)
  }

  function handleImport() {
    const result = importData(importText)
    if (result.success) {
      onImport(result.data)
      setImportText('')
      setShowImport(false)
      setMessage({ type: 'success', text: `Imported ${result.data.endpoints.length} endpoint(s).` })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
    setTimeout(() => setMessage(null), 4000)
  }

  return (
    <div className="import-export-panel">
      <div className="ie-actions">
        <button className="btn btn-secondary" onClick={handleExport}>
          ⬇ Export JSON
        </button>
        <button className="btn btn-secondary" onClick={() => setShowImport((v) => !v)}>
          ⬆ Import JSON
        </button>
      </div>

      {message && (
        <div className={`ie-message ie-message-${message.type}`}>{message.text}</div>
      )}

      {showImport && (
        <div className="import-area">
          <textarea
            className="json-textarea"
            rows={6}
            placeholder='Paste exported JSON here…'
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            spellCheck={false}
          />
          <div className="import-actions">
            <button className="btn btn-secondary" onClick={() => { setShowImport(false); setImportText('') }}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleImport} disabled={!importText.trim()}>
              Import
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
