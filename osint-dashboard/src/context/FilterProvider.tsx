import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { FilterContext } from './FilterContext'

export function FilterProvider({ children }: { children: ReactNode }) {
    // 2️⃣ States pour les contrôles
    const [searchTerm, setSearchTerm] = useState('')
    const [riskThreshold, setRiskThreshold] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState('all')

    const resetFilters = useCallback(() => {
        setSearchTerm('')
        setRiskThreshold(0)
        setSelectedCategory('all')
    }, [])

    const value = useMemo(
        () => ({
            searchTerm,
            selectedCategory,
            riskThreshold,
            setSearchTerm,
            setRiskThreshold,
            setSelectedCategory,
            resetFilters,
        }),
        [searchTerm, riskThreshold, selectedCategory, resetFilters],
    )

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}
