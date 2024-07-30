import { useEffect, useState } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function useFilterChipRecipes(label, filterType, numericValue) {
    const [selectedState, setSelectedState] = useState(false)
    const { recipeFilter } = useRecipesContext()

    useEffect(() => {
        setSelectedState((prevSelectedState) => {
            if (filterType === "cuisineEthnicity") {
                return recipeFilter.cuisineEthnicity.some((cuisine) => cuisine.toLowerCase() === label.toLowerCase());
            } else if (filterType === "caloricApport" || filterType === "preparationTime" || filterType === "difficulty") {
                return recipeFilter[filterType] === numericValue;
            }
            return prevSelectedState; // Ritorna lo stato precedente se nessuna delle condizioni è verificata
        });
    }, [recipeFilter])
    

    return {
        selectedState,
    }
}
