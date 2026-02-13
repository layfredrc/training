import type { Severity, Source } from '../types'
import './AlertFIlters.css'

interface AlertFiltersProps {
    source: Source | 'all'
    severity: Severity | 'all'
    onSourceChange: (value: Source | 'all') => void
    onSeverityChange: (value: Severity | 'all') => void
}

export default function AlertFilters({
    source,
    severity,
    onSourceChange,
    onSeverityChange,
}: AlertFiltersProps) {
    return (
        <div className='filters'>
            <select
                title='Source'
                name='source'
                id='source'
                value={source}
                onChange={(e) => onSourceChange(e.target.value as Source)}
            >
                <option value='all'>All Sources</option>
                <option value='twitter'>Twitter</option>
                <option value='telegram'>Telegram</option>
                <option value='website'>Website</option>
            </select>
            <select
                title='severity'
                name='severity'
                id='severity'
                value={severity}
                onChange={(e) => onSeverityChange(e.target.value as Severity)}
            >
                <option value='all'>All Severities</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
            </select>
        </div>
    )
}
