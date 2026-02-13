import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    // TODO: Implémente le debounce
    // Indice: useState + useEffect + setTimeout
    useEffect(() => {
        // ref.current pour garde fou
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        // cleanup
        return () => {
            clearTimeout(timeoutId)
        }
    }, [value, delay])

    return debouncedValue
}
