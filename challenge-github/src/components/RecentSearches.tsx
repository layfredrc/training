import { useSearchHistory } from '../context/SearchHistoryContext'

interface RecentSearchesProps {
    onSelect: (username: string) => void
}

export default function RecentSearches({ onSelect }: RecentSearchesProps) {
    const { searches, clearHistory } = useSearchHistory()

    if (searches.length === 0) return null

    return (
        <div className='recent-searches'>
            <div className='recent-header'>
                <h3>Recent Searches</h3>
                <button
                    onClick={clearHistory}
                    className='clear-button'
                >
                    Clear
                </button>
            </div>

            <div className='searches-list'>
                {searches.map((username) => (
                    <button
                        key={username}
                        onClick={() => onSelect(username)}
                        className='search-chip'
                    >
                        {username}
                    </button>
                ))}
            </div>
        </div>
    )
}
