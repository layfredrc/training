import type { AlertResponse, Alert, Severity, Source } from '../types'
import { useEffect, useState } from 'react'

interface UseAlertParams {
    search: string
    source: Source | 'all'
    severity: Severity | 'all'
    page: number
    pageSize: number
}
interface UseAlertResult {
    alerts: Alert[]
    total: number
    isLoading: boolean
    error: Error | null
}

export function useAlerts({
    search,
    source,
    severity,
    page,
    pageSize,
}: UseAlertParams): UseAlertResult {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            setIsLoading(true)
            setError(null)

            try {
                const searchParams = new URLSearchParams({
                    search,
                    source: source === 'all' ? '' : source,
                    severity: severity === 'all' ? '' : severity,
                    page: String(page),
                    pageSize: String(pageSize),
                })

                const res = await fetch(
                    `/api/alerts/?${searchParams.toString()}`,
                )

                if (!res.ok) {
                    throw new Error(`Failed to fetch alerts (${res.status})`)
                }
                const data = (await res.json()) as AlertResponse

                if (!cancelled) {
                    setAlerts(data.items)
                    setTotal(data.total)
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(error)
                    setError(error as Error)
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }
        load()

        return () => {
            cancelled = true
        }
    }, [page, pageSize, severity, source, search])

    return { alerts, total, isLoading, error }
}
