import { useAuth } from "../../hooks/Auth/useAuth"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"

export const useRecipesUpdate = (setRecipes) => {
    const { setValue } = useLocalStorage()
    const { isAuthenticated } = useAuth() // Stato di autenticazione

    const handleRecipesUpdate = (recipe, setRecipe) => {
        let updatedRecipe = { ...recipe, isFavorited: !recipe.isFavorited }
        setRecipes((prevRecipes) => {
            const isInResults = prevRecipes.results.some((rec) => rec.id === recipe.id && rec.title === recipe.title)

            let newFavorites
            let newResults

            if (isInResults) {
                newFavorites = updatedRecipe.isFavorited
                    ? [...prevRecipes.favorited, updatedRecipe]
                    : prevRecipes.favorited.filter((rec) => rec.id !== recipe.id && rec.title !== recipe.title)

                newResults = prevRecipes.results.map((rec) =>
                    rec.id === recipe.id && rec.title === recipe.title ? updatedRecipe : rec
                )
            } else {
                newFavorites = updatedRecipe.isFavorited
                    ? [...prevRecipes.favorited, updatedRecipe]
                    : prevRecipes.favorited.filter((rec) => rec.id !== recipe.id && rec.title !== recipe.title)

                newResults = prevRecipes.results
            }

            const updatedRecipes = {
                ...prevRecipes,
                results: newResults,
                filtered: newFavorites,
                searched: newFavorites,
                favorited: newFavorites,
            }

            // Aggiornamento localStorage se autenticati
            if (isAuthenticated) {
                setValue("recipes", updatedRecipes)
            }

            return updatedRecipes
        })

        // Aggiornamento dello stato della card
        setRecipe(updatedRecipe)
    }

    // Gestione della ricetta aperta a schermo intero
    const handleTargetedRecipe = (recipe) => {
        if (!recipe) return
        setRecipes((prevRecipes) => {
            const updatedRecipes = { ...prevRecipes, targetedRecipe: recipe }

            // Aggiornamento localStorage se autenticati
            if (isAuthenticated) {
                setValue("recipes", updatedRecipes)
            }            
            
            return updatedRecipes // Ritorna il nuovo stato aggiornato di recipes
        })
    }

    return {
        handleRecipesUpdate,
        handleTargetedRecipe,
    }
}
