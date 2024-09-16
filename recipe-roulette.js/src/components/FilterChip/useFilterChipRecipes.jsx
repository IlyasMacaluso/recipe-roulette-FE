import { useEffect, useState } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function useFilterChipRecipes(filters, filterType, propValue) {
    const [selectedState, setSelectedState] = useState(false)
    const { recipePreferences, recipeFilters } = useRecipesContext()

    useEffect(() => {
        setSelectedState((prevSelectedState) => {
            if (filterType === "cuisineEthnicity") {
                return filters === "recipePreferences"
                    ? recipePreferences.cuisineEthnicity.some((cuisine) => cuisine === propValue)
                    : recipeFilters.cuisineEthnicity.some((cuisine) => cuisine === propValue)
            } else if (filterType === "caloricApport" || filterType === "preparationTime" || filterType === "difficulty") {
                return filters === "recipePreferences"
                    ? recipePreferences[filterType] === propValue
                    : recipeFilters[filterType] === propValue
            } else {
                return prevSelectedState // Ritorna lo stato precedente se nessuna delle condizioni è verificata
            }
        })
    }, [recipePreferences, recipeFilters])

    return {
        selectedState,
    }
}
