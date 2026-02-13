import './AlertSearchInput.css'

interface AlertSearchInput {
    search: string
    onSearchChange: (value: string) => void
}

export default function AlertSearchInput({
    search,
    onSearchChange,
}: AlertSearchInput) {
    return (
        <div className='search-input'>
            <label htmlFor='search'>Search</label>
            <input
                type='text'
                name='search'
                id='search'
                placeholder='Search an alert title...'
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    )
}
