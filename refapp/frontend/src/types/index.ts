export type Ref = {
    id: string
    title: string
    url: string
    category: string
    created_at: Date
}

export type CreateRefInput = Omit<Ref, 'id' | 'created_at'>

export type PaginatedResponse<T> = {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}
