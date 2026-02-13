import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredData } from './useFilteredData'
import type { IntelligenceEntry } from '../data/mockData'

describe('useFilteredData', () => {
    const mockData: IntelligenceEntry[] = [
        {
            id: 'entry-0',
            ipAddress: '110.11.98.51',
            country: 'UK',
            timestamp: new Date('2026-01-19T23:09:50.191Z'),
            riskScore: 37,
            category: 'botnet',
            domain: 'malicious.org',
        },
        {
            id: 'entry-7',
            ipAddress: '110.11.98.51',
            country: 'IN',
            timestamp: new Date('2026-01-24T17:51:16.801Z'),
            riskScore: 45,
            category: 'suspicious',
            domain: 'malicious.org',
        },
        {
            id: 'entry-8',
            ipAddress: '151.207.39.129',
            country: 'DE',
            timestamp: new Date('2026-01-20T01:27:57.367Z'),
            riskScore: 2,
            category: 'malware',
            domain: 'test.net',
        },
    ]

    function createFilters(overrides = {}) {
        return {
            searchTerm: '',
            riskThreshold: 0,
            selectedCategory: 'all' as const,
            ...overrides,
        }
    }

    function renderFilterHook(filters = {}) {
        return renderHook(
            ({ data, filters }) => useFilteredData(data, filters),
            {
                initialProps: {
                    data: mockData,
                    filters: createFilters(filters),
                },
            },
        )
    }

    it('should return all data when no filters', () => {
        const { result } = renderFilterHook()
        expect(result.current).toStrictEqual(mockData)
    })

    it('should filter by searchTerm (IP)', () => {
        const { result } = renderFilterHook({ searchTerm: '110.11.' })

        expect(result.current).toHaveLength(2)
        expect(
            result.current.every((e) => e.ipAddress.includes('110.11.')),
        ).toBe(true)
    })

    it('should filter by searchTerm (domain)', () => {
        const { result } = renderFilterHook({ searchTerm: 'test.net' })

        expect(result.current).toHaveLength(1)
        expect(result.current[0].domain).toBe('test.net')
    })

    it('should filter by riskThreshold', () => {
        const { result } = renderFilterHook({ riskThreshold: 40 })

        expect(result.current).toHaveLength(1)
        expect(result.current.every((e) => e.riskScore >= 40)).toBe(true)
    })

    it('should filter by category', () => {
        const { result } = renderFilterHook({ selectedCategory: 'malware' })

        expect(result.current).toHaveLength(1)
        expect(result.current[0].category).toBe('malware')
    })

    it('should combine multiple filters', () => {
        const { result } = renderFilterHook({
            searchTerm: '110.11',
            riskThreshold: 20,
            selectedCategory: 'botnet',
        })

        expect(result.current).toHaveLength(1)
        expect(result.current[0].id).toBe('entry-0')
    })

    it('should be case-insensitive', () => {
        const { result } = renderFilterHook({ searchTerm: 'TEST.NET' })
        expect(result.current).toHaveLength(1)
    })

    it('should return empty array when no matches', () => {
        const { result } = renderFilterHook({ searchTerm: 'nonexistent' })
        expect(result.current).toHaveLength(0)
    })

    it('should handle empty data', () => {
        const { result } = renderHook(
            ({ data, filters }) => useFilteredData(data, filters),
            {
                initialProps: {
                    data: [],
                    filters: createFilters(),
                },
            },
        )
        expect(result.current).toHaveLength(0)
    })
})
