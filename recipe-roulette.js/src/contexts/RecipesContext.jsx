import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "@tanstack/react-router"
import { useAuth } from "../hooks/Auth/useAuth"
import { useFetchPreferences } from "../hooks/fetchPreferences/useFetchPreferences"
import { useLocalStorage } from "../hooks/useLocalStorage/useLocalStorage"
import { useRecipesUpdate } from "./useRecipeUpdate/useRecipesUpdate"
import { useRecipeFilter } from "./useRecipeFilter/useRecipeFilter"
import { useQuery } from "@tanstack/react-query"
import { useGetRequest } from "../hooks/useGetRequest/useGetRequest"

const RecipesContext = createContext()

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState({
        results: [],
        favorited: [],
        filtered: [],
        searched: [],
        history: [],
        targetedRecipe: null,
    }) //stato delle ricette
    
    const location = useLocation()

    const [inputValue, setInputValue] = useState("") // Valore dell'input che filtra i risultati
    const [recipeAnimation, setRecipeAnimation] = useState(true) // Stato per animare le recipeCard quando vengono modificati i filtri

    const { isAuthenticated } = useAuth() // Stato di autenticazione
    const { getValue, setValue } = useLocalStorage()
    const { getRequest } = useGetRequest()

    // funzioni di gestione filtri ricetta
    const { recipeFilter, setRecipeFilter, toggleRecipeFilter, handlePreferencesToggle, handleDeselectRecipeFilters } =
        useRecipeFilter(isAuthenticated)

    // funzioni per aggiornare le ricette
    const { handleRecipesUpdate, handleTargetedRecipe } = useRecipesUpdate(setRecipes)

    //fetch ricette preferite
    const {
        data: DBFAvorited,
        error: favoritedError,
        isLoading: favoritedLoading,
    } = useQuery({
        queryKey: ["get-favorited-recipes"],
        queryFn: async () => {
            const { id } = getValue("userData")
            const res = await getRequest(`http://localhost:3000/api/preferences/get-favorited-recipes/${id}`)
            return res
        },
    })

    //fetch preferenze dietetiche
    const {
        data: DBFoodPref,
        error: foodPrefError,
        isLoading: foodPrefLoading,
    } = useQuery({
        queryKey: ["get-food-preferences"],
        queryFn: async () => {
            const { id } = getValue("userData")
            const res = await getRequest(`http://localhost:3000/api/preferences/get-preferences/${id}`)
            return res
        },
    })

    //fetch cronologia ricette
    const {
        data: recipesHistory,
        error: historyError,
        isLoading: historyLoading,
    } = useQuery({
        queryKey: ["get-recipes-history"],
        queryFn: async () => {
            const { id } = getValue("userData")
            const res = await getRequest(`http://localhost:3000/api/preferences/get-recipes-history/${id}`)
            return res
        },
    })

    useEffect(() => {
        const localRecipes = getValue("recipes")
        const localFilters = getValue("recipeFilter")

        localRecipes?.favorited && setRecipes(localRecipes)

        localFilters && setRecipeFilter(localFilters)
        localFilters && setValue("recipes", localRecipes)

        if (isAuthenticated) {
            if (!favoritedLoading && !foodPrefLoading && !historyLoading) {
                const DBRecipes = {
                    ...localRecipes,
                    results: localRecipes.results || [],
                    favorited: DBFAvorited || [],
                    filtered: DBFAvorited || [],
                    searched: DBFAvorited || [],
                    history: recipesHistory || [],
                }

                setRecipes(DBRecipes)
                setValue("recipeFilter", DBFoodPref)

                DBFoodPref && setRecipeFilter(DBFoodPref)
                DBFoodPref && setValue("recipes", DBRecipes)
            }
        } else {
            // Se non si è autenticati, setta isFavorited:false (nella variabile di stato)
            const resetRecipeList = (list) => {
                if (list && list.length > 0) {
                    return list.map((rec) => ({ ...rec, isFavorited: false }))
                }
                return []
            }

            setRecipes((prevRecipes) => {
                if (localRecipes) {
                    return {
                        ...prevRecipes,
                        results: resetRecipeList(localRecipes.results) || [],
                        filtered: [],
                        targetedRecipe: localRecipes.targetedRecipe ? { ...prevRecipes.targetedRecipe, isFavorited: false } : null,
                        favorited: [],
                        searched: [],
                        history: [],
                    }
                }

                return prevRecipes // Se localRecipes non è definito, ritorna lo stato corrente senza modifiche
            })
        }
    }, [isAuthenticated, favoritedLoading, historyLoading, recipesHistory, foodPrefLoading, location.pathname])

    // Animazione recipeCard
    useEffect(() => {
        if (location.pathname === "/favorited") {
            recipeAnimation && setTimeout(() => setRecipeAnimation(false), 0) // Se è già in corso, resetta
            setTimeout(() => setRecipeAnimation(true), 300)
        }
    }, [recipeFilter])

    // Reset dell'inputValue quando si cambia pagina
    useEffect(() => {
        setInputValue("")
    }, [location.pathname])

    // Filtro i risultati quando viene modificato l'input
    useEffect(() => {
        setRecipes((prevRecipes) => {
            if (prevRecipes.filtered && prevRecipes.filtered.length > 0) {
                const newFiltered = prevRecipes.filtered.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))

                return { ...prevRecipes, searched: newFiltered }
            }
            return prevRecipes
        })
    }, [inputValue])

    // Aggiorno le ricette visualizzate quando vengono modificati i filtri o aggiunti preferiti
    useEffect(() => {
        if (favoritedLoading || foodPrefLoading || historyLoading) return // Wait until data is loaded
        setRecipes((prevRecipes) => {
            // Copia delle ricette originali per lavorarci in modo sicuro
            const updatedFiltered = prevRecipes.favorited.filter((rec) => {
                return (
                    rec.caloricApport <= recipeFilter.caloricApport &&
                    rec.preparationTime <= recipeFilter.preparationTime &&
                    (recipeFilter.is_gluten_free ? rec.is_gluten_free : true) &&
                    (recipeFilter.is_vegetarian ? rec.is_vegetarian : true) &&
                    (recipeFilter.is_vegan ? rec.is_vegan : true) &&
                    (recipeFilter.cuisineEthnicity.includes("all") ||
                        recipeFilter.cuisineEthnicity.includes(rec.cuisineEthnicity.toLowerCase())) &&
                    (recipeFilter.difficulty === "all" || recipeFilter.difficulty.toLowerCase() === rec.difficulty.toLowerCase())
                )
            })

            // Ritorna il nuovo stato di recipes aggiornato, mantenendo inalterate le altre proprietà
            return {
                ...prevRecipes,
                filtered: updatedFiltered,
            }
        })
    }, [recipeFilter, recipes.favorited, favoritedLoading, historyLoading, foodPrefLoading])

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                inputValue,
                recipeAnimation,
                recipeFilter,
                favoritedLoading,
                foodPrefLoading,
                historyLoading,
                handleRecipesUpdate,
                handleTargetedRecipe,
                toggleRecipeFilter,
                setInputValue,
                handlePreferencesToggle,
                handleDeselectRecipeFilters,
                setRecipes,
            }}
        >
            {children}
        </RecipesContext.Provider>
    )
}

export const useRecipesContext = () => {
    const context = useContext(RecipesContext)

    if (!context) {
        throw new Error("useRecipesContext must be used within a RecipesProvider")
    }

    return context
}
