import { useEffect, useRef, useState } from 'react'

// Timer.tsx
export default function Timer() {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    // TODO: Utilise useRef pour stocker l'interval ID
    const intervalRef = useRef<number>(0)

    const start = () => {
        // TODO: Start l'interval
        intervalRef.current = setInterval(() => {
            setSeconds((s) => s + 1)
        }, 1000)
        setIsRunning(true)
    }

    const stop = () => {
        // TODO: Clear l'interval
        clearInterval(intervalRef.current)
        setIsRunning(false)
    }

    const reset = () => {
        // TODO: Stop + reset à 0
        stop()
        setSeconds(0)
    }

    useEffect(() => {
        return () => clearInterval(intervalRef.current)
    }, [])

    return (
        <div>
            <h1>{seconds}s</h1>
            <button
                onClick={start}
                disabled={isRunning}
            >
                Start
            </button>
            <button
                onClick={stop}
                disabled={!isRunning}
            >
                Stop
            </button>
            <button onClick={reset}>Reset</button>
        </div>
    )
}
