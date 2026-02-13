// useDebounce.test.ts
import { describe, test, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useDebounce } from './useDebounce'
import { act } from 'react'

describe('useDebounce', () => {
    test('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('test', 300))
        expect(result.current).toBe('test')
    })

    test('should debounce value changes', async () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 300 } },
        )

        expect(result.current).toBe('initial')

        rerender({ value: 'updated', delay: 300 })
        expect(result.current).toBe('initial')

        await waitFor(
            () => {
                expect(result.current).toBe('updated')
            },
            { timeout: 400 },
        )
    })
    test('should cancel previous timeout', async () => {
        vi.useFakeTimers()

        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } },
        )

        act(() => {
            rerender({ value: 'b' })
            rerender({ value: 'c' })
            rerender({ value: 'd' })
            vi.runAllTimers()
        })

        // Attends que React flush les updates
        await waitFor(() => {
            expect(result.current).toBe('d')
        })

        vi.useRealTimers()
    })

    test('should work with different delay values', async () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'hello', delay: 500 } },
        )

        expect(result.current).toBe('hello')

        rerender({ value: 'hello world', delay: 500 })
        expect(result.current).toBe('hello')

        await waitFor(
            () => {
                expect(result.current).toBe('hello world')
            },
            { timeout: 600 },
        )
    })
})
