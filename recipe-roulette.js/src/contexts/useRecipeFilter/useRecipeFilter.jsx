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
        const newState = !recipeFilter[prop]
        const newFilters = { ...recipeFilter, [prop]: newState }
        setRecipeFilter(newFilters)
        setValue("recipeFilter", newFilters)
    }

    // Gestione delle proprietà non booleane di recipeFilter
    const handlePreferencesToggle = (filterType, value, handleSelected, selectedState) => {
        if (filterType === "caloricApport" || filterType === "preparationTime" || filterType === "difficulty") {
            if (!selectedState) {
                const newFilters = { ...recipeFilter, [filterType]: value }
                setRecipeFilter(newFilters)
                setValue("recipeFilter", newFilters)
            } else {
                const newFilters = { ...recipeFilter, [filterType]: filterType === "difficulty" ? "all" : 9999 }
                setRecipeFilter(newFilters)
                setValue("recipeFilter", newFilters)
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
            setValue("recipeFilter", newFilters)
        }
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
