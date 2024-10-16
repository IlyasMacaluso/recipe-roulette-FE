import { useEffect, useState } from "react"

export function useDebounce(value, delay = 300) {
    const [debounceValue, setDebounceValue] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        
        return () => clearTimeout(timeout)
    }, [value, delay])

    return { debounceValue }
}
