import './App.css'
import { IntelligenceDashboard } from './components/IntelligenceDashboard'
import ItemList from './components/ItemList'
import { ProductListContainer } from './components/ProductList'
import Timer from './components/Timer'
import UserProfile from './components/UserProfile'
import { FilterProvider } from './context/FilterProvider'

function App() {
    return (
        <>
            <UserProfile userId='2' />
            <ProductListContainer />
            <ItemList />
            <Timer />
            <FilterProvider>
                <IntelligenceDashboard />
            </FilterProvider>
        </>
    )
}

export default App
