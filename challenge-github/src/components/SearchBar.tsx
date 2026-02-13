import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'

interface SearchBarProps {
    onSearch: (username: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [input, setInput] = useState('')
    const debouncedInput = useDebounce(input, 500)

    // Trigger search when debounced value changes
    useState(() => {
        if (debouncedInput) {
            onSearch(debouncedInput)
        }
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (input.trim()) {
            onSearch(input.trim())
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='search-bar'
        >
            <input
                type='text'
                placeholder='Search GitHub username...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='search-input'
            />
            <button
                type='submit'
                className='search-button'
            >
                🔍 Search
            </button>
        </form>
    )
}
