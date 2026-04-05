import type { Task, TaskStatus } from '../../types'
import { TaskCard } from './TaskCard'

interface ColumnProps {
    title: string
    status: TaskStatus
    tasks: Task[]
    onDelete: (id: string) => void
}

export function Column({ title, tasks, onDelete }: ColumnProps) {
    return (
        <div
            style={{
                background: '#F7FAFC',
                borderRadius: '12px',
                padding: '16px',
                width: '300px',
                minHeight: '400px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                }}
            >
                <h3 style={{ margin: 0, fontSize: '15px' }}>{title}</h3>
                <span
                    style={{
                        background: '#E2E8F0',
                        borderRadius: '12px',
                        padding: '2px 8px',
                        fontSize: '12px',
                    }}
                >
                    {tasks.length}
                </span>
            </div>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
