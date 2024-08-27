import { useCallback, useEffect, useRef, useState } from "react"

export const useHandleBackButton = (condition, setCondition, setComponent, handleBlur) => {
    const [firstTime, setFirstTime] = useState(true)
    const inputRef = useRef(null)

    const handleBackButton = useCallback(
        (event) => {
            if (condition) {
                event.preventDefault()
                setFirstTime(true)
                if (inputRef.current) {
                    handleBlur(inputRef, { setCondition, setComponent }) // Update the focus state
                }
            }
        },
        [condition]
    )

    useEffect(() => {
        if (condition && firstTime) {
            window.history.pushState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
            setFirstTime(false)
        } else if (condition) {
            window.history.replaceState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
        } else {
            window.removeEventListener("popstate", handleBackButton)
        }

        return () => {
            window.removeEventListener("popstate", handleBackButton)
        }
    }, [condition, firstTime, handleBackButton])

    return { inputRef}
}
