import { useFilters } from '../hooks/useFilters'

export default function SearchTermInput() {
    const { searchTerm, setSearchTerm } = useFilters()
    return (
        <div className='filter-group'>
            <label htmlFor='search'>Search (IP or Domain)</label>
            <input
                id='search'
                type='text'
                name='search'
                autoFocus
                placeholder='192.168.1.1 or example.com'
                // TODO: value, onChange
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                type='button'
                onClick={() => setSearchTerm('')}
            >
                Reset
            </button>
        </div>
    )
}
