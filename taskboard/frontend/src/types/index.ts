export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: Priority
    createdAt: string
    updatedAt: string
}

// Le type générique pour toutes les réponses API
export type ApiResponse<T> = {
    data: T
}

// Discriminated union pour les états de chargement
export type ApiState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: string }
