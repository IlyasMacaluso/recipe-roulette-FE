import { useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
// Costruttore per creare i filtri delle ricette
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
export const useRecipeFilter = () => {
    const [recipeFilter, setRecipeFilter] = useState(new RecipeFilter())
    const { setValue } = useLocalStorage()

    // Gestione delle proprietà booleane di recipeFilter
    const toggleRecipeFilter = (prop) => {
        setRecipeFilter((prevFilters) => {
            const newState = !prevFilters[prop]
            const newFilters = { ...prevFilters, [prop]: newState }
            setValue("recipeFilter", newFilters) // Aggiorna il valore nel local storage o dove necessario
            return newFilters // Ritorna il nuovo stato aggiornato
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
            return updatedFilters // Ritorna il nuovo stato aggiornato
        })
    }

    // Reset dei filtri recipeFilter
    const handleDeselectRecipeFilters = () => {
        setRecipeFilter(new RecipeFilter())
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
