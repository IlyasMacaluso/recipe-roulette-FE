import { useEffect } from "react"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { usePostRequest } from "../usePostRequest/usePostRequest"

export function useTestPost(ingredients, setIngredients, url) {
    const { handlePostRequest } = usePostRequest()
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
        const newBl = ingredients?.all.map((ing) => ({ ...ing, is_blacklisted: true }))
        setIngredients((prev) => ({ ...prev, blacklisted: newBl }))

        const intervalId = setInterval(() => {
            setIngredients((prev) => {
                if (prev.blacklisted.length === 0) {
                    clearInterval(intervalId)
                    return prev
                }

                prev.blacklisted.pop()
                const updatedBlacklisted = [...prev.blacklisted]

                handlePostRequest({
                        url: url,
                        payload: { updatedBlacklisted, id },
                    })

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
