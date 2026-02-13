import { useEffect, useState } from 'react'

// UserProfile.tsx
interface User {
    id: string
    name: string
    email: string
    avatar: string
}

export default function UserProfile({ userId }: { userId: string }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        // Flag pour éviter les race conditions
        let cancelled = false

        async function load() {
            try {
                // 1. Active le loading avant le fetch
                setLoading(true)
                setError(null) // Reset l'erreur précédente

                // 2. Fetch les données
                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${userId}`,
                )

                // 3. Vérifie si on doit encore mettre à jour
                // (si le user a changé de page entre-temps, cancelled = true)
                if (!cancelled) {
                    const data = await res.json()
                    setUser(data)
                }
            } catch (err) {
                // 4. Capture les erreurs (network, JSON parsing, etc.)
                console.error(err)
                if (!cancelled) {
                    // Important : ne pas update si cleanup a run
                    setError(err as Error)
                }
            } finally {
                // 5. Toujours désactiver loading, succès ou échec
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        // Lance le fetch
        load()

        // Cleanup : marque cette requête comme obsolète
        return () => {
            cancelled = true
        }
    }, [userId]) // Re-fetch si userId change

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!user) return null

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    )
}
