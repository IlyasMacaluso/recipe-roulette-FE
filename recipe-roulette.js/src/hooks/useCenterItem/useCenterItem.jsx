import { useEffect, useRef, useState } from "react"

export const useCenterItem = (n) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
    const refs = Array.from({ length: n }, () => useRef(null)) // crea un array di refs di lunghezza parai al parametro "n"

    useEffect(() => {
        const screenHeight = window.screen.height

        const handleResize = () => {
            const currentHeight = window.innerHeight

            if (screenHeight * 0.8 > currentHeight) {
                setIsKeyboardOpen(true)
            } else {
                setIsKeyboardOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])


    const scrollToCenter = (currentRef) => {

        const scrollItem = () => {
            currentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
        }

        if (isKeyboardOpen) {
            scrollItem()
        } else {
            setTimeout(() => scrollItem(), 200)
        }
    }

    return { scrollToCenter, refs }
}
