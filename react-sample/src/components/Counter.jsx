import React, { useState } from 'react'

export function Counter() {
    const [counter, setCounter] = useState(0)

    const increment = () => {
        setCounter(counter + 1)
    }

    return (
        <div>
            <h2>{counter}</h2>
            <button type="buton" onClick={increment}>Incrementar</button>
        </div>
    )
}