import { useMemo, useState } from 'react'

// ProductList.tsx
interface Product {
    id: number
    name: string
    price: number
    category: string
}

// Generate mock data
function generateProducts(count: number): Product[] {
    const categories = ['electronics', 'books', 'clothing', 'food']
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        name: `Product ${i}`,
        price: Math.random() * 1000,
        category: categories[Math.floor(Math.random() * categories.length)],
    }))
}

function ProductList({
    minPrice,
    category,
}: {
    minPrice: number
    category: string
}) {
    const allProducts = useMemo(() => generateProducts(10000), [])

    // TODO: Mémoïze ce calcul coûteux
    const filteredProducts = useMemo(() => {
        console.time('filter') // ← DANS le useMemo

        const result = allProducts
            .filter((p) => p.price >= minPrice)
            .filter((p) => category === 'all' || p.category === category)
            .sort((a, b) => b.price - a.price)

        console.timeEnd('filter') // ← DANS le useMemo
        return result
    }, [allProducts, minPrice, category])

    return (
        <div>
            <p>Found: {filteredProducts.length} products</p>
            {filteredProducts.slice(0, 20).map((p) => (
                <div key={p.id}>
                    {p.name} - ${p.price.toFixed(2)}
                </div>
            ))}
        </div>
    )
}

// Parent component pour tester
export function ProductListContainer() {
    const [minPrice, setMinPrice] = useState(0)
    const [category, setCategory] = useState('all')
    const [counter, setCounter] = useState(0) // Pour forcer re-render

    return (
        <div>
            <button onClick={() => setCounter((c) => c + 1)}>
                Re-render ({counter})
            </button>
            <input
                type='range'
                min='0'
                max='1000'
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value='all'>All</option>
                <option value='electronics'>Electronics</option>
                <option value='books'>Books</option>
            </select>

            <ProductList
                minPrice={minPrice}
                category={category}
            />
        </div>
    )
}
