import { useState } from "react"

export function useSearchSuggestion(id, label, bgColor, isSelected, isBlackListed) {
    const [ingState, setIngState] = useState({
        id,
        label,
        bgColor,
        isSelected,
        isBlackListed,
    })

    return {
        ingState,
        setIngState,
    }
}
