import { useState, useEffect, useCallback } from 'react'
import type { Task, ApiState, ApiResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export function useTasks() {
    const [state, setState] = useState<ApiState<Task[]>>({ status: 'idle' })

    const fetchTasks = useCallback(async () => {
        setState({ status: 'loading' })
        try {
            const res = await fetch(`${API_URL}/api/tasks`)
            const json: ApiResponse<Task[]> = await res.json()
            setState({ status: 'success', data: json.data })
        } catch (err) {
            console.error(err)
            setState({ status: 'error', error: (err as Error).message })
        }
    }, [])

    const createTask = async (
        payload: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
    ) => {
        await fetch(`${API_URL}/api/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        fetchTasks()
    }

    const deleteTask = async (id: string) => {
        await fetch(`${API_URL}/api/tasks`, {
            method: 'DELETE',
        })
        fetchTasks()
    }

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    return { state, fetchTasks, createTask, deleteTask }
}
