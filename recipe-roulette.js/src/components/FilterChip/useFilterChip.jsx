import { useState } from "react"
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"

export function useFilterChips( id, label, bg_color, is_selected, is_blacklisted )  {
    const [ingState, setIngState] = useState({
        id,
        label,
        bg_color,
        is_selected,
        is_blacklisted
    })

    const { handleIngUpdate } = useManageIngredients()


    function handleDeselectChip() {
        handleIngUpdate("is_blacklisted",ingState, setIngState)
    }

    return {
        handleDeselectChip,
    }
}
