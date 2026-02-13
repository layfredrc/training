import { createContext } from 'react'
import type { FilterOptions } from '../hooks/useFilteredData'

interface FilterContextValue extends FilterOptions {
    setSearchTerm: (value: string) => void
    setRiskThreshold: (value: number) => void
    setSelectedCategory: (value: string) => void
    resetFilters: () => void
}

export const FilterContext = createContext<FilterContextValue | null>(null)
