import { http, HttpResponse } from 'msw'
import type { AlertResponse, Alert, Source, Severity } from '../types'

export const MOCK_ALERTS: Alert[] = [
    {
        id: '1',
        title: 'Suspicious login from new country',
        source: 'twitter',
        severity: 'high',
        createdAt: '2026-02-10T09:15:00Z',
        tags: ['account-takeover', 'login', 'france'],
    },
    {
        id: '2',
        title: 'New phishing domain targeting banking customers',
        source: 'website',
        severity: 'medium',
        createdAt: '2026-02-09T14:30:00Z',
        tags: ['phishing', 'domain', 'banking'],
    },
    // ajoute 3–5 entrées de plus si tu veux
]

function filterAlerts(
    alerts: Alert[],
    {
        search = '',
        source,
        severity,
    }: {
        search?: string
        source?: Source | 'all'
        severity?: Severity | 'all'
    },
) {
    let filtered = alerts

    if (search?.trim()) {
        const lower = search.toLowerCase()
        filtered = filtered.filter((a) => a.title.toLowerCase().includes(lower))
    }

    if (source && source !== 'all') {
        filtered = filtered.filter((a) => a.source === source)
    }

    if (severity && severity !== 'all') {
        filtered = filtered.filter((a) => a.severity === severity)
    }

    return filtered
}

export const handlers = [
    http.get('/api/alerts', ({ request }) => {
        const url = new URL(request.url)
        const search = url.searchParams.get('search') ?? ''
        const source = (url.searchParams.get('source') || 'all') as
            | Source
            | 'all'
        const severity = (url.searchParams.get('severity') || 'all') as
            | Severity
            | 'all'
        const page = Number(url.searchParams.get('page') || '1')
        const pageSize = Number(url.searchParams.get('pageSize') || '20')

        const filtered = filterAlerts(MOCK_ALERTS, { search, source, severity })
        const total = filtered.length
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const items = filtered.slice(start, end)

        const body: AlertResponse = { items, total }

        return HttpResponse.json(body)
    }),
]
