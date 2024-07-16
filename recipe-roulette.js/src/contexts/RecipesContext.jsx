import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "@tanstack/react-router"
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

    // hook per aggiornare il localStorage
    const { getValue } = useLocalStorage()

    // hook per l'autenticazione
    const { isAuthenticated } = useAuth() // Stato di autenticazione

    // funzioni di gestione filtri ricetta
    const { recipeFilter, setRecipeFilter, toggleRecipeFilter, handlePreferencesToggle, handleDeselectRecipeFilters } =
    useRecipeFilter(isAuthenticated)
    
    // hook per aggiornare le ricette
    const { handleRecipesUpdate, handleTargetedRecipe } = useRecipesUpdate(setRecipes)
    

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
                        results: resetRecipeList(localRecipes.results),
                        filtered: [],
                        targetedRecipe: localRecipes.targetedRecipe
                            ? { ...prevRecipes.targetedRecipe, isFavorited: false }
                            : null,
                        favorited: [],
                        searched: [],
                    }
                }

                return prevRecipes // Se localRecipes non è definito, ritorna lo stato corrente senza modifiche
            })
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
        setRecipes((prevRecipes) => {
            if (prevRecipes.filtered && prevRecipes.filtered.length > 0) {
                const newFiltered = prevRecipes.filtered.filter((rec) =>
                    rec.title.toLowerCase().includes(inputValue.toLowerCase())
                )

                return { ...prevRecipes, searched: newFiltered }
            }
            return prevRecipes
        })
    }, [inputValue])

    // Aggiorno le ricette visualizzate quando vengono modificati i filtri o aggiunti preferiti
    useEffect(() => {
        setRecipes((prevRecipes) => {
            // Copia delle ricette originali per lavorarci in modo sicuro
            const updatedFiltered = prevRecipes.favorited.filter((rec) => {
                return (
                    rec.caloricApport <= recipeFilter.caloricApport &&
                    rec.preparationTime <= recipeFilter.preparationTime &&
                    (recipeFilter.isGlutenFree ? rec.isGlutenFree : true) &&
                    (recipeFilter.isVegetarian ? rec.isVegetarian : true) &&
                    (recipeFilter.isVegan ? rec.isVegan : true) &&
                    (recipeFilter.cuisineEthnicity.includes("all") ||
                        recipeFilter.cuisineEthnicity.includes(rec.cuisineEthnicity.toLowerCase())) &&
                    (recipeFilter.difficulty === "all" ||
                        recipeFilter.difficulty.toLowerCase() === rec.difficulty.toLowerCase())
                )
            })

            // Ritorna il nuovo stato di recipes aggiornato, mantenendo inalterate le altre proprietà
            return {
                ...prevRecipes,
                filtered: updatedFiltered,
            }
        })
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
