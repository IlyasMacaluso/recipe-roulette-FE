import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/Auth/useAuth"
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"
import { usePostRequest } from "../../../hooks/usePostRequest/usePostRequest"
import { useDebounce } from "../../../hooks/useDebounce/useDebounce"

export const useIngredientUpdate = (ingredients, setIngredients) => {
    const [blacklistedIngredients, setBlacklistedIngredients] = useState(null)
    const [discardBLChanges, setDiscardBLChanges] = useState(null)
    const { setValue, getValue } = useLocalStorage()
    const { handlePostRequest, error: blacklistUpdateErr, loading: blacklistUpdateLoading } = usePostRequest()
    const { isAuthenticated } = useAuth()
    const { debounceValue } = useDebounce(blacklistedIngredients)

    // useEffect(() => {
    //     //chiamata di rete quando cambia il valore di debounce (ricetta da aggiornare)

    //     if (!blacklistedIngredients) {
    //         return
    //     }

    //     if (isAuthenticated) {
    //         const userData = getValue("userData")

    //         userData.id &&
    //             handlePostRequest({
    //                 url: "http://localhost:3000/api/preferences/set-blacklisted-ingredients",
    //                 payload: { newBlacklist: blacklistedIngredients, userId: userData.id },
    //                 mutationId: "blacklistUpdate",
    //             })
    //     }
    // }, [debounceValue])

    const updateDBBlacklist = async () => {
        const userData = getValue("userData")
        
        if (!userData.id) {
            return 
        }
        if (!blacklistedIngredients) {
            return 
        }

        if (!isAuthenticated) {
            return 
        }

        await handlePostRequest({
            url: "http://localhost:3000/api/preferences/set-blacklisted-ingredients",
            payload: { newBlacklist: blacklistedIngredients, userId: userData.id },
            mutationId: "blacklistUpdate",
        })
    }

    const handleIngUpdate = (prop, cardState) => {
        setIngredients((prev) => {
            // Aggiorna la proprietà specificata per l'ingrediente corrispondente in tutti gli ingredienti
            const updatedIngs = prev?.all.map((item) => (item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item))

            // Aggiorna la proprietà specificata per l'ingrediente corrispondente negli ingredienti visualizzati
            const updatedDisplayedIngs = prev.displayed.map((item) =>
                item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item
            )

            // Trova l'ingrediente aggiornato
            const updatedIng = updatedIngs.find((ingredient) => ingredient.id === cardState.id)

            // Verifica se l'ingrediente è già visualizzato
            const isDisplayed = prev.displayed.some((ingredient) => ingredient.id === cardState.id)

            // Inizializza newDisplayed con gli ingredienti visualizzati aggiornati
            let newDisplayed = updatedDisplayedIngs

            // Filtra gli ingredienti nella blacklist
            const newBlacklisted = updatedIngs.filter((item) => item.is_blacklisted)

            if (prop === "is_selected") {
                if (isDisplayed) {
                    newDisplayed = updatedDisplayedIngs
                } else if (prev.displayed.length === 8) {
                    // Se il numero di ingredienti visualizzati è il massimo (8)
                    newDisplayed = []
                    let firstUnselected = true

                    // Cerca il primo elemento non selezionato per sostituirlo con il nuovo
                    prev.displayed.forEach((ing) => {
                        if (!ing.is_selected && firstUnselected) {
                            newDisplayed.push(updatedIng)
                            firstUnselected = false
                        } else {
                            newDisplayed.push(ing)
                        }
                    })
                } else {
                    // Aggiunge il nuovo ingrediente agli ingredienti visualizzati
                    newDisplayed = [updatedIng, ...prev.displayed]
                }
            }

            // Crea il nuovo stato degli ingredienti
            const newIngredients = {
                ...prev,
                all: updatedIngs,
                displayed: newDisplayed,
                blacklisted: newBlacklisted,
            }

            setBlacklistedIngredients(newBlacklisted)

            // Aggiorna il valore degli ingredienti
            setValue("ingredients", newIngredients)

            return newIngredients
        })
    }

    //Nota: deleseziona anche gli elementi blacklistati!!
    const deselectIngredients = (prop) => {
        // Funzione per mappare l'array e impostare il valore della proprietà a false
        const mapArray = (array) => array && array.length > 0 && array.map((item) => ({ ...item, [prop]: false }))

        setIngredients((prev) => {
            const newIngredients = mapArray(prev?.all)
            let newDisplayed = mapArray(prev.displayed)
            let newBlacklisted = prop === "is_blacklisted" ? [] : prev.blacklisted

            setBlacklistedIngredients(newBlacklisted)

            // Ritorna il nuovo stato degli ingredienti
            return {
                ...prev,
                all: newIngredients,
                displayed: newDisplayed,
                blacklisted: newBlacklisted,
            }
        })
    }

    return {
        handleIngUpdate,
        deselectIngredients,
        updateDBBlacklist,
        blacklistUpdateErr,
        blacklistUpdateLoading,
        discardBLChanges,
        setDiscardBLChanges,
    }
}
