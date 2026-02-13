import { useState } from 'react'
import { SearchHistoryProvider } from './context/SearchHistoryContext'
import { useSearchHistory } from './context/SearchHistoryContext'
import { useGithubUser } from './hooks/useGithubUser'
import SearchBar from './components/SearchBar'
import UserCard from './components/UserCard'
import RecentSearches from './components/RecentSearches'
import './App.css'

function AppContent() {
    const [username, setUsername] = useState('')
    const { data, loading, error } = useGithubUser(username)
    const { addSearch } = useSearchHistory()

    function handleSearch(searchUsername: string) {
        setUsername(searchUsername)
        addSearch(searchUsername)
    }

    return (
        <div className='app'>
            <header className='app-header'>
                <h1>🐙 GitHub User Search</h1>
                <p>Search for GitHub users and view their profiles</p>
            </header>

            <SearchBar onSearch={handleSearch} />

            <RecentSearches onSelect={handleSearch} />

            {loading && (
                <div className='loading'>
                    <div className='spinner' />
                    <p>Loading...</p>
                </div>
            )}

            {error && (
                <div className='error'>
                    <p>❌ {error}</p>
                </div>
            )}

            {data && !loading && <UserCard user={data} />}

            {!username && !loading && !error && (
                <div className='empty-state'>
                    <p>👆 Search for a GitHub user to get started</p>
                </div>
            )}
        </div>
    )
}

function App() {
    return (
        <SearchHistoryProvider>
            <AppContent />
        </SearchHistoryProvider>
    )
}

export default App
