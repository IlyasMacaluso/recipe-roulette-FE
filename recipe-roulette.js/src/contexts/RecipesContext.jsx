import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../hooks/Auth/useAuth"
import { useFetchPreferences } from "../hooks/fetchPreferences/useFetchPreferences"
import { useLocalStorage } from "../hooks/useLocalStorage/useLocalStorage"
import { useRecipesUpdate } from "./useRecipeUpdate/useRecipesUpdate"
import { useRecipeFilter } from "./useRecipeFilter/useRecipeFilter"

const RecipesContext = createContext()

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState({
        results: [],
        favorited: [],
        filtered: [],
        searched: [],
        targetedRecipe: null,
    })

    const [inputValue, setInputValue] = useState("") // Valore dell'input che filtra i risultati
    const [recipeAnimation, setRecipeAnimation] = useState(true) // Stato per animare le recipeCard quando vengono modificati i filtri
    const location = useLocation()

    //hook per aggiornare il localStorage
    const { getValue } = useLocalStorage()

    //funzioni di gestione filtri ricetta
    const { recipeFilter, setRecipeFilter, toggleRecipeFilter, handlePreferencesToggle, handleDeselectRecipeFilters } =
        useRecipeFilter()

    //hook per aggiornare le ricette
    const { handleRecipesUpdate, handleTargetedRecipe } = useRecipesUpdate(recipes, setRecipes)

    //hook per l'autenticazione
    const { isAuthenticated } = useAuth() // Stato di autenticazione

    // Recupero le ricette dal localStorage quando isAuthenticated cambia
    useEffect(() => {
        const localRecipes = getValue("recipes")
        const localFilters = getValue("recipeFilter")

        localFilters && setRecipeFilter(localFilters)

        if (isAuthenticated) {
            // Se si è autenticati, imposta le ricette dal localStorage
            localRecipes && setRecipes(localRecipes)
        } else {
            // Se non si è autenticati, setta isFavorited:false (nella variabile di stato)
            if (localRecipes) {
                
                const resetRecipes = (recipes) => {
                    const resetRecipeList = (list) => {
                        if (list && list.length > 0) {
                            list.map((rec) => ({ ...rec, isFavorited: false }))
                        }
                    }

                    return {
                        ...recipes,
                        results: resetRecipeList(recipes.results),
                        filtered: resetRecipeList(recipes.filtered),
                        targetedRecipe: localRecipes.targetedRecipe && { ...recipes.targetedRecipe, isFavorited: false },
                        favorited: [],
                        searched: resetRecipeList(recipes.searched),
                    }
                }

                setRecipes(resetRecipes(localRecipes))
            }
        }
    }, [isAuthenticated])

    // Animazione recipeCard
    useEffect(() => {
        recipeAnimation && setTimeout(() => setRecipeAnimation(false), 0) // Se è già in corso, resetta
        setTimeout(() => setRecipeAnimation(true), 300)
    }, [recipeFilter])

    // Reset dell'inputValue quando si cambia pagina
    useEffect(() => {
        setInputValue("")
    }, [location.pathname])

    // Filtro i risultati quando viene modificato l'input
    useEffect(() => {
        setRecipes((prev) => {
            return {
                ...prev,
                searched: prev.filtered.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase())),
            }
        })
    }, [inputValue])

    // Aggiorno le ricette visualizzate quando vengono modificati i filtri o aggiunti preferiti
    useEffect(() => {
        let filtering = recipes.favorited.filter(
            (rec) => rec && rec.caloricApport <= recipeFilter.caloricApport && rec.preparationTime <= recipeFilter.preparationTime
        )

        // Filtra in base alle preferenze selezionate
        recipeFilter.isGlutenFree && (filtering = filtering.filter((item) => item.isGlutenFree))
        recipeFilter.isVegetarian && (filtering = filtering.filter((item) => item.isVegetarian))
        recipeFilter.isVegan && (filtering = filtering.filter((item) => item.isVegan))

        // Se non è selezionato "all", filtra in base ai tipi di cucina selezionati
        if (!recipeFilter.cuisineEthnicity.find((cuisine) => cuisine === "all")) {
            filtering = filtering.filter((rec) =>
                recipeFilter.cuisineEthnicity.some((cuisine) => {
                    return cuisine.toLowerCase() === rec.cuisineEthnicity.toLowerCase()
                })
            )
        }

        if (recipeFilter.difficulty !== "all") {
            filtering = filtering.filter((rec) => recipeFilter.difficulty.toLocaleLowerCase() === rec.difficulty.toLowerCase())
        }
        // Imposta il risultato del filtering alla variabile di stato dedicata
        setRecipes((prev) => ({
            ...prev,
            filtered: filtering,
        }))
    }, [recipeFilter, recipes.favorited])

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                inputValue,
                recipeAnimation,
                recipeFilter,
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
