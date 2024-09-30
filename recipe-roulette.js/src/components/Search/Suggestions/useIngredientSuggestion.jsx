import { useEffect, useState } from "react"

export function useIngredientSuggestion(id, label, bg_color, is_selected, is_blacklisted) {
    const [ingState, setIngState] = useState({
        id,
        label,
        bg_color,
        is_selected,
        is_blacklisted,
    })

    useEffect(() => {
        setIngState((prev) => ({
            id,
            label,
            bg_color,
            is_selected,
            is_blacklisted,
        }))
    }, [id, label, bg_color, is_selected, is_blacklisted])

    return {
        ingState,
        setIngState,
    }
}
