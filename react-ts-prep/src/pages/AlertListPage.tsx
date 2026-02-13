import { useState } from 'react'
import type { Severity, Source } from '../types'
import { useAlerts } from '../hooks/useAlerts'
import './AlertListPage.css'
import AlertSearchInput from '../components/AlertSearchInput'
import AlertFilters from '../components/AlertFilters'
import AlertDataGrid from '../components/AlertDataGrid'

const PAGE_SIZE = 20

export default function AlertListPage() {
    const [search, setSearch] = useState('')
    const [source, setSource] = useState<Source | 'all'>('all')
    const [severity, setSeverity] = useState<Severity | 'all'>('all')
    const [page, setPage] = useState(1)

    const { alerts, total, isLoading, error } = useAlerts({
        search,
        source,
        severity,
        page,
        pageSize: PAGE_SIZE,
    })

    const handleSearchChange = (value: string) => {
        setPage(1)
        setSearch(value)
    }

    const handleSourceChange = (value: Source | 'all') => {
        setPage(1)
        setSource(value)
    }

    const handleSeverityChange = (value: Severity | 'all') => {
        setPage(1)
        setSeverity(value)
    }

    const totalPages = Math.max(Math.ceil(total / PAGE_SIZE))

    return (
        <div className='container'>
            <div className='heading'>
                <h1>OSINT Alerts</h1>
            </div>

            <div className='search-filter_container'>
                <AlertSearchInput
                    search={search}
                    onSearchChange={handleSearchChange}
                />
                <AlertFilters
                    source={source}
                    severity={severity}
                    onSeverityChange={handleSeverityChange}
                    onSourceChange={handleSourceChange}
                />
            </div>
            {isLoading && <div className=''>...Loading</div>}
            {error && <div className=''>{error.message}</div>}
            {alerts.length === 0 && <div className=''>No data</div>}
            {!isLoading && !error && alerts.length !== 0 && (
                <AlertDataGrid
                    data={alerts}
                    total={total}
                    page={page}
                    totalPages={totalPages}
                />
            )}

            <div className=''>
                <button
                    onClick={() =>
                        setPage((prev) => {
                            if (prev > 1) {
                                return prev - 1
                            }
                            return 1
                        })
                    }
                >
                    Prev
                </button>
                <button
                    onClick={() =>
                        setPage((prev) => {
                            if (prev < totalPages) {
                                return prev + 1
                            }
                            return totalPages
                        })
                    }
                >
                    Next
                </button>
            </div>
        </div>
    )
}
