import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"

export const useIngredientUpdate = (ingredients, setIngredients) => {
    const { setValue } = useLocalStorage()

    const handleIngUpdate = (prop, cardState, setCardState) => {
        const updatedIngs = ingredients.all.map((item) =>
            item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item
        )
        const updatedDisplayedIngs = ingredients.displayed.map((item) =>
            item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item
        )

        const updatedIng = updatedIngs.find((ingredient) => ingredient.id === cardState.id) //the updated ingredient
        const isDisplayed = ingredients.displayed.some((ingredient) => ingredient.id === cardState.id) //already on screen?

        // setIng(updatedIngs)
        let newDisplayed = updatedDisplayedIngs
        const newBlacklisted = updatedIngs.filter((item) => item.isBlackListed)

        switch (prop) {
            case "isSelected":
                {
                    if (isDisplayed) {
                        newDisplayed = updatedDisplayedIngs
                    } else if (ingredients.displayed.length === 8) {
                        //se il numero di ingredienti mostrati è il massimo (8)
                        newDisplayed = []
                        let firstUnselected = true

                        ingredients.displayed.forEach((ing) => {
                            if (!ing.isSelected && firstUnselected) {
                                newDisplayed.push(updatedIng)
                                firstUnselected = false
                            } else {
                                newDisplayed.push(ing)
                            }
                        })
                    } else {
                        newDisplayed = [updatedIng, ...ingredients.displayed]
                    }

                    const newIngredients = {
                        ...ingredients,
                        all: updatedIngs,
                        displayed: newDisplayed,
                        blacklisted: newBlacklisted,
                    }
                    setIngredients(newIngredients)
                    setValue("ingredients", newIngredients)
                }
                break

            case "isBlackListed":
                {
                    const newIngredients = {
                        ...ingredients,
                        all: updatedIngs,
                        displayed: newDisplayed,
                        blacklisted: newBlacklisted,
                    }
                    setIngredients(newIngredients)
                    setValue("ingredients", newIngredients)
                }
                break
        }

        setCardState && setCardState((prevState) => ({ ...prevState, [prop]: updatedIng[prop] }))
    }

    //deleseziona anche gli elementi blacklistati!!
    const handleDeselectAll = (prop, setCardState, setFilterState) => {
        const selectedIng = ingredients.displayed.filter((ing) => ing.isSelected)
        const newIngredients = ingredients.all.map((ing) => ({ ...ing, [prop]: false }))
        let newDisplayed = ingredients.displayed.map((ing) => ({ ...ing, [prop]: false }))
        let newBlacklisted = ingredients.blacklisted

        if (prop === "isSelected" && selectedIng.length > 0) {
            newDisplayed = ingredients.displayed.map((ing) => ({ ...ing, [prop]: false }))
            setCardState && setCardState((prevData) => ({ ...prevData, [prop]: false }))
        } else if (prop === "isBlackListed") {
            newBlacklisted = []
            setFilterState && setFilterState((prevData) => ({ ...prevData, [prop]: false }))
        }

        setIngredients((prev) => ({ ...prev, all: newIngredients, blacklisted: newBlacklisted, displayed: newDisplayed }))
    }

    return { handleIngUpdate, handleDeselectAll }
}
