import { useEffect, useRef, useState } from "react"

export const useCenterItem = (n) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
    const refs = Array.from({ length: n }, () => useRef(null)) // create an array of refs, with length equal to the "n" parameter

    //determine if the keyboard is opened or not
    useEffect(() => {
        const screenHeight = window.screen.height

        const handleResize = () => {
            const currentHeight = window.innerHeight

            if (screenHeight * 0.7 > currentHeight) {
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
        // if the keyboard is opened, the item will be centered immediately
        if (isKeyboardOpen) {
            scrollItem()
        // if the keyboard is closed the item will be centered after a 200ms delay, (wait the new window.innerHeight before the item is centered)
        } else {
            setTimeout(() => scrollItem(), 150)
        }
    }

    return { scrollToCenter, refs }
}
