import { useState } from 'react'
import type { Task } from '../../types'

type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

interface TaskFormProps {
    onCreate: (task: CreateTaskDTO) => void
}

const initialState: CreateTaskDTO = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
}

export function TaskForm({ onCreate }: TaskFormProps) {
    const [form, setForm] = useState<CreateTaskDTO>(initialState)
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title.trim()) return
        onCreate(form)
        setForm(initialState)
        setOpen(false)
    }

    if (!open)
        return (
            <button
                onClick={() => setOpen(true)}
                style={{
                    marginBottom: '24px',
                    padding: '10px 20px',
                    background: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}
            >
                + Nouvelle tâche
            </button>
        )

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '480px',
            }}
        >
            <input
                placeholder='Titre *'
                value={form.title}
                onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E0',
                }}
            />
            <input
                placeholder='Description'
                value={form.description}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                    }))
                }
                style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E0',
                }}
            />
            <select
                value={form.status}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        status: e.target.value as Task['status'],
                    }))
                }
                style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E0',
                }}
            >
                <option value='todo'>À faire</option>
                <option value='in_progress'>En cours</option>
                <option value='done'>Terminé</option>
            </select>
            <select
                value={form.priority}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        priority: e.target.value as Task['priority'],
                    }))
                }
                style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E0',
                }}
            >
                <option value='low'>Basse</option>
                <option value='medium'>Moyenne</option>
                <option value='high'>Haute</option>
            </select>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    type='submit'
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                >
                    Créer
                </button>
                <button
                    type='button'
                    onClick={() => setOpen(false)}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: '#EDF2F7',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                >
                    Annuler
                </button>
            </div>
        </form>
    )
}
