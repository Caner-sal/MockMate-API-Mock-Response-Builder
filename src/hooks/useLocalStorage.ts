import { useState, useEffect } from 'react'
import { MockMateData } from '../types'
import { loadData, saveData } from '../utils/storage'
import { sampleEndpoints } from '../data/sampleEndpoints'

export function useLocalStorage() {
  const [data, setData] = useState<MockMateData>(() => loadData(sampleEndpoints))

  useEffect(() => {
    saveData(data)
  }, [data])

  return { data, setData }
}
