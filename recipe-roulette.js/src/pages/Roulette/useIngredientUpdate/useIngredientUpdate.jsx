import { useAuth } from "../../../hooks/Auth/useAuth"
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"
import { usePostRequest } from "../../../hooks/usePostRequest/usePostRequest"

export const useIngredientUpdate = (ingredients, setIngredients) => {
    const { setValue, getValue } = useLocalStorage()
    const { handlePostRequest } = usePostRequest()
    const { isAuthenticated } = useAuth()

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

            const awaitUpdate = () => {
                if (prop === "is_blacklisted" && isAuthenticated) {
                    //se l'utente è autenticato e sta modificando la prop is_blacklisted di un ingrediente, aggiorno il db
                    const userData = getValue("userData")
                    userData.id &&
                        handlePostRequest(
                            "http://localhost:3000/api/preferences/set-blacklisted-ingredients", //url
                            { newBlacklist: newBlacklisted, userId: userData.id }, //payload
                            "blacklistUpdate", // mutationId
                            { meta: { scope: { id: "blacklistUpdate" } } } //scopeId
                        )
                }
            }

            // Aggiorna il valore degli ingredienti
            setValue("ingredients", newIngredients)
            awaitUpdate()

            return newIngredients
        })
    }

    //Nota: deleseziona anche gli elementi blacklistati!!
    const handleDeselectAll = (prop) => {
        // Funzione per mappare l'array e impostare il valore della proprietà a false
        const mapArray = (array) => array && array.length > 0 && array.map((item) => ({ ...item, [prop]: false }))

        setIngredients((prev) => {
            const newIngredients = mapArray(prev?.all)
            let newDisplayed = mapArray(prev.displayed)
            let newBlacklisted = []

            if (isAuthenticated) {
                //se l'utente è autenticato e sta modificando la prop is_blacklisted di un ingrediente, aggiorno il db
                const userData = getValue("userData")
                userData.id &&
                    handlePostRequest(
                        "http://localhost:3000/api/preferences/set-blacklisted-ingredients", //url
                        { newBlacklist: newBlacklisted, userId: userData.id }, //payload
                        "blacklistUpdate", // mutationId
                        { meta: { scope: { id: "blacklistUpdate" } } } //scopeId
                    )
            }

            // Ritorna il nuovo stato degli ingredienti
            return {
                ...prev,
                all: newIngredients,
                displayed: newDisplayed,
                blacklisted: newBlacklisted,
            }
        })
    }

    return { handleIngUpdate, handleDeselectAll }
}
