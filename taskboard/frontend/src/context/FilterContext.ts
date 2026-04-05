import { createContext, useContext } from 'react'
import type { Priority } from '../types'

export type FilterState = {
    searchQuery?: string
    priority?: Priority | 'all'
}

export type FilterAction = {
    type: 'SET_SEARCH' | 'SET_PRIORITY'
    data: FilterState
}

type FilterContextType = {
    state: FilterState
    dispatch: (action: FilterAction) => void
}

export function filterReducer(
    state: FilterState,
    action: FilterAction,
): FilterState {
    switch (action.type) {
        case 'SET_SEARCH':
            return {
                ...state,
                searchQuery: action.data.searchQuery,
            }
        case 'SET_PRIORITY':
            return {
                ...state,
                priority: action.data.priority,
            }
        default:
            return state
    }
}

export const FilterContext = createContext<FilterContextType | null>(null)

export function useFilters() {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error('useFilters doit être utilisé dans un FilterProvider')
    }
    return context
}
