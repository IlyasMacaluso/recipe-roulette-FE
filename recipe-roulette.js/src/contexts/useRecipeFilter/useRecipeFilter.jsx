import { useEffect, useMemo, useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { useFetchPreferences } from "../../hooks/fetchPreferences/useFetchPreferences"
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest"
import { useDebounce } from "../../hooks/useDebounce/useDebounce"

// Costruttore per creare i filtri delle ricette
function RecipeFilter({
    is_vegetarian = false,
    is_gluten_free = false,
    is_vegan = false,
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
    this.is_vegetarian = is_vegetarian
    this.is_gluten_free = is_gluten_free
    this.is_vegan = is_vegan
    this.cuisineEthnicity = cuisineEthnicity
    this.preparationTime = preparationTime
    this.caloricApport = caloricApport
    this.difficulty = difficulty
}
export const useRecipeFilter = (isAuthenticated) => {
    const [recipeFilter, setRecipeFilter] = useState(new RecipeFilter())
    const [updatedFilter, setUpdatedFilter] = useState(null)
    const { setValue, getValue } = useLocalStorage()
    const { handlePostRequest } = usePostRequest()
    const { debounceValue } = useDebounce(updatedFilter)

    useEffect(() => {
        //chiamata di rete quando cambia il valore di debounce (ricetta da aggiornare)
        if (isAuthenticated) {
            const userData = getValue("userData")

            if (updatedFilter) {
                handlePostRequest({
                    url: "http://localhost:3000/api/preferences/set-preferences",
                    payload: { newPreferences: updatedFilter, userId: userData.id },
                    mutationId: "filtersToggleUpdate", //mutationId
                })
            }
        }
    }, [debounceValue])

    // Gestione delle proprietà booleane di recipeFilter
    const toggleRecipeFilter = (prop) => {
        setRecipeFilter((prevFilters) => {
            const newState = !prevFilters[prop]
            const updatedFilters = { ...prevFilters, [prop]: newState }
            setValue("recipeFilter", updatedFilters) // Aggiorna il valore nel local storage o dove necessario
            
            setUpdatedFilter(updatedFilters) // post request triggher

            return updatedFilters // Ritorna il nuovo stato aggiornato
        })
    }

    // Gestione delle proprietà non booleane di recipeFilter
    const handlePreferencesToggle = (filterType, value, selectedState) => {
        setRecipeFilter((prevFilters) => {
            let updatedFilters = { ...prevFilters }

            // Gestione del filtro "caloricApport", "preparationTime" e "difficulty"
            if (filterType === "caloricApport" || filterType === "preparationTime" || filterType === "difficulty") {
                const newValue = !selectedState ? value : filterType === "difficulty" ? "all" : 9999
                updatedFilters = { ...updatedFilters, [filterType]: newValue }
            }

            // Gestione del filtro "cuisineEthnicity"
            if (filterType === "cuisineEthnicity") {
                let updatedEthnicity = [...prevFilters.cuisineEthnicity]
                const alreadyThere = updatedEthnicity.find((cuisine) => cuisine.toLowerCase() === value)

                if (value === "all") {
                    updatedEthnicity = prevFilters.cuisineEthnicity.includes("all") ? [] : new RecipeFilter().cuisineEthnicity
                } else {
                    if (alreadyThere) {
                        updatedEthnicity = updatedEthnicity.filter((item) => item !== value.toLowerCase() && item !== "all")
                    } else {
                        updatedEthnicity.push(value.toLowerCase())
                        if (updatedEthnicity.length === 10) {
                            updatedEthnicity.push("all")
                        }
                    }
                }
                updatedFilters = { ...updatedFilters, cuisineEthnicity: updatedEthnicity }
            }

            setValue("recipeFilter", updatedFilters) // Aggiorna il valore nel local storage o dove necessario
            
            setUpdatedFilter(updatedFilters) // post request triggher

            return updatedFilters // Ritorna il nuovo stato aggiornato
        })
    }

    // Reset dei filtri recipeFilter
    const handleDeselectRecipeFilters = () => {
        setRecipeFilter(new RecipeFilter())

        setUpdatedFilter(new RecipeFilter()) // post request triggher
        setValue("recipeFilter", new RecipeFilter())
    }

    return {
        recipeFilter,
        setRecipeFilter,
        toggleRecipeFilter,
        handlePreferencesToggle,
        handleDeselectRecipeFilters,
    }
}
