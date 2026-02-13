import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom' // ← Import ici
import SearchTermInput from './SearchTermInput'
import { FilterProvider } from '../context/FilterProvider'
import type { ReactElement } from 'react'

function renderWithProvider(children: ReactElement) {
    return render(<FilterProvider>{children}</FilterProvider>)
}

describe('SearchInputTerm', () => {
    test('should render with placeholder', () => {
        // TODO: Vérifie que l'input a le bon placeholder
        renderWithProvider(<SearchTermInput />)
        const placeholder = screen.getByPlaceholderText(
            '192.168.1.1 or example.com',
        )
        expect(placeholder).toBeInTheDocument()
    })

    test('should call onChange when typing', async () => {
        // TODO: Mock onChange, simule typing avec userEvent
        const user = userEvent.setup()

        // render, type, assert
        renderWithProvider(<SearchTermInput />)
        const input = screen.getByRole('textbox', {
            name: 'Search (IP or Domain)',
        })
        // fireEvent.change(input, { target: { value: 'm' } })
        await user.type(input, 'm')
        expect(input).toHaveValue('m')
    })

    test('should clear input when clicking clear button', async () => {
        // TODO: Simule un clear
        renderWithProvider(<SearchTermInput />)
        screen.debug() // Affiche tout
        // screen.logTestingPlaygroundURL() // Ouvre Testing Playground
        const user = userEvent.setup()

        const input = screen.getByRole('textbox', {
            name: 'Search (IP or Domain)',
        })
        const button = screen.getByRole('button', {
            name: 'Reset',
        })
        // fireEvent.change(input, { target: { value: 'm' } })
        await user.type(input, 'm')
        expect(input).toHaveValue('m')
        await user.click(button)
        expect(input).toHaveValue('')
    })

    test('should focus input on mount', () => {
        // TODO: Vérifie que l'input est auto-focus
        renderWithProvider(<SearchTermInput />)

        const input = screen.getByRole('textbox', {
            name: 'Search (IP or Domain)',
        })

        expect(input).toHaveFocus()
    })
})
