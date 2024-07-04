import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"

export const useDisplayedIngredients = (ingredients, setIngredients) => {
    const { setValue } = useLocalStorage()
    const generateIngredients = () => {
        const ingredientIds = ingredients.filtered.filter((ing) => !ing.isSelected && !ing.isBlackListed).map((item) => item.id)

        const randomIds = []
        while (randomIds.length < 5) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (ingredientIds.includes(randomId) && !randomIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }

        const randomIngs = ingredients.filtered.filter((item) => randomIds.includes(item.id))
        const newIngredients = { ...ingredients, displayed: randomIngs }

        setIngredients(newIngredients)
        setValue("ingredients", newIngredients)
    }

    const shuffleIng = () => {
        const newData = []
        let availableIngs = ingredients.filtered.filter((item) => !item.isSelected && !item.isBlackListed)

        ingredients.displayed.forEach((ingredient) => {
            if (!ingredient.isSelected) {
                const ingredientIds = availableIngs.map((item) => item.id)
                let newRandomIng = null //l'ingrediente che sostituirà quello non selezionato

                while (!newRandomIng) {
                    //finchè non trova un ingrediente che soddisfa tutti  i requisiti sotto, cicla
                    const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
                    const isUnique = ingredients.displayed.find((ingredient) => ingredient.id === randomId)

                    if (ingredient.id !== randomId && !isUnique) {
                        newRandomIng = ingredients.all.find((ing) => ing.id === randomId)
                        newData.push(newRandomIng)
                        availableIngs = availableIngs.filter((ingredient) => ingredient.id !== newRandomIng.id)
                    }
                }
            } else {
                newData.push(ingredient)
            }
        })

        setIngredients((prev) => ({ ...prev, displayed: newData }))
    }

    const handleIngIncrement = () => {
        const availableIngs = ingredients.filtered.filter((ingredient) => !ingredient.isSelected && !ingredient.isBlackListed)
        if (ingredients.displayed.length < 8) {
            //verifica che a schermo ci siano meno di 8 ingredienti (il massimo)
            ingredients.displayed.forEach((ingB) => {
                availableIngs.forEach((ingA, index) => {
                    // confronto il singolo ing a schermo con quelli disponibili, (impediamo che un ingr venga sostituito da se stesso)
                    if (ingA.id === ingB.id) {
                        availableIngs.splice(index, 1)
                    }
                })
            })
            const newIng = availableIngs.find((ingredient) => ingredient)

            setIngredients((prev) => ({ ...prev, displayed: [...prev.displayed, newIng] }))
        }
    }

    const handleIngDecrement = (id, e) => {
        e.stopPropagation()
        if (ingredients.displayed.length > 3) {
            setIngredients((prev) => ({ ...prev, displayed: prev.displayed.filter((ing) => ing.id !== id) }))
        }
    }

    return { generateIngredients, handleIngDecrement, handleIngIncrement, shuffleIng }
}
