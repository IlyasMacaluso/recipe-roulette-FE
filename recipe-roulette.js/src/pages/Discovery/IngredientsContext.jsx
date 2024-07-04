import { useState, useEffect, createContext, useContext } from "react"
import ingredientsArray from "../../assets/ingredientsArray"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { useDisplayedIngredients } from "./useDisplayedIngredients/useDisplayedIngredients"
import { useIngredientUpdate } from "./useIngredientUpdate/useIngredientUpdate"

const IngredientsContext = createContext()

export const IngredientsProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState({
        all: [...ingredientsArray],
        filtered: [...ingredientsArray],
        displayed: [],
        blacklisted: [],
    })
    const { recipeFilter } = useRecipesContext()

    // hook per la gestione del localStorage
    const { setValue, getValue } = useLocalStorage()

    //hook per la gestione dell'aggiornamento degli ingredienti (aggiungi/rimuovi a backlist/selezionati)
    const { handleIngUpdate, handleDeselectAll } = useIngredientUpdate(ingredients, setIngredients)

    // logica per la gestione degli ingrediento a schermo, genera, shuffle, aggiungi, rimuovi
    const { handleIngDecrement, handleIngIncrement, shuffleIng, generateIngredients } = useDisplayedIngredients(
        ingredients,
        setIngredients
    )

    useEffect(() => {
        const localIngredients = getValue("ingredients") //restituisce il valore già parsato se presente
        if (localIngredients && localIngredients.all.length > 0) {
            const { displayed } = localIngredients
            setIngredients(localIngredients)
            displayed.length === 0 && generateIngredients()
            console.log(localIngredients)
        } else {
            //se il localStorage è vuoto allora inizilizziamo ad array vuoti per poi fare eventualmente un fetch dei dati (per ora utilizzo l'array locale)
            setIngredients({
                all: [...ingredientsArray],
                filtered: [...ingredientsArray],
                displayed: [],
                blacklisted: [],
            })
            generateIngredients()
        }
    }, [])

        useEffect(() => {
            let filtering = ingredients.all.filter((ing) => !ing.isBlackListed)

            const filterIngredients = ( prop) => filtering = filtering.filter((item) => item[prop]) // funzione per filtrare in base alla prop

            recipeFilter.isGlutenFree && filterIngredients("isGlutenFree")
            recipeFilter.isVegetarian && filterIngredients("isVegetarian")
            recipeFilter.isVegan && filterIngredients("isVegan")

            setIngredients((prev) => {
                const updatedIngredients = { ...prev, filtered: filtering }
                setValue("ingredients", updatedIngredients)
                return updatedIngredients
            })
        }, [recipeFilter, ingredients.all])

    return (
        <IngredientsContext.Provider
            value={{
                handleIngIncrement,
                handleIngDecrement,
                shuffleIng,
                handleIngUpdate,
                generateIngredients,
                handleDeselectAll,
                setIngredients,
                ingredients,
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
