import { useFilters } from '../../context/FilterContext'
import type { Task, TaskStatus } from '../../types'
import { Column } from './Column'

interface BoardProps {
    tasks: Task[]
    onDelete: (id: string) => void
}

const COLUMNS: { status: TaskStatus; title: string }[] = [
    { status: 'todo', title: '📋 À faire' },
    { status: 'in_progress', title: '⚙️ En cours' },
    { status: 'done', title: '✅ Terminé' },
]

export function Board({ tasks, onDelete }: BoardProps) {
    const { state } = useFilters()

    const filteredTasks = tasks
        .filter(
            (t) =>
                !state.searchQuery?.trim() ||
                t.title.includes(state.searchQuery) ||
                t.description.includes(state.searchQuery),
        )
        .filter(
            (t) => state.priority === 'all' || t.priority === state.priority,
        )

    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            {COLUMNS.map((col) => (
                <Column
                    key={col.status}
                    title={col.title}
                    status={col.status}
                    tasks={filteredTasks.filter((t) => t.status === col.status)}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
