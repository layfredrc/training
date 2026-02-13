// src/api/alertsApi.ts
import { MOCK_ALERTS } from '../mocks/handler'
import type { AlertResponse, Source, Severity } from '../types'

export interface FetchAlertsParams {
    search?: string
    source?: Source | 'all'
    severity?: Severity | 'all'
    page?: number
    pageSize?: number
}

export async function fetchAlerts(
    params: FetchAlertsParams = {},
): Promise<AlertResponse> {
    const {
        search = '',
        source = 'all',
        severity = 'all',
        page = 1,
        pageSize = 20,
    } = params

    // Filtrage en mémoire
    let filtered = MOCK_ALERTS

    if (search.trim()) {
        const lower = search.toLowerCase()
        filtered = filtered.filter((alert) =>
            alert.title.toLowerCase().includes(lower),
        )
    }

    if (source !== 'all') {
        filtered = filtered.filter((alert) => alert.source === source)
    }

    if (severity !== 'all') {
        filtered = filtered.filter((alert) => alert.severity === severity)
    }

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const items = filtered.slice(start, end)

    // Simuler un délai réseau
    await new Promise((res) => setTimeout(res, 300))

    return { items, total }
}
