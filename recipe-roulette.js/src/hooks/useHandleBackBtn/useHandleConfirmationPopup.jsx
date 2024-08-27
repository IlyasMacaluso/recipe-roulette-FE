import { useNavigate } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"

export const useHandleConfirmationPopup = (condition, status) => {
    const [firstTime, setFirstTime] = useState(true)
    const navigate = useNavigate()

    const handleBackButton = useCallback(
        (event) => {
            if (condition) {
                event.preventDefault()
                navigate({ to: "/" })

                // senza setTimeout viene impostato firstTime = false subito dopo (forse il listener lo  intercetta un ultima volta prima rimuovere l'event lintener?)
                setTimeout(() => {
                    setFirstTime(true)
                }, 100)
            }
        },
        [condition, status, navigate]
    )

    useEffect(() => {
        if (condition) {
            window.history.pushState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
            setFirstTime(false)
        } else if (condition && status !== "blocked") {
            window.history.replaceState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
        } else {
            window.removeEventListener("popstate", handleBackButton)
        }

        return () => {
            window.removeEventListener("popstate", handleBackButton)
        }
    }, [condition, handleBackButton])

    return { firstTime }
}
