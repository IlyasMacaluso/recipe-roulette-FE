import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../hooks/Auth/useAuth"
import axios from "axios"

const RecipesContext = createContext()

// Classe per gestire i filtri delle ricette
function RecipeFilter({
    isVegetarian = false,
    isGlutenFree = false,
    isVegan = false,
    cuisineEthnicity = [
        "all",
        "italian",
        "french",
        "chinese",
        "japanese",
        "indian",
        "greek",
        "spanish",
        "mexican",
        "thai",
        "middle eastern",
    ],
    preparationTime = 9999,
    caloricApport = 9999,
} = {}) {
    this.isVegetarian = isVegetarian
    this.isGlutenFree = isGlutenFree
    this.isVegan = isVegan
    this.cuisineEthnicity = cuisineEthnicity
    this.preparationTime = preparationTime
    this.caloricApport = caloricApport
}

export const RecipesProvider = ({ children }) => {
    const [recipeFilter, setRecipeFilter] = useState(new RecipeFilter()) // Filtri di ricerca
    const [recipes, setRecipes] = useState({
        results: [],
        favorited: [],
        filtered: [],
        searched: [],
        targetedRecipe: null,
    })

    const [inputValue, setInputValue] = useState("") // Valore dell'input che filtra i risultati
    const [recipeAnimation, setRecipeAnimation] = useState(true) // Stato per animare le recipeCard quando vengono modificati i filtri
    const { isAuthenticated } = useAuth() // Stato di autenticazione
    const location = useLocation() // Hook per ottenere la posizione corrente

    useEffect(() => {
        // Reset dell'inputValue quando si cambia pagina
        setInputValue("")
    }, [location.pathname])

    useEffect(() => {
        setRecipes((prev) => {
            return {
                ...prev,
                searched: prev.filtered.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase())),
            }
        })
    }, [inputValue])

    // Recupero dal localStorage/backend quando si effettua il login o si cambia pagina
    useEffect(() => {
        ;(async () => {
            try {
                const localRecipes = JSON.parse(window.localStorage.getItem("recipes"))
                const sessionFilter = JSON.parse(window.localStorage.getItem("recipeFilter"))
                if (isAuthenticated) {
                    // Imposta le ricette dal localStorage se si è autenticati
                    localRecipes && setRecipes(localRecipes)
                } else {
                    // Se non si è autenticati, imposta il contenuto del localStorage e imposta isFavorited a false
                    let { results, filtered, targetedRecipe, favorited, searched } = localRecipes
                    results = results.map((rec) => ({ ...rec, isFavorited: false }))
                    filtered = filtered.map((rec) => ({ ...rec, isFavorited: false }))
                    targetedRecipe = { ...targetedRecipe, isFavorited: false }
                    favorited = favorited.map((rec) => ({ ...rec, isFavorited: false }))
                    searched = searched.map((rec) => ({ ...rec, isFavorited: false }))

                    setRecipes((prev) => ({
                        ...prev,
                        results: results.length > 0 ? results : prev.results,
                        filtered: filtered.length > 0 ? filtered : prev.filtered,
                        targetedRecipe: targetedRecipe ? targetedRecipe : prev.targetedRecipe,
                        favorited: favorited.length > 0 ? favorited : prev.favorited,
                        searched: searched.length > 0 ? searched : prev.searched,
                    }))
                    sessionFilter && setRecipeFilter(sessionFilter)
                }
            } catch (error) {
                console.error(error)
            }
        })()
    }, [location, isAuthenticated])

    // Salvataggio dei filtri nel localStorage quando vengono modificati, + animazione recipeCard
    useEffect(() => {
        try {
            const jsonFilters = JSON.stringify(recipeFilter)
            window.sessionStorage.setItem("recipeFilter", jsonFilters)
        } catch (error) {
            console.error(error)
        }

        // Animazione recipeCard
        recipeAnimation && setTimeout(() => setRecipeAnimation(false), 0) // Se è già in corso, resetta
        setTimeout(() => setRecipeAnimation(true), 300)
    }, [recipeFilter])

    // Aggiornamento ricette visualizzate quando vengono modificati i filtri o aggiunti preferiti
    useEffect(() => {
        let filtering = recipes.favorited.filter(
            (rec) => rec.caloricApport <= recipeFilter.caloricApport && rec.preparationTime <= recipeFilter.preparationTime
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

        // Imposta il risultato del filtering alla variabile di stato dedicata
        setRecipes((prev) => ({
            ...prev,
            filtered: filtering,
        }))
    }, [recipeFilter, recipes.favorited])

    // Gestione di aggiunta/rimozione di ricette dai preferiti
    const handleRecipesUpdate = (recipeState, setRecipeState, location) => {
        const prevPath = localStorage.getItem("prevPath")

        const updatedResults = recipes.results.map((recipe) =>
            recipe.id === recipeState.id ? { ...recipe, isFavorited: !recipeState.isFavorited } : recipe
        )
        const updatedResult = updatedResults.find((recipe) => recipe.id === recipeState.id)

        if (location === "/recipes-results" || (location === "/recipe" && prevPath === "/recipes-results")) {
            console.log("Updated Results:", updatedResults)
            console.log("Updated Result:", updatedResult)

            const updatedRecipes = {
                ...recipes,
                results: updatedResults,
                searched: updatedResults,
                filtered: updatedResults,
                favorited: updatedResult.isFavorited
                    ? [...recipes.favorited, updatedResult] // Aggiungi se è stato favorito
                    : recipes.favorited.filter((rec) => rec.id !== recipeState.id), // Rimuovi se non è stato favorito
            }

            setRecipes(updatedRecipes)
            setRecipeState((prev) => ({ ...prev, isFavorited: updatedResult.isFavorited }))

            if (isAuthenticated) {
                try {
                    const jsonRecipes = JSON.stringify(updatedRecipes)
                    localStorage.setItem("recipes", jsonRecipes)
                } catch (error) {
                    console.error(error)
                }
            }
        } else if (location === "/favorited" || (location === "/recipe" && prevPath === "/favorited")) {
            setTimeout(() => {
                // Filtra le ricette preferite
                const newFavorited = { ...recipeState, isFavorited: !recipeState.isFavorited }
                console.log("Previous Favorited:", recipes.favorited)
                console.log("New Favorited:", newFavorited)

                const updatedRecipes = {
                    ...recipes,
                    results: updatedResult ? updatedResults : recipes.results,
                    favorited: !newFavorited.isFavorited
                        ? [...recipes.favorited.filter((rec) => rec.id !== recipeState.id)] // Aggiungi se isFavorited è true
                        : [...recipes.favorited, updatedResult], // Rimuovi se isFavorited è false
                }

                // Aggiorna nel localStorage
                const jsonRecipes = JSON.stringify(updatedRecipes)
                localStorage.setItem("recipes", jsonRecipes)

                setRecipes(updatedRecipes)

                if (updatedResult) {
                    setRecipeState((prev) => ({ ...prev, isFavorited: updatedResult.isFavorited }))
                }
            }, 100)
        }
    }

    // Gestione della ricetta aperta a schermo intero
    const handleTargetedRecipe = (recipe) => {
        recipe &&
            setRecipes((prev) => ({
                ...prev,
                targetedRecipe: recipe,
            }))
        try {
            const jsonRecipes = JSON.stringify(recipes)
            localStorage.setItem("recipes", jsonRecipes)
        } catch (error) {
            console.error(error)
        }
    }

    // Gestione delle proprietà booleane di recipeFilter
    const toggleRecipeFilter = (prop) => {
        const newState = !recipeFilter[prop]
        setRecipeFilter((prevData) => ({ ...prevData, [prop]: newState }))
    }

    // Gestione delle proprietà non booleane di recipeFilter
    const handlePreferencesToggle = (filterType, value, handleSelected, selectedState) => {
        if (filterType === "caloricApport" || filterType === "preparationTime") {
            if (!selectedState) {
                setRecipeFilter((prevData) => ({
                    ...prevData,
                    [filterType]: value,
                }))
            } else {
                setRecipeFilter((prevData) => ({
                    ...prevData,
                    [filterType]: 9999,
                }))
            }
        }
        // Gestione della proprietà cuisineEthnicity di recipeFilter
        if (filterType === "cuisineEthnicity") {
            let updatedEthnicity = [...recipeFilter.cuisineEthnicity] // Copia l'array originale
            const alreadyThere = updatedEthnicity.find((cuisine) => cuisine.toLowerCase() === value)

            if (value === "all") {
                if (recipeFilter.cuisineEthnicity.find((cuisine) => cuisine === "all")) {
                    updatedEthnicity = [] // Deseleziona tutti se "all" è già selezionato
                    handleSelected(false)
                } else {
                    const { cuisineEthnicity } = new RecipeFilter()
                    updatedEthnicity = cuisineEthnicity // Seleziona tutti se "all" non è selezionato
                    handleSelected(true)
                }
            } else {
                if (alreadyThere) {
                    updatedEthnicity = updatedEthnicity.filter((item) => item !== value.toLowerCase() && item !== "all")
                    handleSelected && handleSelected(false)
                } else {
                    updatedEthnicity.push(value.toLowerCase())
                    if (updatedEthnicity.length === 10) {
                        updatedEthnicity.push("all") // Seleziona anche "all" se tutte le altre cucine sono selezionate
                    }
                }
            }

            setRecipeFilter((prevData) => ({
                ...prevData,
                cuisineEthnicity: updatedEthnicity,
            }))
        }
    }

    // Reset dei filtri recipeFilter
    const handleDeselectRecipeFilters = () => {
        setRecipeFilter(new RecipeFilter())
    }

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
    return useContext(RecipesContext)
}
