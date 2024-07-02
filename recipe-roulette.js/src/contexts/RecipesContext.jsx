import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../hooks/Auth/useAuth"
import { useManageIngredients } from "../pages/Discovery/IngredientsContext"
import { useFetchPreferences } from "../hooks/fetchPreferences/useFetchPreferences"

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
    difficulty = "all",
} = {}) {
    this.isVegetarian = isVegetarian
    this.isGlutenFree = isGlutenFree
    this.isVegan = isVegan
    this.cuisineEthnicity = cuisineEthnicity
    this.preparationTime = preparationTime
    this.caloricApport = caloricApport
    this.difficulty = difficulty
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
    const [filtersLoaded, setFiltersLoaded] = useState(false) // Stato per tracciare il caricamento dei filtri
    const { filter } = useManageIngredients()
    const location = useLocation()

    // Reset dell'inputValue quando si cambia pagina
    useEffect(() => {
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

    // Recupero le ricette dal localStorage quando isAuthenticated cambia
    useEffect(() => {
        const retrieveRecipesFromLocalStorage = async () => {
            try {
                const localRecipes = JSON.parse(localStorage.getItem("recipes"))
                const sessionFilters = JSON.parse(sessionStorage.getItem("recipeFilter"))

                if (sessionFilters) {
                    setRecipeFilter(sessionFilters)
                    setFiltersLoaded(true)
                }

                if (isAuthenticated) {
                    // Se si è autenticati, imposta le ricette dal localStorage
                    if (localRecipes) {
                        setRecipes(localRecipes)
                    }
                } else {
                    // Se non si è autenticati, imposta le ricette dal localStorage
                    if (localRecipes) {
                        const resetRecipes = (recipes) => {
                            const resetRecipeList = (list) => list.map((rec) => ({ ...rec, isFavorited: false }))

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
            } catch (error) {
                console.error("Errore durante il recupero dal localStorage:", error)
            }
        }

        // Esegui il recupero solo quando isAuthenticated cambia
        retrieveRecipesFromLocalStorage()
    }, [isAuthenticated])

    // Animazione recipeCard
    useEffect(() => {
        recipeAnimation && setTimeout(() => setRecipeAnimation(false), 0) // Se è già in corso, resetta
        setTimeout(() => setRecipeAnimation(true), 300)
    }, [recipeFilter])

    // Aggiornamento ricette visualizzate quando vengono modificati i filtri o aggiunti preferiti
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

    // Gestione di aggiunta/rimozione di ricette dai preferiti
    const handleRecipesUpdate = (recipeState, setRecipeState) => {
        const updatedResults = recipes.results.map((recipe) =>
            recipe.id === recipeState.id ? { ...recipe, isFavorited: !recipeState.isFavorited } : recipe
        )

        const updatedResultIndex = updatedResults.findIndex((recipe) => recipe.id === recipeState.id)
        const updatedResult = updatedResultIndex !== -1 ? updatedResults[updatedResultIndex] : null

        const updateLocalStorage = (updatedRecipes) => {
            if (isAuthenticated) {
                try {
                    const jsonRecipes = JSON.stringify(updatedRecipes)
                    localStorage.setItem("recipes", jsonRecipes)
                } catch (error) {
                    console.error(error)
                }
            }
        }

        let newFavorites
        if (updatedResult) {
            newFavorites = updatedResult.isFavorited
                ? [...recipes.favorited, updatedResult]
                : recipes.favorited.filter((rec) => rec.id !== recipeState.id)
        } else {
            // Se updatedResult è null, la ricetta aggiornata si trova solo in recipes.favorited
            newFavorites = recipes.favorited.map((recipe) =>
                recipe.id === recipeState.id ? { ...recipe, isFavorited: !recipeState.isFavorited } : recipe
            )
        }

        const updatedRecipes = {
            ...recipes,
            results: updatedResults,
            filtered: newFavorites,
            searched: newFavorites,
            favorited: newFavorites,
        }

        setRecipes(updatedRecipes)
        setRecipeState((prev) => ({ ...prev, isFavorited: updatedResult ? updatedResult.isFavorited : !recipeState.isFavorited }))
        updateLocalStorage(updatedRecipes)
    }

    // Gestione della ricetta aperta a schermo intero
    const handleTargetedRecipe = (recipe) => {
        recipe &&
            setRecipes((prev) => ({
                ...prev,
                targetedRecipe: recipe,
            }))
        try {
            const localRecipes = JSON.parse(localStorage.getItem("recipes"))
            if (localRecipes) {
                const newLocalRecipes = {
                    ...localRecipes,
                    targetedRecipe: recipe,
                }
                const jsonRecipes = JSON.stringify(newLocalRecipes)
                localStorage.setItem("recipes", jsonRecipes)
            } else {
                const jsonRecipes = JSON.stringify(recipes)
                localStorage.setItem("recipes", jsonRecipes)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Funzione per settare i filtri nel sessionStorage
    const setSessionFilters = (updatedFilters) => {
        try {
            const jsonFilters = JSON.stringify(updatedFilters)
            window.sessionStorage.setItem("recipeFilter", jsonFilters)
            // useFetchPreferences(jsonFilters, userId) //si deve prendere userId da qualche parte (cache localStorage) e metterlo li
        } catch (error) {
            console.error(error)
        }
    }

    // Gestione delle proprietà booleane di recipeFilter
    const toggleRecipeFilter = (prop) => {
        const newState = !filter[prop]
        const newFilters = { ...recipeFilter, [prop]: newState }
        setRecipeFilter(newFilters)
        setSessionFilters(newFilters)
    }

    // Gestione delle proprietà non booleane di recipeFilter
    const handlePreferencesToggle = (filterType, value, handleSelected, selectedState) => {
        if (filterType === "caloricApport" || filterType === "preparationTime" || filterType === "difficulty") {
            if (!selectedState) {
                const newFilters = { ...recipeFilter, [filterType]: value }
                setRecipeFilter(newFilters)
                setSessionFilters(newFilters)
            } else {
                const newFilters = { ...recipeFilter, [filterType]: filterType === "difficulty" ? "all" : 9999 }
                setRecipeFilter(newFilters)
                setSessionFilters(newFilters)
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
            const newFilters = { ...recipeFilter, cuisineEthnicity: updatedEthnicity }
            setRecipeFilter(newFilters)
            setSessionFilters(newFilters)
        }
    }

    // Reset dei filtri recipeFilter
    const handleDeselectRecipeFilters = () => {
        setRecipeFilter(new RecipeFilter())
        setSessionFilters(new RecipeFilter())
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
