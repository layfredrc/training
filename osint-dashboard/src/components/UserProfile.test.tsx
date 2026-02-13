import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import UserProfile from './UserProfile'

// Helper pour mock fetch
const mockFetch = (data: unknown, ok = true) => {
    return vi.mocked(global.fetch).mockResolvedValueOnce({
        ok,
        json: async () => data,
    } as Response)
}

const mockFetchError = (error: Error) => {
    return vi.mocked(global.fetch).mockRejectedValueOnce(error)
}

// Mock fetch globalement
global.fetch = vi.fn()

describe('UserProfile', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    test('should show loading state initially', () => {
        vi.mocked(global.fetch).mockReturnValue(new Promise(() => {}))

        render(<UserProfile userId='1' />)

        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    test('should display user data after successful fetch', async () => {
        mockFetch({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
        })

        render(<UserProfile userId='1' />)

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument()
            expect(screen.getByText('john@example.com')).toBeInTheDocument()
        })
    })

    test('should display error on fetch failure', async () => {
        mockFetchError(new Error('Network error'))

        render(<UserProfile userId='1' />)

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument()
        })
    })

    test('should refetch when userId changes', async () => {
        mockFetch({
            id: '1',
            name: 'User 1',
            email: 'user1@example.com',
        })

        const { rerender } = render(<UserProfile userId='1' />)

        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument()
        })

        mockFetch({
            id: '2',
            name: 'User 2',
            email: 'user2@example.com',
        })

        rerender(<UserProfile userId='2' />)

        await waitFor(() => {
            expect(screen.getByText('User 2')).toBeInTheDocument()
        })

        expect(global.fetch).toHaveBeenCalledTimes(2)
    })
})
