import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getRefs, createRef, deleteRef } from '@/lib/api'
import type { CreateRefInput } from '@/types'

export function useRefs() {
    return useQuery({
        queryKey: ['refs'],
        queryFn: getRefs,
        select: (data) => data.results,
    })
}

export function useCreateRef() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateRefInput) => createRef(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['refs'] }),
    })
}

export function useDeleteRef() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteRef(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['refs'] }),
    })
}
