import { useReducer, type ReactNode } from 'react'
import { FilterContext, filterReducer, type FilterState } from './FilterContext'

function FilterProvider({ children }: { children: ReactNode }) {
    const initialState: FilterState = { searchQuery: '', priority: 'all' }

    const [filterData, dispatchFilter] = useReducer(filterReducer, initialState)

    const value = {
        state: filterData,
        dispatch: dispatchFilter,
    }

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterProvider
