import { useEffect, useMemo, useState } from "react"
import { useManageIngredients } from "../../../pages/Discovery/IngredientsContext"
import { useSnackbar } from "../../Snackbar/useSnackbar"

export function useIngredientSearch(isFixed, searchCriteria) {
    const { ingredients, handleDeselectAll, handleIngUpdate } = useManageIngredients()
    const { handleOpenSnackbar } = useSnackbar()

    const [fixedPosition, setFixedPosition] = useState(false)
    const [searchState, setSearchState] = useState({ inputActive: false })

    const [condition, setCondition] = useState(true)
    const [inputValues, setInputValues] = useState({ initial: "", current: "" })
    const [suggestions, setSuggestions] = useState(ingredients.all)
    const [cardState, setCardState] = useState({
        id: null,
        label: null,
        bgColor: null,
        isSelected: null,
        isBlacklisted: null,
    })

    // aggiornamento dei suggerimenti
    useEffect(() => {
        setSuggestions(ingredients.all)
    }, [searchState.inputActive])

    useMemo(() => {
        setSuggestions(ingredients.all)
    }, [ingredients.all])

    const handleInputActivation = (e) => {
        e.stopPropagation()
        isFixed && setFixedPosition(true)
        setSearchState({ inputActive: true })
    }
    const handleBlur = (inputRef, setState) => {
        setInputValues((prev) => ({ ...prev, current: "" }))
        inputRef.current.blur()
        setState.setSearchState({ inputActive: false })
        setState.setFixedPosition(false)

        const h1 = document.querySelector("header h1")
        h1.click() //click sull'header per chiudere la tastiera
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase()
        setInputValues((prev) => ({ ...prev, current: e.target.value }))
        setSuggestions(ingredients.all.filter((ing) => ing.name.toUpperCase().includes(inputValue)))
    }

    const handleSuggestionClick = (prop, cardState, setCardState) => {
        setInputValues((prev) => ({ ...prev, current: cardState.label }))
        const selectedIngs = ingredients.displayed.filter((ing) => ing.isSelected)
        if (prop === "isBlackListed") {
            //gestisce click per aggiungere rimuovere elementi alla blacklist
            handleIngUpdate(prop, cardState, setCardState)
        } else if (prop === "isSelected") {
            // gestisce click per aggiugnere / rimuovere agli ingredienti selezionati
            if (selectedIngs.length === 8 && !cardState.isSelected) {
                // messaggio di avviso se sono già selezionati 8 elementi
                handleOpenSnackbar("You've reached the maximum number of ingredients!")
            } else {
                // aggiornamento e feedback se non sono già selezionati 8 elementi
                handleIngUpdate(prop, cardState, setCardState)
                !cardState.isSelected
                    ? handleOpenSnackbar(`${cardState.label} was locked!`, 1500)
                    : handleOpenSnackbar(`${cardState.label} was unlocked`, 1500)
            }
        }
    }

    const handleInputDeactivation = (prop) => {
        let firstAvailableIngredient
        const selectedIngs = ingredients.displayed.filter((ing) => ing.isSelected)

        let isInDatabase = ingredients.filtered.filter(
            (ing) => ing.name.toUpperCase().includes(inputValues.current.toUpperCase()) && !ing.isSelected && !ing.isBlackListed
        )

        if (prop === "isBlackListed") {
            const notAlreadyBL = ingredients.blacklisted.filter((blIngredient) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === blIngredient.id || dbIngredient.name.toUpperCase() === blIngredient.name.toUpperCase()
                )
            )
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !notAlreadyBL.some((blIngredient) => blIngredient.id === dbIngredient.id)
            )
        } else if (prop === "isSelected") {
            const notAlreadySelected = selectedIngs.filter((onDisplay) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === onDisplay.id || dbIngredient.name.toUpperCase() === onDisplay.name.toUpperCase()
                )
            )
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !notAlreadySelected.some((blIngredient) => blIngredient.id === dbIngredient.id)
            )
            if (firstAvailableIngredient && selectedIngs.length === 8) {
                handleOpenSnackbar("You've reached the maximum number of ingredients!")
            }
        }

        if (inputValues.current !== "" && firstAvailableIngredient) {
            setInputValues((prev) => ({ ...prev, current: "" }))
            setSearchState({ inputActive: false })
            handleIngUpdate(prop, firstAvailableIngredient, setCardState)
            handleOpenSnackbar(`${firstAvailableIngredient.name} was locked!`, 1500)
        } else {
            setInputValues((prev) => ({ ...prev, current: "" }))
            setSearchState({ inputActive: false })
        }
        setSuggestions(ingredients.all.filter((ing) => !ing.isBlacklisted))
    }

    const handlePressEnter = (e, inputRef, setState) => {
        if (e.keyCode === 13) {
            handleInputDeactivation(searchCriteria)
            handleBlur(inputRef, setState)
        } else if (e.keyCode === 27) {
            handleBlur(inputRef, setState)
        }
    }

    const handleReset = (prop, cardState, setCardState) => {
        handleDeselectAll(prop, cardState, setCardState)
    }

    return {
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handleSuggestionClick,
        handlePressEnter,
        handleReset,
        setInputValues,
        handleBlur,
        setCondition,
        setFixedPosition,
        setSearchState,
        inputValues,
        searchState,
        suggestions,
        fixedPosition,
        condition,
    }
}
