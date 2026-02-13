import { useMemo } from 'react'
import { generateMockData } from '../data/mockData'
import { useDebounce } from '../hooks/useDebounce'
import { useFilteredData } from '../hooks/useFilteredData'
import VirtualizedList from './VirualizedList'
import { useFilters } from '../hooks/useFilters'
import SearchTermInput from './SearchTermInput'

const DATA_SIZE = 50000

export function IntelligenceDashboard() {
    // TODO:
    // 1. Generate data avec useMemo
    // 2. States pour searchTerm, riskThreshold, selectedCategory
    // 3. Debounce searchTerm
    // 4. Appelle useFilteredData

    // 1️⃣ Generate data UNE SEULE FOIS
    const data = useMemo(() => generateMockData(DATA_SIZE), [])
    console.log({ data })
    const {
        searchTerm,
        selectedCategory,
        riskThreshold,
        setSearchTerm,
        setRiskThreshold,
        setSelectedCategory,
    } = useFilters()

    // 3️⃣ Debounce la recherche
    const debouncedSearch = useDebounce(searchTerm, 300)

    // 4️⃣ Filtre les données (pas de state ici !)
    const filteredData = useFilteredData(data, {
        searchTerm: debouncedSearch,
        riskThreshold,
        selectedCategory,
    })
    return (
        <div className='app'>
            <div className='dashboard'>
                <h1>OSINT Intelligence Dashboard</h1>

                <div className='filters'>
                    {/* TODO: Input de recherche */}
                    {/* <div className='filter-group'>
                        <label htmlFor='search'>Search (IP or Domain)</label>
                        <input
                            id='search'
                            type='text'
                            placeholder='192.168.1.1 or example.com'
                            // TODO: value, onChange
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div> */}
                    <SearchTermInput />
                    {/* TODO: Slider risk threshold */}
                    <div className='filter-group'>
                        <label htmlFor='risk'>
                            Risk Threshold: <strong>{riskThreshold}</strong>
                        </label>
                        <input
                            id='risk'
                            // TODO: type, min, max, value, onChange
                            type='range'
                            min={0}
                            max={100}
                            step={1}
                            value={riskThreshold}
                            onChange={(e) =>
                                setRiskThreshold(parseInt(e.target.value))
                            }
                        />
                    </div>

                    <div className='filter-group'>
                        <label htmlFor='category'>Category</label>
                        <select
                            id='category'
                            value={selectedCategory}
                            // TODO: onChange
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            <option value='all'>All Categories</option>
                            <option value='malware'>Malware</option>
                            <option value='phishing'>Phishing</option>
                            <option value='botnet'>Botnet</option>
                            <option value='suspicious'>Suspicious</option>
                            <option value='clean'>Clean</option>
                        </select>
                    </div>
                </div>

                {/* TODO: Stats + VirtualizedList après */}
            </div>
            <div className='stats'>
                <span>
                    Total: <strong>{data.length.toLocaleString()}</strong>
                </span>
                <span>
                    Filtered:{' '}
                    <strong>{filteredData.length.toLocaleString()}</strong>
                </span>
                <span>
                    Showing:{' '}
                    <strong>
                        {data.length > 0
                            ? (
                                  (filteredData.length / data.length) *
                                  100
                              ).toFixed(1)
                            : '0'}
                        %
                    </strong>
                </span>
            </div>
            {/* Headers */}
            <div className='table-header'>
                <span>IP Address</span>
                <span>Domain</span>
                <span>Country</span>
                <span>Risk</span>
                <span>Category</span>
                <span>Timestamp</span>
            </div>
            {/* List container */}
            <div
                style={{
                    height: 'calc(100vh - 200px)',
                    border: '1px solid #ddd',
                }}
            >
                <VirtualizedList
                    data={filteredData}
                    itemHeight={50}
                />
            </div>
        </div>
    )
}
