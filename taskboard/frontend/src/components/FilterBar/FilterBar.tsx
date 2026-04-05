import { useFilters } from '../../context/FilterContext'
import type { Priority } from '../../types'

const FilterBar = () => {
    const { state, dispatch } = useFilters()

    const handleSearchOnChange: React.ChangeEventHandler<HTMLInputElement> = (
        e,
    ) => {
        dispatch({ type: 'SET_SEARCH', data: { searchQuery: e.target.value } })
    }

    const handlePriorityOnChange: React.ChangeEventHandler<
        HTMLSelectElement
    > = (e) => {
        console.log(e.target.value)
        dispatch({
            type: 'SET_PRIORITY',
            data: { priority: e.target.value as Priority | 'all' },
        })
    }

    return (
        <div>
            <input
                type='text'
                name='search'
                id='search'
                value={state.searchQuery}
                onChange={handleSearchOnChange}
            />

            <select
                name='priority'
                id='priority'
                onChange={handlePriorityOnChange}
                value={state.priority}
                defaultValue='all'
            >
                <option
                    value='all'
                    title='All'
                >
                    All
                </option>
                <option
                    value='low'
                    title='Low'
                >
                    Low
                </option>
                <option
                    value='medium'
                    title='Medium'
                >
                    Medium
                </option>
                <option
                    value='high'
                    title='High'
                >
                    High
                </option>
            </select>
        </div>
    )
}

export default FilterBar
