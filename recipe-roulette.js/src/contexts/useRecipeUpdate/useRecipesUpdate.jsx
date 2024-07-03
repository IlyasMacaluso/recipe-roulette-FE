import { useAuth } from "../../hooks/Auth/useAuth"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"

export const useRecipesUpdate = (recipes, setRecipes ) => {
    const { setValue } = useLocalStorage()
     const { isAuthenticated } = useAuth() // Stato di autenticazione
    
    const handleRecipesUpdate = (recipe, setRecipe) => {
        const updatedRecipe = { ...recipe, isFavorited: !recipe.isFavorited }
        const isInResults = recipes.results.some((rec) => rec.id === recipe.id && rec.title === recipe.title)

        let newFavorites
        let newResults

        if (isInResults) {
            newFavorites = updatedRecipe.isFavorited
                ? [...recipes.favorited, updatedRecipe]
                : recipes.favorited.filter((rec) => rec.id !== recipe.id && rec.title !== recipe.title)

            newResults = recipes.results.map((rec) => (rec.id === recipe.id && rec.title === recipe.title ? updatedRecipe : rec))
        } else {
            newFavorites = updatedRecipe.isFavorited
                ? [...recipes.favorited, updatedRecipe]
                : recipes.favorited.filter((rec) => rec.id !== recipe.id && rec.title !== recipe.title)

            newResults = recipes.results
        }

        const updatedRecipes = {
            ...recipes,
            results: newResults,
            filtered: newFavorites,
            searched: newFavorites,
            favorited: newFavorites,
        }

        // Aggiornamento della variabile di stato recipes
        setRecipes(updatedRecipes)

        // Aggiornamento dello stato della card
        setRecipe(updatedRecipe)

        // Aggiornamento localStorage se autenticati
        isAuthenticated && setValue("recipes", updatedRecipes)
    }

    // Gestione della ricetta aperta a schermo intero
    const handleTargetedRecipe = (recipe) => {
        let updatedRecipes = { ...recipes, targetedRecipe: recipe }

        if (recipe) {
            setRecipes(updatedRecipes)
            setValue("recipes", updatedRecipes)
        }
    }

    return {
        handleRecipesUpdate,
        handleTargetedRecipe,
    }
}
