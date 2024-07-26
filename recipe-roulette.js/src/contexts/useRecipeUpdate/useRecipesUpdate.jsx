import { useAuth } from "../../hooks/Auth/useAuth"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest"

export const useRecipesUpdate = (setRecipes) => {
    const { setValue, getValue } = useLocalStorage()
    const { handlePostRequest } = usePostRequest()
    const { isAuthenticated } = useAuth() // Stato di autenticazione

    const handleRecipesUpdate = (recipe, setRecipe) => {
        const updatedRecipe = { ...recipe, isFavorited: !recipe.isFavorited }
        setRecipes((prev) => {
            let newFavorites
            let newResults
            let newHistory

            newFavorites = updatedRecipe.isFavorited
                ? [...prev?.favorited, updatedRecipe]
                : prev?.favorited.filter((rec) => rec.id !== recipe.id && rec.title !== recipe.title)

            newResults = prev.results.map((rec) => (rec.id === recipe.id && rec.title === recipe.title ? updatedRecipe : rec))
            newHistory = prev.history.map((rec) => (rec.id === recipe.id && rec.title === recipe.title ? updatedRecipe : rec))

            const isTargetedRecipe = prev?.targetedRecipe?.id + prev?.targetedRecipe?.title === recipe.id + recipe.title

            const updatedRecipes = {
                ...prev,
                results: newResults,
                filtered: newFavorites || [],
                searched: newFavorites || [],
                favorited: newFavorites || [],
                history: newHistory || [],
                targetedRecipe: isTargetedRecipe ? updatedRecipe : prev.targetedRecipe,
            }

            // Aggiornamento localStorage e DB se autenticati
            if (isAuthenticated) {
                const userData = getValue("userData")
                setValue("recipes", updatedRecipes)
                const mutationId = updatedRecipe.id + updatedRecipe.title

                userData.id &&
                    handlePostRequest({
                        url: "http://localhost:3000/api/preferences/set-favorited-recipes",
                        payload: { recipe: updatedRecipe, userId: userData.id },
                        mutationId: mutationId,
                        queryKey: [["get-favorited-recipes"], ["get-recipes-history"]],
                    })

                userData.id &&
                    handlePostRequest({
                        url: "http://localhost:3000/api/preferences/update-recipes-history",
                        payload: { recipe: updatedRecipe, userId: userData.id },
                        mutationId: mutationId,
                        queryKey: [["get-favorited-recipes"], ["get-recipes-history"]],
                    })
            }

            return updatedRecipes
        })

        // Aggiornamento dello stato della card
        setRecipe(updatedRecipe)
    }

    // Gestione della ricetta aperta a schermo intero
    const handleTargetedRecipe = (recipe) => {
        if (!recipe) return
        setRecipes((prev) => {
            const updatedRecipes = { ...prev, targetedRecipe: recipe }

            // Aggiornamento localStorage se autenticati
            if (isAuthenticated) {
                setValue("recipes", updatedRecipes)

                const userData = getValue("userData")
                const mutationId = recipe.id + recipe.title

                userData.id &&
                    handlePostRequest({
                        url: "http://localhost:3000/api/preferences/update-recipes-history",
                        payload: { recipe, userId: userData.id },
                        mutationId: mutationId,
                        queryKey: [["get-recipes-history"]],
                    })
            }

            return updatedRecipes // Ritorna il nuovo stato aggiornato di recipes
        })
    }

    return {
        handleRecipesUpdate,
        handleTargetedRecipe,
    }
}
