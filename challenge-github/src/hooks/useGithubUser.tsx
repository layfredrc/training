import { useEffect, useState } from 'react'
import type { GitHubUser } from '../types'

export function useGithubUser(username: string) {
    const [data, setData] = useState<GitHubUser | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!username.trim()) {
            setData(null)
            setError(null)
            return
        }

        const abortController = new AbortController()

        async function fetchUser() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(
                    `https://api.github.com/users/${username}`,
                    { signal: abortController.signal },
                )

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`User "${username}" not found`)
                    }
                    if (response.status === 403) {
                        throw new Error('Rate limit exceeded. Try again later.')
                    }
                    throw new Error('Failed to fetch user')
                }

                const userData = await response.json()
                setData(userData)
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                    setData(null)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchUser()

        return () => abortController.abort()
    }, [username])

    return { data, loading, error }
}
