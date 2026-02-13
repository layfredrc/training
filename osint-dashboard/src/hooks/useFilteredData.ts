import { useMemo } from 'react'
import type { IntelligenceEntry } from '../data/mockData'

export interface FilterOptions {
    searchTerm: string
    riskThreshold: number
    selectedCategory: string
}

export function useFilteredData(
    data: IntelligenceEntry[],
    filters: FilterOptions,
): IntelligenceEntry[] {
    // TODO: Implémente le filtrage avec useMemo pour optimiser
    // Critères:
    // - searchTerm filtre sur ipAddress OU domain
    // - riskThreshold filtre les scores >= threshold
    // - selectedCategory (si !== 'all')

    const { searchTerm, riskThreshold, selectedCategory } = filters

    const filtered = useMemo(() => {
        return data.filter((entry) => {
            if (searchTerm.trim()) {
                const formatedSearchTerm = searchTerm.toLowerCase()
                const matchSearch =
                    entry.ipAddress
                        .toLowerCase()
                        .includes(formatedSearchTerm) ||
                    entry.domain.toLowerCase().includes(formatedSearchTerm)

                if (!matchSearch) return false
            }

            // filtre 2: riskThreshold
            if (entry.riskScore < riskThreshold) return false

            // filtre 3: selectedCategory
            if (
                selectedCategory !== 'all' &&
                selectedCategory !== entry.category
            )
                return false

            // passe tous les filtres
            return true
        })
    }, [searchTerm, riskThreshold, selectedCategory, data])

    return filtered
}
