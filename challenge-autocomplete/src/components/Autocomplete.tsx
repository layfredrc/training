import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { countries } from '../data/mockData'
import './Autocomplete.css'

export default function Autocomplete() {
    // TODO: Définir les states
    // - inputValue
    // - selectedIndex
    // - isOpen
    // - isLoading
    const [inputValue, setInputValue] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(-1) // rien selectionné
    const [isOpen, setIsOpen] = useState(false)
    // TODO: Debounce inputValue
    const debouncedValue = useDebounce(inputValue, 300)
    // ========== REFS ==========
    const dropdownRef = useRef<HTMLElement>(null)

    // Loading = true SI inputValue !== debouncedValue
    const isLoading = inputValue !== debouncedValue && inputValue.length > 0

    // TODO: Filtrer les pays en fonction du debouncedValue
    // - Case insensitive
    // - Max 10 résultats
    // ========== FILTERED DATA ==========
    const filteredCountries = useMemo(() => {
        if (!debouncedValue) return []

        return countries
            .filter((country) =>
                country.toLowerCase().includes(debouncedValue.toLowerCase()),
            )
            .slice(0, 10)
    }, [debouncedValue])

    // TODO: Gérer le keyboard (useEffect)
    // - Arrow Down
    // - Arrow Up
    // - Enter
    // - Escape

    // TODO: Gérer click outside (useEffect + useRef)

    // TODO: Fonction highlightMatch

    function renderList(items: string[]) {
        return (
            <ul className='autocomplete-dropdown'>
                {filteredCountries.map((country, index) => (
                    <li
                        key={country}
                        className={`autocomplete-item ${index === selectedIndex ? 'active' : ''}`}
                        onClick={() => selectCountry(country)}
                        onMouseEnter={() => setSelectedIndex(index)}
                    >
                        {highlightMatch(country, debouncedValue)}
                    </li>
                ))}
            </ul>
        )
    }

    // ========== FUNCTIONS ==========

    // Sélectionner un pays
    function selectCountry(country: string) {
        setInputValue(country)
        setIsOpen(false)
        setSelectedIndex(-1)
    }

    // Highlight le texte recherché
    function highlightMatch(text: string, query: string) {
        if (!query) return text

        const index = text.toLowerCase().indexOf(query.toLowerCase())
        if (index === -1) return text

        const before = text.slice(0, index)
        const match = text.slice(index, index + query.length)
        const after = text.slice(index + query.length)

        return (
            <>
                {before}
                <strong>{match}</strong>
                {after}
            </>
        )
    }

    // ========== KEYBOARD NAVIGATION ==========
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (!isOpen) return

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    setSelectedIndex((prev) =>
                        prev < filteredCountries.length - 1 ? prev + 1 : prev,
                    )
                    break

                case 'ArrowUp':
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
                    break

                case 'Enter':
                    e.preventDefault()
                    if (
                        selectedIndex >= 0 &&
                        selectedIndex < filteredCountries.length
                    ) {
                        selectCountry(filteredCountries[selectedIndex])
                    }
                    break

                case 'Escape':
                    setIsOpen(false)
                    setSelectedIndex(-1)
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, selectedIndex, filteredCountries])

    // ========== CLICK OUTSIDE ==========
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
                setSelectedIndex(-1)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // ========== RESET SELECTED INDEX WHEN FILTERING ==========
    useEffect(() => {
        setSelectedIndex(-1)
    }, [filteredCountries])

    return (
        <div className='autocomplete-container'>
            <input
                type='text'
                placeholder='Search for a country...'
                className='autocomplete-input'
                // TODO: value, onChange, onFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />

            {/* TODO: Dropdown avec suggestions */}
            {/* Afficher seulement si isOpen && filteredCountries.length > 0 */}
            {isOpen &&
                filteredCountries.length > 0 &&
                renderList(filteredCountries)}

            {/* TODO: Loading indicator */}
            {isLoading && (
                <div className='autocomplete-loading'>...Loading</div>
            )}

            {/* TODO: No results message */}
            {filteredCountries.length === 0 && (
                <div className='autocomplete-no-results'>
                    No Countries founded...
                </div>
            )}
        </div>
    )
}
