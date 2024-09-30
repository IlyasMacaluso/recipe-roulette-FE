import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"
import { useSnackbar } from "../Snackbar/useSnackbar"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function useIngredientCard(ing) {
    //Card State
    const { id, name, bg_color, is_blacklisted, is_selected, is_gluten_free, is_vegetarian, is_vegan } = ing
    const [cardState, setCardState] = useState({
        label: name,
        id,
        bg_color,
        is_selected,
        is_blacklisted,
        is_gluten_free,
        is_vegetarian,
        is_vegan,
    })

    //Context Provider
    const { handleIngUpdate, handleIngDecrement, ingredients } = useManageIngredients()
    const { recipePreferences } = useRecipesContext()

    //Snackbar (for messages)
    const { handleOpenSnackbar } = useSnackbar()

    useEffect(() => {
        setCardState((prev) => {
            return {
                label: name,
                id,
                bg_color,
                is_selected,
                is_blacklisted,
                is_gluten_free,
                is_vegetarian,
                is_vegan,
            }
        })
    }, [ing])

    function handleIngredientClick() {
        if (cardState.is_blacklisted && !cardState.is_selected) {
            handleOpenSnackbar("The ingredient is blacklisted!")
        } else if (!ingredients?.filteredFavorites.find((ing) => ing.id === cardState.id) && !cardState.is_selected) {
            const glutenFree = recipePreferences.is_gluten_free && !cardState.is_gluten_free ? "gluten free" : ""
            const vegetarian =
                recipePreferences.is_vegetarian && !cardState.is_vegetarian ? (glutenFree ? ", vegetarian" : " vegetarian") : ""
            const vegan = recipePreferences.is_vegan && !cardState.is_vegan ? (vegetarian || glutenFree ? ", vegan" : " vegan") : ""

            handleOpenSnackbar(`You have filtered non ${glutenFree}${vegetarian}${vegan} ingredeints!`)
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
