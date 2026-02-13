import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react'

interface SearchHistoryContextValue {
  searches: string[]
  addSearch: (username: string) => void
  clearHistory: () => void
}

const SearchHistoryContext = createContext<SearchHistoryContextValue | null>(null)

const STORAGE_KEY = 'github-search-history'
const MAX_SEARCHES = 5

export function SearchHistoryProvider({ children }: PropsWithChildren) {
  const [searches, setSearches] = useState<string[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setSearches(JSON.parse(saved))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // Save to localStorage when searches change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches))
  }, [searches])

  function addSearch(username: string) {
    if (!username.trim()) return

    setSearches(prev => {
      // Remove duplicates
      const filtered = prev.filter(s => s.toLowerCase() !== username.toLowerCase())
      // Add to front, limit to MAX_SEARCHES
      return [username, ...filtered].slice(0, MAX_SEARCHES)
    })
  }

  function clearHistory() {
    setSearches([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <SearchHistoryContext.Provider value={{ searches, addSearch, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  )
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext)
  if (!context) {
    throw new Error('useSearchHistory must be used within SearchHistoryProvider')
  }
  return context
}
