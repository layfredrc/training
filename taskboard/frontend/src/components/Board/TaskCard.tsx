import type { Task } from '../../types'

interface TaskCardProps {
    task: Task
    onDelete: (id: string) => void
}

const priorityColors: Record<Task['priority'], string> = {
    low: '#6BCB77',
    medium: '#FFD166',
    high: '#EF476F',
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
    return (
        <div
            style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '8px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <strong style={{ fontSize: '14px' }}>{task.title}</strong>
                <span
                    style={{
                        background: priorityColors[task.priority],
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                    }}
                >
                    {task.priority}
                </span>
            </div>
            {task.description && (
                <p
                    style={{
                        fontSize: '12px',
                        color: '#718096',
                        margin: '6px 0 8px',
                    }}
                >
                    {task.description}
                </p>
            )}
            <button
                onClick={() => onDelete(task.id)}
                style={{
                    fontSize: '11px',
                    color: '#E53E3E',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Supprimer
            </button>
        </div>
    )
}
