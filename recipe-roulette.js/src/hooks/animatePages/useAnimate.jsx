import { useEffect, useState } from "react"
import { useLocation } from  "@tanstack/react-router"

export function useAnimate() {
    const location = useLocation()
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setAnimate(true)
    }, [location])

    return { animate, setAnimate }
}
