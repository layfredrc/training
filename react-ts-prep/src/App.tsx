import { Routes, Route, Navigate } from 'react-router-dom'
import AlertListPage from './pages/AlertListPage'
import AlertDetailPage from './pages/AlertDetailPage'

export default function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Navigate
                        to='/alerts'
                        replace
                    />
                }
            />
            <Route
                path='/alerts'
                element={<AlertListPage />}
            />
            <Route
                path='/alerts/:id'
                element={<AlertDetailPage />}
            />
        </Routes>
    )
}
