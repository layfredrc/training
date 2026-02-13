import { useState, useMemo } from 'react'
import {
    mockTransactions,
    type Category,
    type Transaction,
} from '../data/mockTransactions'
import { isWithinInterval, parseISO } from 'date-fns'

export default function Dashboard() {
    // TODO 1: Définir les states des filtres
    const [startDate, setStartDate] = useState('2024-01-01')
    const [endDate, setEndDate] = useState('2024-12-31')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [minAmount, setMinAmount] = useState(0)
    console.log({ mockTransactions })
    // TODO 2: Filtrer les transactions avec useMemo
    const filteredTransactions = useMemo(() => {
        // TODO: Implémenter le filtrage
        return mockTransactions.filter((t) => {
            if (!startDate || !endDate) return false
            if (
                isWithinInterval(parseISO(t.date), {
                    start: parseISO(startDate),
                    end: parseISO(endDate),
                }) === false
            )
                return false
            if (selectedCategory !== 'all' && t.category !== selectedCategory)
                return false
            if (Math.abs(t.amount) < minAmount) return false

            return true
        })
    }, [startDate, endDate, selectedCategory, minAmount])

    console.log({ filteredTransactions })

    // TODO 3: Calculer les stats avec useMemo
    const stats = useMemo(() => {
        // TODO: Calculer revenue, expenses, balance, average
        // calculer la somme des montants positifs
        const revenue = filteredTransactions
            .filter((t) => t.amount > 0)
            .reduce((acc, t) => (acc += t.amount), 0)

        // calculer la somme des montants négatives
        const expenses = filteredTransactions
            .filter((t) => t.amount < 0)
            .reduce((acc, t) => (acc += Math.abs(t.amount)), 0)

        const balance = revenue - expenses

        const average =
            filteredTransactions.length > 0
                ? filteredTransactions.reduce(
                      (acc, t) => (acc += Math.abs(t.amount)),
                      0,
                  ) / filteredTransactions.length
                : 0

        return {
            revenue,
            expenses,
            balance,
            average,
        }
    }, [filteredTransactions])

    // TODO 4: Calculer le breakdown par catégorie
    const breakdown = useMemo(() => {
        // 1. Seulement les dépenses (négatifs)
        const expenses = filteredTransactions.filter((t) => t.amount < 0)

        // 2. Total des dépenses
        const totalExpenses = Math.abs(
            expenses.reduce((sum, t) => sum + t.amount, 0),
        )

        // 3. Grouper par catégorie
        const categories = [
            'food',
            'transport',
            'salary',
            'entertainment',
            'bills',
            'shopping',
        ]

        return categories
            .map((category) => {
                // Transactions de cette catégorie
                const categoryTxns = expenses.filter(
                    (t) => t.category === category,
                )

                // Total dépensé dans cette catégorie
                const total = Math.abs(
                    categoryTxns.reduce((sum, t) => sum + t.amount, 0),
                )

                // Pourcentage
                const percentage =
                    totalExpenses > 0 ? (total / totalExpenses) * 100 : 0

                return {
                    category,
                    count: categoryTxns.length,
                    total,
                    percentage: Math.round(percentage),
                }
            })
            .filter((item) => item.count > 0) // Garde seulement catégories avec dépenses
            .sort((a, b) => b.total - a.total) // Tri par total décroissant
    }, [filteredTransactions])

    return (
        <div className='dashboard'>
            {/* Header */}
            <div className='dashboard-header'>
                <h1>💰 Transaction Analytics</h1>
                <p>Analyze your financial transactions</p>
            </div>

            {/* TODO: Stats Cards */}
            <div className='stats-grid'>
                <div className='stat-card'>
                    <h3 className='stat-label'>
                        Revenue :{' '}
                        <span className='stat-card-value positive'>
                            {stats.revenue}€
                        </span>
                    </h3>
                </div>
                <div className='stat-card'>
                    <h3 className='stat-label'>
                        Expenses :{' '}
                        <span className='stat-card-value negative'>
                            {stats.expenses}€
                        </span>
                    </h3>
                </div>
                <div className='stat-card'>
                    <h3 className='stat-label'>
                        Balance :{' '}
                        <span className='stat-card-value'>
                            {stats.balance}€
                        </span>
                    </h3>
                </div>
                <div className='stat-card'>
                    <h3 className='stat-label'>
                        Average transaction amount :{' '}
                        <span className='stat-card-value positive'>
                            {stats.average}€
                        </span>
                    </h3>
                </div>
            </div>

            {/* TODO: Filters */}
            <div className='filter-section'>
                <div className='filters-grid'>
                    <div className='filter-group'>
                        <label htmlFor='startDate'>Start Date</label>
                        <input
                            name='startDate'
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className='filter-group'>
                        <label htmlFor='endDate'>End Date</label>
                        <input
                            name='endDate'
                            type='date'
                            value={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className='filter-group'>
                        <label htmlFor='category'>Category</label>
                        <select
                            name='category'
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            <option value='all'>All Categories</option>
                            <option value='food'>Food</option>
                            <option value='transport'>Transport</option>
                            <option value='salary'>Salary</option>
                            <option value='bills'>Bills</option>
                            <option value='shopping'>Shopping</option>
                            <option value='entertainment'>Entertainment</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* TODO: Breakdown */}
            <div className='breakdown-section'>
                <h2>💳 Spending by Category</h2>
                <div className='breakdown-grid'>
                    {breakdown.map((item) => (
                        <div
                            key={item.category}
                            className='breakdown-item'
                        >
                            {/* Nom catégorie */}
                            <div className='breakdown-category'>
                                {item.category}
                            </div>

                            {/* Barre de progression */}
                            <div className='breakdown-bar'>
                                <div
                                    className='breakdown-bar-fill'
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>

                            {/* Montant */}
                            <div className='breakdown-amount'>
                                €{item.total.toFixed(2)}
                            </div>

                            {/* Pourcentage */}
                            <div className='breakdown-percent'>
                                {item.percentage}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TODO: Transactions Table */}
            {/* Transactions Table */}
            <div className='transactions-section'>
                <h2>📊 Transactions ({filteredTransactions.length})</h2>

                <table className='transactions-table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Merchant</th>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions
                            .sort(
                                (a, b) =>
                                    new Date(b.date).getTime() -
                                    new Date(a.date).getTime(),
                            )
                            .slice(0, 20) // Max 20 transactions
                            .map((txn) => (
                                <tr key={txn.id}>
                                    <td>{txn.date}</td>
                                    <td>{txn.description}</td>
                                    <td>{txn.merchant}</td>
                                    <td>
                                        <span
                                            className={`category-badge ${txn.category}`}
                                        >
                                            {txn.category}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`amount ${txn.amount >= 0 ? 'positive' : 'negative'}`}
                                        >
                                            {txn.amount >= 0 ? '+' : ''}€
                                            {Math.abs(txn.amount).toFixed(2)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {filteredTransactions.length === 0 && (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '32px',
                            color: '#718096',
                        }}
                    >
                        No transactions found with current filters
                    </div>
                )}

                {filteredTransactions.length > 20 && (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '16px',
                            color: '#718096',
                            fontSize: '14px',
                        }}
                    >
                        Showing 20 of {filteredTransactions.length} transactions
                    </div>
                )}
            </div>
        </div>
    )
}
