import { memo } from 'react'
import { List, type RowComponentProps } from 'react-window'
import type { IntelligenceEntry } from '../data/mockData'

interface Props {
    data: IntelligenceEntry[]
    height?: number
    itemHeight: number
}

// Props partagées via rowProps
interface SharedRowProps {
    data: IntelligenceEntry[]
}

// Row Component SANS memo (react-window gère déjà l'optimisation)
function RowComponent({
    index,
    style,
    data,
}: RowComponentProps<SharedRowProps>) {
    const item = data[index]
    const isHighRisk = item.riskScore >= 70

    return (
        <div
            style={style}
            className={`row ${isHighRisk ? 'high-risk' : ''}`}
        >
            <span className='ip'>{item.ipAddress}</span>
            <span className='domain'>{item.domain}</span>
            <span className='country'>{item.country}</span>
            <span className='risk'>{item.riskScore}</span>
            <span className='category'>{item.category}</span>
            <span className='timestamp'>
                {item.timestamp.toLocaleDateString()}{' '}
                {item.timestamp.toLocaleTimeString()}
            </span>
        </div>
    )
}

// Le composant principal (garde memo ici)
const VirtualizedList = memo<Props>(({ data, height, itemHeight }) => {
    return (
        <List
            rowComponent={RowComponent}
            rowCount={data.length}
            rowHeight={itemHeight}
            rowProps={{ data }}
            style={height ? { height } : undefined}
        />
    )
})

VirtualizedList.displayName = 'VirtualizedList'

export default VirtualizedList
