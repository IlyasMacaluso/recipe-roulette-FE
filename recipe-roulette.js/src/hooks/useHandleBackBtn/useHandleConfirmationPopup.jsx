import { useNavigate } from "@tanstack/react-router"
import { useCallback, useEffect } from "react"

export const useHandleConfirmationPopup = (condition, status) => {
    const navigate = useNavigate()
    const handleBackButton = useCallback(
        (event) => {
            console.log(status)
            if (condition) {
                event.preventDefault()
                navigate({ to: -1 })
            }
        },
        [condition, status, navigate]
    )

    useEffect(() => {
        if (condition) {
            window.history.pushState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
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
}
