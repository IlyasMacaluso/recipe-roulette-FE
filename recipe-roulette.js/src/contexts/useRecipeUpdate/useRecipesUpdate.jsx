import { useAuth } from "../../hooks/Auth/useAuth"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest"
import { useDebounce } from "../../hooks/useDebounce/useDebounce"
import { useCallback, useEffect, useState } from "react"

export const useRecipesUpdate = (recipes, setRecipes) => {
    const [updatedRec, setUpdatedRec] = useState({ previous: null, current: null })
    const { setValue, getValue } = useLocalStorage()
    const { handlePostRequest } = usePostRequest()
    const { isAuthenticated } = useAuth() // Stato di autenticazione
    const { debounceValue } = useDebounce(updatedRec.current)

    useEffect(() => {
        //chiamata di rete quando cambia il valore di debounce (ricetta da aggiornare)
        if (isAuthenticated) {
            const userData = getValue("userData")

            if (!updatedRec.current) {
                return
            }

            handlePostRequest({
                url: "http://localhost:3000/api/preferences/set-favorited-recipes",
                payload: { recipe: updatedRec.current, userId: userData.id },
            })

            handlePostRequest({
                url: "http://localhost:3000/api/preferences/update-recipes-history",
                payload: { recipe: updatedRec.current, userId: userData.id },
            })
        }
    }, [debounceValue])

    useEffect(() => {
        //chiamata di rete quando cambia il updatedRec.previous (durante l'attesa del valore di debounce,)
        if (isAuthenticated) {
            const userData = getValue("userData")

            const prevRecId = `${updatedRec.previous?.id}_${updatedRec.previous?.title}`
            const currentRecId = `${updatedRec.current?.id}_${updatedRec.current?.title}`

            //se la ricetta precedente è la stessa (quindi è stata modificata la prop isFavorited), non aggiornare adesso
            if (!updatedRec.previous || prevRecId === currentRecId) {
                return
            }

            // attende 300ms per aggiornare
                handlePostRequest({
                    url: "http://localhost:3000/api/preferences/set-favorited-recipes",
                    payload: { recipe: updatedRec.previous, userId: userData.id },
                })

                handlePostRequest({
                    url: "http://localhost:3000/api/preferences/update-recipes-history",
                    payload: { recipe: updatedRec.previous, userId: userData.id },
                })
        }
    }, [updatedRec.previous])

    const handleRecipesUpdate = (recipe, setRecipe) => {
        const updatedRecipe = { ...recipe, isFavorited: !recipe.isFavorited }

        if (!updatedRec.current) {
            setUpdatedRec((prev) => ({ ...prev, current: updatedRecipe }))
        } else {
            setUpdatedRec((prev) => ({ previous: prev.current, current: updatedRecipe }))
        }

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
                filteredFavorites: newFavorites || [],
                searchFavorites: newFavorites || [],
                favorited: newFavorites || [],
                history: newHistory || [],
                filteredHistory: newHistory || [],
                searchHistory: newHistory || [],
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
