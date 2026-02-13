import { useState } from 'react'

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
    // Lazy initialization avec parsing JSON
    const [storedValue, setStoredValue] = useState<T>(() => {
        // SSR check
        if (typeof window === 'undefined') {
            return initialValue
        }

        try {
            const item = window.localStorage.getItem(key)

            // Si pas de valeur stockée, utilise initialValue
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    // Wrapper pour setValue qui gère aussi localStorage
    const setValue = (value: T | ((prev: T) => T)) => {
        try {
            // Permet les deux syntaxes :
            // setValue(newValue) ou setValue(prev => newValue)
            const valueToStore =
                value instanceof Function ? value(storedValue) : value

            // Update React state
            setStoredValue(valueToStore)

            // Update localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }

    return [storedValue, setValue]
}
