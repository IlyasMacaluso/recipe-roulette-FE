import { useEffect } from "react"
import { useBlacklistPost } from "./useBlacklistPost"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"

export function useTestPost(ingredients, setIngredients) {
    const { handleBlacklistUpdate } = useBlacklistPost()
    const { getValue } = useLocalStorage()

    useEffect(() => {
        const intID = setInterval(() => {
            test_quick_multiple_updates()
        }, 8000)

        setTimeout(() => {
            clearInterval(intID)
        }, 65000)
    }, [])

    const test_quick_multiple_updates = async () => {
        const { id } = getValue("userData")
        const newBl = ingredients.all.map((ing) => ({ ...ing, isBlackListed: true }))
        setIngredients((prev) => ({ ...prev, blacklisted: newBl }))

        const intervalId = setInterval(() => {
            setIngredients((prev) => {
                if (prev.blacklisted.length === 0) {
                    clearInterval(intervalId)
                    return prev
                }

                prev.blacklisted.pop()
                const updatedBlacklisted = [...prev.blacklisted]

                // Assicurati di usare l'ultimo stato aggiornato per la chiamata al server
                handleBlacklistUpdate(updatedBlacklisted, id)

                return {
                    ...prev,
                    blacklisted: updatedBlacklisted,
                }
            })
        }, 250)

        // Cancella l'intervallo dopo 3 secondi se non è già stato cancellato
        setTimeout(() => {
            clearInterval(intervalId)
            setIngredients((prev) => {
                console.log(prev.blacklisted)
                return prev
            })
        }, 3000)
    }

    return { test_quick_multiple_updates }
}
