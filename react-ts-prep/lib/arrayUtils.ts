export type User = {
    id: number
    name: string
    age: number
    active: boolean
}

function getActiveAndAdultName(users: User[]): string[] {
    return users.filter((u) => u.active && u.age >= 18).map((u) => u.name)
}
// retourner le reduce sinon toujours undefined, retourner la ternaire quand ya que ça sinon rien
function getActiveAndInactiveCount(users: User[]) {
    return users.reduce(
        (acc, user) =>
            user.active
                ? { ...acc, active: acc.active + 1 }
                : { ...acc, inactive: acc.inactive + 1 },
        { active: 0, inactive: 0 },
    )
}

function groupByKey<T, K extends string>(
    items: T[],
    getKey: (item: T) => K,
): Record<K, T[]> {
    return items.reduce(
        (acc, item) => {
            const key = getKey(item)
            ;(acc[key] ??= []).push(item)
            return acc
        },
        {} as Record<K, T[]>,
    )
}

function groupByUserActive(users: User[]) {
    const initial: { active: User[]; inactive: User[] } = {
        active: [],
        inactive: [],
    }
    return users.reduce((acc, user) => {
        if (user.active) acc.active.push(user)
        else acc.inactive.push(user)
        return acc
    }, initial)
}

function groupByUserActive2(
    users: User[],
): Record<'active' | 'inactive', User[]> {
    const grouped = groupByKey(users, (user) =>
        user.active ? 'active' : 'inactive',
    )
    return grouped
}

export type Transaction = {
    id: string
    amount: number
    currency: 'EUR' | 'USD'
    status: 'success' | 'failed'
}

function getTotalAmountByCurrency(
    transactions: Transaction[],
): Record<'EUR' | 'USD', number> {
    return transactions.reduce(
        (acc, transaction) => {
            if (transaction.status === 'success') {
                acc[transaction.currency] =
                    acc[transaction.currency] + transaction.amount
            }
            return acc
        },
        { EUR: 0, USD: 0 },
    )
}

type GroupWithTotal = {
    EUR: Transaction[]
    USD: Transaction[]
    total: Record<'EUR' | 'USD', number>
}

function groupByCurrencyAndGetTotalAmount(
    transactions: Transaction[],
): GroupWithTotal {
    const initial: GroupWithTotal = {
        EUR: [],
        USD: [],
        total: { EUR: 0, USD: 0 },
    }
    return transactions.reduce((acc, transaction) => {
        acc[transaction.currency].push(transaction)
        if (transaction.status === 'success') {
            acc.total[transaction.currency] += transaction.amount
        }
        return acc
    }, initial)
}

function summarizeTransactions(transactions: Transaction[]): {
    totals: Record<'EUR' | 'USD', number>
    failedIds: string[]
} {
    const initial = {
        totals: { EUR: 0, USD: 0 },
        failedIds: [] as string[],
    }
    return transactions.reduce((acc, transaction) => {
        if (transaction.status === 'success') {
            acc.totals[transaction.currency] += transaction.amount
        } else {
            acc.failedIds.push(transaction.id)
        }
        return acc
    }, initial)
}

export type ScoreItem = {
    id: string
    score: number
}

function sortItems(items: ScoreItem[]) {
    return [...items].sort((a, b) => {
        if (a.score === b.score) {
            return a.id.localeCompare(b.id)
        }
        return b.score - a.score
    })
}

function flat<T>(items: T[]) {
    return items.flat(2)
}

export type Event = {
    id: string
    type: 'alert' | 'case'
    severity: number
    ts: number
}

const events = [
    { id: '1', type: 'alert', severity: 2, ts: 100 },
    { id: '2', type: 'case', severity: 1, ts: 300 },
    { id: '3', type: 'alert', severity: 3, ts: 200 },
    { id: '4', type: 'case', severity: 2, ts: 150 },
]

function groupByEventTypeSortedByTs(
    events: Event[],
): Record<'alert' | 'case', Event[]> {
    const initial: Record<'alert' | 'case', Event[]> = { alert: [], case: [] }
    const grouped = events.reduce((acc, event) => {
        acc[event.type].push(event)
        return acc
    }, initial)

    grouped.alert.sort((a, b) => b.ts - a.ts)
    grouped.case.sort((a, b) => b.ts - a.ts)

    return grouped
}

export {
    getActiveAndAdultName,
    getActiveAndInactiveCount,
    groupByUserActive,
    groupByUserActive2,
    getTotalAmountByCurrency,
    sortItems,
    flat,
}
