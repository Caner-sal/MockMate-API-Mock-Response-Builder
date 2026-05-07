import { useMemo } from 'react'
import { MockEndpoint, MockMatePreferences } from '../types'
import { applyAllFilters } from '../utils/endpointFilters'

export function useEndpointFilters(endpoints: MockEndpoint[], preferences: MockMatePreferences): MockEndpoint[] {
  return useMemo(
    () =>
      applyAllFilters(
        endpoints,
        preferences.searchQuery,
        preferences.selectedMethod,
        preferences.selectedStatusGroup,
        preferences.selectedTag,
        preferences.sortOption
      ),
    [endpoints, preferences]
  )
}
