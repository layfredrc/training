import { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../types'
import { randomUUID } from 'crypto'

// Classe générique — T doit avoir un champ id
class Repository<T extends { id: string }> {
    protected items: Map<string, T> = new Map()

    findAll(): T[] {
        return Array.from(this.items.values())
    }

    findById(id: string): T | undefined {
        return this.items.get(id)
    }

    protected save(item: T): T {
        this.items.set(item.id, item)
        return item
    }

    delete(id: string): boolean {
        return this.items.delete(id)
    }
}

// TaskRepository étend le générique avec la logique spécifique aux tâches
export class TaskRepository extends Repository<Task> {
    create(data: CreateTaskDTO): Task {
        const task: Task = {
            ...data,
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        return this.save(task)
    }

    update(id: string, data: UpdateTaskDTO): Task | undefined {
        const existing = this.findById(id)
        if (!existing) return undefined
        const updated = { ...existing, ...data, updatedAt: new Date() }
        return this.save(updated)
    }

    findByStatus(status: TaskStatus): Task[] {
        return this.findAll().filter((t) => t.status === status)
    }
}

// Instance singleton — une seule instance partagée dans toute l'app
export const taskRepository = new TaskRepository()
