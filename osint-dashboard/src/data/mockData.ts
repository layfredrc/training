export interface IntelligenceEntry {
    id: string
    ipAddress: string
    country: string
    timestamp: Date
    riskScore: number // 0-100
    category: 'malware' | 'phishing' | 'botnet' | 'suspicious' | 'clean'
    domain: string
}

export function generateMockData(count: number): IntelligenceEntry[] {
    const countries = ['US', 'RU', 'CN', 'FR', 'DE', 'BR', 'IN', 'UK']
    const categories: IntelligenceEntry['category'][] = [
        'malware',
        'phishing',
        'botnet',
        'suspicious',
        'clean',
    ]
    const domains = [
        'example.com',
        'test.net',
        'malicious.org',
        'suspicious.io',
    ]

    return Array.from({ length: count }, (_, i) => ({
        id: `entry-${i}`,
        ipAddress: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        country: countries[Math.floor(Math.random() * countries.length)],
        timestamp: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
        ),
        riskScore: Math.floor(Math.random() * 100),
        category: categories[Math.floor(Math.random() * categories.length)],
        domain: domains[Math.floor(Math.random() * domains.length)],
    }))
}
