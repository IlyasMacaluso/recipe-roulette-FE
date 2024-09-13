import { useState, useEffect, createContext, useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/Auth/useAuth"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { useDisplayedIngredients } from "./useDisplayedIngredients/useDisplayedIngredients"
import { useIngredientUpdate } from "./useIngredientUpdate/useIngredientUpdate"
import { useGetRequest } from "../../hooks/useGetRequest/useGetRequest"

const IngredientsContext = createContext()

export const IngredientsProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState({
        all: [],
        filteredFavorites: [],
        displayed: [],
        blacklisted: [],
    })

    const { isAuthenticated } = useAuth()
    const { recipePreferences } = useRecipesContext()
    const { setValue, getValue } = useLocalStorage()
    
    const { handleIngUpdate, deselectIngredients } = useIngredientUpdate(ingredients, setIngredients)
    const { handleIngDecrement, handleIngIncrement, shuffleIng, generateIngredients } = useDisplayedIngredients(ingredients, setIngredients)
    const { getRequest } = useGetRequest()

    // Fetch ingredients
    const {
        data: DBIngredients,
        error: ingredientsError,
        isLoading: ingredientsLoading,
    } = useQuery({
        queryKey: ["ingredients"],
        queryFn: async () => await getRequest("http://localhost:3000/api/ingredients/get-ingredients"),
    })

    // Fetch blacklisted ingredients
    const {
        data: DBBlacklisted,
        error: blacklistedError,
        isLoading: blacklistedLoading,
    } = useQuery({
        queryKey: ["blacklisted-ingredients"],
        queryFn: async () => {
            const { id } = getValue("userData")
            const res = await getRequest(`http://localhost:3000/api/preferences/get-blacklisted-ingredients/${id}`)
            return res
        },
        enabled: isAuthenticated,
    })

    useEffect(() => {
        const localIngredients = getValue("ingredients")
        const initialSetup = async () => {
            if (ingredientsLoading || blacklistedLoading) return // Wait until data is loaded

            const markBlacklisted = (ings, blIngs) => {
                return ings.map((ingredient) => ({
                    ...ingredient,
                    is_blacklisted: blIngs.includes(ingredient.id),
                }))
            }

            if (DBIngredients) {
                setIngredients((prev) => {
                    const blacklistedIds = DBBlacklisted?.map((ing) => ing.id)
                    const all = markBlacklisted(DBIngredients, blacklistedIds || [])
                    const displayed = markBlacklisted(localIngredients?.displayed || [], blacklistedIds || [])

                    if (!localIngredients?.displayed.length && !displayed.length) {
                        generateIngredients()
                    }

                    return {
                        ...prev,
                        all: all,
                        filteredFavorites: all,
                        displayed: displayed,
                        blacklisted: DBBlacklisted || [],
                    }
                })
            }
        }

        initialSetup()
    }, [blacklistedLoading, ingredientsLoading, isAuthenticated, location])

    useEffect(() => {
        if (ingredientsLoading || blacklistedLoading) return // Wait until data is loaded
        setIngredients((prev) => {
            if (prev?.all) {
                let filtering = prev?.all.filter((ing) => !ing.is_blacklisted)
                const filterIngredients = (prop) => (filtering = filtering.filter((item) => item[prop]))

                recipePreferences.is_gluten_free && filterIngredients("is_gluten_free")
                recipePreferences.is_vegetarian && filterIngredients("is_vegetarian")
                recipePreferences.is_vegan && filterIngredients("is_vegan")

                const updatedIngredients = { ...prev, filteredFavorites: filtering }
                setValue("ingredients", updatedIngredients)
                return updatedIngredients
            }
        })
    }, [recipePreferences, ingredients?.all])

    return (
        <IngredientsContext.Provider
            value={{
                handleIngIncrement,
                handleIngDecrement,
                shuffleIng,
                handleIngUpdate,
                generateIngredients,
                deselectIngredients,
                setIngredients,
                ingredients,
                ingredientsLoading,
                blacklistedLoading,
                ingredientsError
            }}
        >
            {children}
        </IngredientsContext.Provider>
    )
}

export const useManageIngredients = () => {
    const context = useContext(IngredientsContext)
    if (!context) {
        throw new Error("useManageIngredients must be used within an IngredientsProvider")
    }
    return context
}
