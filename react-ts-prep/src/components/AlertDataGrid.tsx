import type { Alert } from '../types'

interface AlertDataGridProps {
    data: Alert[]
    total: number
    page: number
    totalPages: number
}

export default function AlertDataGrid({
    data,
    total,
    page,
    totalPages,
}: AlertDataGridProps) {
    const columns = [
        { key: 'title', header: 'Titre' },
        { key: 'source', header: 'Source' },
        { key: 'severity', header: 'Sévérité' },
        { key: 'createdAt', header: 'Date' },
        { key: 'tags', header: 'Tags' },
    ] as const

    return (
        <div>
            <p>Total: {total}</p>

            <p>
                Page : {page} / {totalPages}
            </p>
            <table>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                scope='col'
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((alert) => (
                        <tr key={alert.id}>
                            {columns.map((col) => {
                                let value: React.ReactNode = alert[col.key]

                                if (col.key === 'createdAt') {
                                    value = new Date(
                                        alert.createdAt,
                                    ).toLocaleString()
                                }
                                if (col.key === 'tags') {
                                    value = alert.tags.join(', ')
                                }

                                return <td key={col.key}>{value}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
