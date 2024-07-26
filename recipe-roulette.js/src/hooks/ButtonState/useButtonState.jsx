import { useMemo, useState } from "react"

export function useButtonState(ingredients) {
    const [isActive, setIsActive] = useState(true)

    const setButtonState = useMemo(() => {
        ingredients?.displayed.length === 8 ? setIsActive(false) : setIsActive(true)
    }, [ingredients?.displayed.length])

    return { isActive, setIsActive }
}
