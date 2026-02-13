import Autocomplete from './components/Autocomplete'
import './App.css'

function App() {
    return (
        <div className='app'>
            <h1>🌍 Country Autocomplete</h1>
            <p>Type to search for a country. Use arrow keys to navigate.</p>
            <Autocomplete />
        </div>
    )
}

export default App
