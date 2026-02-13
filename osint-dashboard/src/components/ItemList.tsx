import { memo, useCallback, useState } from 'react'

// Item.tsx
interface ItemProps {
    id: string
    name: string
    onDelete: (id: string) => void
}

const Item = memo<ItemProps>(({ id, name, onDelete }) => {
    console.log(`Rendering item ${id}`)

    return (
        <div>
            {name}
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
})

Item.displayName = 'Item'

// ItemList.tsx
export default function ItemList() {
    const [items, setItems] = useState([
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
        { id: '4', name: 'Item 4' },
        { id: '5', name: 'Item 5' },
    ])

    // TODO: Stabilise cette fonction avec useCallback
    const handleDelete = useCallback((id: string) => {
        console.log('Deleting', id)
        setItems((prev) => prev.filter((item) => item.id !== id))
    }, [])

    return (
        <div>
            <h2>Items: {items.length}</h2>
            {items.map((item) => (
                <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    )
}
