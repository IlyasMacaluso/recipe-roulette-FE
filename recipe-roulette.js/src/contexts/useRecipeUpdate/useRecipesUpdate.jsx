import { useAuth } from "../../hooks/Auth/useAuth"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest"
import { useDebounce } from "../../hooks/useDebounce/useDebounce"
import { useCallback, useEffect, useState } from "react"

export const useRecipesUpdate = (recipes, setRecipes) => {
    const [currentRecipe, setCurrentRecipe] = useState(null)
    const { setValue, getValue } = useLocalStorage()
    const { handlePostRequest } = usePostRequest()
    const { isAuthenticated } = useAuth() // Stato di autenticazione
    const { debounceValue } = useDebounce(currentRecipe)

    useEffect(() => {
        //chiamata di rete quando cambia il valore di debounce (ricetta da aggiornare)
        if (isAuthenticated) {
            const userData = getValue("userData")

            if (currentRecipe) {
                handlePostRequest({
                    url: "http://localhost:3000/api/preferences/set-favorited-recipes",
                    payload: { recipe: currentRecipe, userId: userData.id },
                })

                handlePostRequest({
                    url: "http://localhost:3000/api/preferences/update-recipes-history",
                    payload: { recipe: currentRecipe, userId: userData.id },
                })
            }
        }
    }, [debounceValue])

    const handleRecipesUpdate = (recipe, setRecipe) => {
        const updatedRecipe = { ...recipe, isFavorited: !recipe.isFavorited }

        setCurrentRecipe(updatedRecipe)

        setRecipes((prev) => {
            let newFavorites
            let newResults
            let newHistory

            newFavorites = updatedRecipe.isFavorited
                ? [...prev?.favorited, updatedRecipe]
                : prev?.favorited.filter((rec) => rec.id !== recipe.id && rec.title !== recipe.title)

            newResults = prev.results.map((rec) => (rec.id === recipe.id && rec.title === recipe.title ? updatedRecipe : rec))
            newHistory = prev.history.map((rec) => (rec.id === recipe.id && rec.title === recipe.title ? updatedRecipe : rec))

            const isTargetedRecipe = prev?.targetedRecipe?.id + prev?.targetedRecipe?.title === `${recipe.id}_${recipe.title}`

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
        setRecipes((prev) => {
            const updatedRecipes = { ...prev, targetedRecipe: recipe }

            // Aggiornamento localStorage se autenticati
            if (isAuthenticated) {
                setValue("recipes", updatedRecipes)

                const userData = getValue("userData")
                const mutationId = `${recipe.id}_${recipe.title}`

                userData.id &&
                    handlePostRequest({
                        url: "http://localhost:3000/api/preferences/update-recipes-history",
                        payload: { recipe, userId: userData.id },
                        mutationId: mutationId,
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
