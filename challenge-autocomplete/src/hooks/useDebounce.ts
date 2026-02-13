import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        if (!value || !delay) return

        const timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [value, delay])

    return debouncedValue
}
