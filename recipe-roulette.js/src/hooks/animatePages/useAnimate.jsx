import { useEffect, useState } from "react"
import { useLocation } from  "@tanstack/react-router"

export function useAnimate(destination) {
    const location = useLocation()
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        destination === location.pathname ? setAnimate(true) : setAnimate(false)
    }, [location])

    return { animate, setAnimate }
}
