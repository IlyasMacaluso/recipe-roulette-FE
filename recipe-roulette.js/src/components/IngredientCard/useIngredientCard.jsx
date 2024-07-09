import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"
import { useIngredientSuggestion } from "../Search/Suggestions/useIngredientSuggestion"
import { useSnackbar } from "../Snackbar/useSnackbar"

export function useIngredientCard(ing) {
    //Card State
    const { id, label, bgColor, isBlackListed, isSelected } = ing
    const [cardState, setCardState] = useState({
        label: ing.name,
        id,
        bgColor,
        isSelected,
        isBlackListed,
    })

    //Context Provider
    const { handleIngUpdate, handleIngDecrement, ingredients } = useManageIngredients()

    //Snackbar (for messages)
    const { handleOpenSnackbar } = useSnackbar()

    useEffect(() => {
        console.log(ing)
        setCardState((old) => {
            return { ...old, isSelected: ing.isSelected }
        })
    }, [ing])

    function handleIngredientClick() {
        if (cardState.isBlackListed && !cardState.isSelected) {
            handleOpenSnackbar("The ingredient is blacklisted!")
        } else if (!ingredients.filtered.find((ing) => ing.id === cardState.id) && !cardState.isSelected) {
            handleOpenSnackbar("You have filtered this type of ingredeints!")
        } else {
            handleIngUpdate("isSelected", cardState)
        }
    }

    function handleXClick(e) {
        e.stopPropagation()
        if (cardState.isSelected) {
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
