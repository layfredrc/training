// src/types.ts
export type Source = 'twitter' | 'telegram' | 'website'
export type Severity = 'low' | 'medium' | 'high'

export interface Alert {
    id: string
    title: string
    source: Source
    severity: Severity
    createdAt: string // ISO
    tags: string[]
}

export interface AlertResponse {
    items: Alert[]
    total: number
}
