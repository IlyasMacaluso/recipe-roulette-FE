import { useState, useEffect, createContext, useContext } from "react"
import { useLocation } from "react-router-dom"
import ingredientsArray from "../../assets/ingredientsArray"

const IngredientsContext = createContext()

export const IngredientsProvider = ({ children }) => {
    const [ing, setIng] = useState(ingredientsArray)
    const [ingNum, setIngNum] = useState(5)
    const [slots, setSlots] = useState(ingNum)
    const [displayedIng, setDisplayedIng] = useState([])
    const [selectedIng, setSelectedIng] = useState([])
    const [blackList, setBlackList] = useState([])
    const [randomIng, setRandomIng] = useState([])
    const location = useLocation()

    useEffect(() => {
        selectToDisplay()
    }, [ingNum, location.key])

    useEffect(() => {
        setDisplayedIng([...selectedIng, ...randomIng])
    }, [randomIng])

    function handleIngUpdate(prop, cardState, setCardState) {
        const updatedIngs = ing.map((item) => (item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item))
        setIng(updatedIngs)

        const affectedIngs = updatedIngs.filter((item) => item[prop])
        if (prop === "isSelected") {
            setSelectedIng(affectedIngs)
            setSlots(ingNum - affectedIngs.length)
        } else if (prop === "isBlackListed") {
            setBlackList(affectedIngs)
        }

        setCardState((prevState) => ({
            ...prevState,
            ...updatedIngs.find((item) => item.id === cardState.id),
        }))
    }

    function handleDeselectAll(prop, setCardState) {
        if (prop === "isSelected") {
            setSelectedIng([])
            setSlots(ingNum)
        } else if (prop === "isBlackListed") {
            setBlackList([])
        }
        setIng((prevData) => prevData.map((ing) => ({ ...ing, [prop]: false })))
        setDisplayedIng((prevData) => prevData.map((ing) => ({ ...ing, [prop]: false })))
        if (setCardState) {
            setCardState((prevData) => ({ ...prevData, [prop]: false }))
        }
    }

    function selectToDisplay() {
        const ingredientIds = ing.filter((item) => !item.isSelected).map((item) => item.id)
        const selectedIds = selectedIng.map((item) => item.id)
        const randomIds = []

        while (randomIds.length < slots) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (!randomIds.includes(randomId) && !selectedIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }

        setRandomIng(ing.filter((item) => randomIds.includes(item.id)))
    }

    function shuffleIng() {
        selectToDisplay()
    }

    function handleIngIncrement() {
        if (ingNum < 8) {
            setIngNum((prev) => prev + 1)
            setSlots((prev) => prev + 1)
        }
    }

    function handleIngDecrement(id, e) {
        e.stopPropagation()
        if (ingNum > 3 && !ing.find((item) => item.id === id).isSelected) {
            setIngNum((prev) => prev - 1)
            setSlots((prev) => prev - 1)
        }
    }

    return (
        <IngredientsContext.Provider
            value={{
                handleIngIncrement,
                handleIngDecrement,
                handleDeselectAll,
                setDisplayedIng,
                shuffleIng,
                handleIngUpdate,
                setBlackList,
                selectToDisplay,
                ing,
                ingNum,
                randomIng,
                selectedIng,
                displayedIng,
                blackList,
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
