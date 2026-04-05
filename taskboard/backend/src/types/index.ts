export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: Priority
    createdAt: Date
    updatedAt: Date
}

// Utility types dérivés
export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateTaskDTO = Partial<Omit<Task, 'id' | 'createdAt'>>
