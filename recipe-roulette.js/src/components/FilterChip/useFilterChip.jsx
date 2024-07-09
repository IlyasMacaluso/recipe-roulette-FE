import { useState } from "react"
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"

export function useFilterChips( id, label, bgColor, isSelected, isBlackListed )  {
    const [ingState, setIngState] = useState({
        id,
        label,
        bgColor,
        isSelected,
        isBlackListed
    })

    const { handleIngUpdate } = useManageIngredients()


    function handleDeselectChip() {
        handleIngUpdate("isBlackListed",ingState, setIngState)
    }

    return {
        handleDeselectChip,
    }
}
