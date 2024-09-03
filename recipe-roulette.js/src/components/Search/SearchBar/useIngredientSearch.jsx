import { useEffect, useMemo, useState } from "react"
import { useManageIngredients } from "../../../pages/Roulette/IngredientsContext"
import { useSnackbar } from "../../Snackbar/useSnackbar"

import classes from "./IngredientSearch.module.scss"
import styles from "../../Header/Header.module.scss"

export function useIngredientSearch(searchCriteria, sidebarState = false) {
    const { ingredients, handleDeselectAll, handleIngUpdate } = useManageIngredients()
    const { handleOpenSnackbar } = useSnackbar()

    const [fixedPosition, setFixedPosition] = useState(false)
    const [searchState, setSearchState] = useState(false)

    const [condition, setCondition] = useState(true) //used in conditional statement
    const [inputValues, setInputValues] = useState({ initial: "", current: "" })
    const [suggestions, setSuggestions] = useState(ingredients?.all)
    const [cardState, setCardState] = useState({
        id: null,
        label: null,
        bg_color: null,
        is_selected: null,
        is_blacklisted: null,
    })

    // chiudo la barra di ricerca se la sidebar viene aperta o chiusa
    useEffect(() => {
        setFixedPosition(false)
        setSearchState(false)

        const input = document.querySelector(`.${styles.header} .${styles.globalActions} input`)

        if (!input) {
            return
        }

        if (sidebarState === true) {
            input.disabled = true
        } else {
            input.disabled = false
        }
    }, [sidebarState])

    // aggiornamento dei suggerimenti
    useEffect(() => {
        setSuggestions(ingredients?.all)
    }, [searchState])

    useMemo(() => {
        setSuggestions(ingredients?.all)
    }, [ingredients?.all])

    // functions

    const handleInputActivation = (e) => {
        e.stopPropagation()
        setFixedPosition(true)
        setSearchState(true)
    }
    const handleBlur = (inputRef, setState) => {
        setInputValues((prev) => ({ ...prev, current: "" }))
        inputRef && inputRef.current.blur()
        setState?.setCondition && setState.setCondition(false)
        setState?.setComponent && setState.setComponent(false)
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase()
        setInputValues((prev) => ({ ...prev, current: e.target.value }))
        setSuggestions(ingredients?.all.filter((ing) => ing.name.toUpperCase().includes(inputValue)))
    }

    const handleSuggestionClick = (prop, cardState, setCardState) => {
        const selectedIngs = ingredients?.displayed.filter((ing) => ing.is_selected)
        setInputValues((prev) => ({ ...prev, current: "" }))
        if (prop === "is_blacklisted") {
            //gestisce click per aggiungere rimuovere elementi alla blacklist
            handleIngUpdate(prop, cardState, setCardState)
        } else if (prop === "is_selected") {
            // gestisce click per aggiugnere / rimuovere agli ingredienti selezionati
            if (selectedIngs.length === 8 && !cardState.is_selected) {
                // messaggio di avviso se sono già selezionati 8 elementi
                handleOpenSnackbar("You've reached the maximum number of ingredients!")
            } else {
                // aggiornamento e feedback se non sono già selezionati 8 elementi
                handleIngUpdate(prop, cardState, setCardState)
                !cardState.is_selected
                    ? handleOpenSnackbar(`${cardState.label} was locked!`, 1500)
                    : handleOpenSnackbar(`${cardState.label} was unlocked`, 1500)
            }
        }
    }

    // const handleInputDeactivation = (prop) => {
    //     // // Filtra gli ingredienti selezionati attualmente nella visualizzazione
    //     // const selectedIngs = ingredients?.displayed.filter((ing) => ing.is_selected)

    //     // // Filtra gli ingredienti nel database che corrispondono alla ricerca corrente
    //     // const isInDatabase = ingredients?.filteredFavorites.filter(
    //     //     (ing) => ing.name.toUpperCase().includes(inputValues.current.toUpperCase()) && !ing.is_selected && !ing.is_blacklisted
    //     // )

    //     // let firstAvailableIngredient = null

    //     // if (prop === "is_blacklisted") {
    //     //     // Filtra gli ingredienti già presenti nella lista nera
    //     //     const notAlreadyBL = ingredients?.blacklisted.filter((blIngredient) =>
    //     //         isInDatabase.some(
    //     //             (dbIngredient) =>
    //     //                 dbIngredient.id === blIngredient.id || dbIngredient.name.toUpperCase() === blIngredient.name.toUpperCase()
    //     //         )
    //     //     )

    //     //     // Trova il primo ingrediente disponibile che non è già nella lista nera
    //     //     firstAvailableIngredient = isInDatabase.find(
    //     //         (dbIngredient) => !notAlreadyBL.some((blIngredient) => blIngredient.id === dbIngredient.id)
    //     //     )
    //     // } else if (prop === "is_selected") {
    //     //     // Filtra gli ingredienti già selezionati nella visualizzazione
    //     //     const notAlreadySelected = selectedIngs.filter((onDisplay) =>
    //     //         isInDatabase.some(
    //     //             (dbIngredient) => dbIngredient.id === onDisplay.id || dbIngredient.name.toUpperCase() === onDisplay.name.toUpperCase()
    //     //         )
    //     //     )

    //     //     // Verifica se il numero massimo di ingredienti selezionati è stato raggiunto
    //     //     if (selectedIngs.length === 8) {
    //     //         handleOpenSnackbar("You've reached the maximum number of ingredients!")
    //     //     } else {
    //     //         // Trova il primo ingrediente disponibile che non è già stato selezionato
    //     //         firstAvailableIngredient = isInDatabase.find(
    //     //             (dbIngredient) => !notAlreadySelected.some((selIngredient) => selIngredient.id === dbIngredient.id)
    //     //         )
    //     //     }
    //     // }

    //     // // Resetta il valore corrente dell'input e lo stato della ricerca
    //     // setInputValues((prev) => ({ ...prev, current: "" }))

    //     // // Se è stato trovato un ingrediente disponibile, aggiorna lo stato della carta e mostra una notifica
    //     // if (firstAvailableIngredient) {
    //     //     handleIngUpdate(prop, firstAvailableIngredient, setCardState)
    //     //     prop === "is_selected" && handleOpenSnackbar(`${firstAvailableIngredient.name} was locked!`, 1500)
    //     // }
    // }

    const handlePressEnter = (e, inputRef, setState) => {
        if (e.key === "Enter") {
            e.preventDefault()
        } else if (e.key === "Escape") {
            handleBlur(inputRef, setState)
        }
    }

    const handleReset = (prop, cardState, setCardState) => {
        handleDeselectAll(prop, cardState, setCardState)
    }

    return {
        handleInputActivation,
        handleInputChange,
        handleSuggestionClick,
        handlePressEnter,
        handleReset,
        setInputValues,
        handleBlur,
        setFixedPosition,
        setSearchState,
        inputValues,
        searchState,
        suggestions,
        fixedPosition,
    }
}
