import { useTasks } from './hooks/useTasks'
import { Board } from './components/Board/Board'
import { TaskForm } from './components/TaskForm/TaskForm'
import FilterProvider from './context/FilterProvider'
import FilterBar from './components/FilterBar/FilterBar'

export default function App() {
    const { state, deleteTask, createTask } = useTasks()

    if (state.status === 'loading') return <p>Chargement...</p>
    if (state.status === 'error') return <p>Erreur : {state.error}</p>
    if (state.status === 'idle') return null

    return (
        <FilterProvider>
            <div style={{ padding: '2rem' }}>
                <h1 style={{ marginBottom: '24px' }}>TaskBoard</h1>
                <TaskForm onCreate={createTask} />
                <FilterBar />
                <Board
                    tasks={state.data}
                    onDelete={deleteTask}
                />
            </div>
        </FilterProvider>
    )
}
