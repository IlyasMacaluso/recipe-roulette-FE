import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"
import { useIngredientSuggestion } from "../Search/Suggestions/useIngredientSuggestion"
import { useSnackbar } from "../Snackbar/useSnackbar"

export function useIngredientCard(ing) {
    //Card State
    const { id, label, bg_color, is_blacklisted, is_selected } = ing
    const [cardState, setCardState] = useState({
        label: ing.name,
        id,
        bg_color,
        is_selected,
        is_blacklisted,
    })

    //Context Provider
    const { handleIngUpdate, handleIngDecrement, ingredients } = useManageIngredients()

    //Snackbar (for messages)
    const { handleOpenSnackbar } = useSnackbar()

    useEffect(() => {
        setCardState((prev) => {
            return { ...prev, is_selected: ing.is_selected }
        })
    }, [ing, ing.bg_color])

    function handleIngredientClick() {
        if (cardState.is_blacklisted && !cardState.is_selected) {
            handleOpenSnackbar("The ingredient is blacklisted!")
        } else if (!ingredients?.filteredFavorites.find((ing) => ing.id === cardState.id) && !cardState.is_selected) {
            handleOpenSnackbar("You have filteredFavorites this type of ingredeints!")
        } else {
            handleIngUpdate("is_selected", cardState)
        }
    }

    function handleXClick(e) {
        e.stopPropagation()
        if (cardState.is_selected) {
            handleIngredientClick()
        } else {
            handleIngDecrement(cardState.id, e)
        }
    }

    return {
        handleIngredientClick,
        handleXClick,
        setCardState,
        cardState,
    }
}
