import type { Ref, CreateRefInput, PaginatedResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, options)
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    // 204 No Content (typique pour DELETE) → corps vide, pas de JSON à parser
    if (res.status === 204) return undefined as T
    return res.json() as Promise<T>
}

export function getRefs(): Promise<PaginatedResponse<Ref>> {
    return request<PaginatedResponse<Ref>>('/refs/')
}

export function createRef(data: CreateRefInput): Promise<Ref> {
    return request<Ref>('/refs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}

export function deleteRef(id: string): Promise<void> {
    return request<void>(`/refs/${id}/`, { method: 'DELETE' })
}
