import { useQueryClient } from "@tanstack/react-query"

export function useCancelMutation() {
    const queryClient = useQueryClient()

    const cancelMutation = (mutationId) => {
        const mutationCache = queryClient.getMutationCache()
        const mutations = mutationCache.getAll()

        // Trova l'indice dell'ultima mutazione con mutationId specificato
        let lastMutationIndex = -1
        for (let i = mutations.length - 1; i >= 0; i--) {
            if (mutations[i].state.context?.id === mutationId) {
                lastMutationIndex = i
                break
            }
        }

        if (lastMutationIndex !== -1) {
            mutations.forEach((mutation, index) => {
                if (mutation.state.context?.id === mutationId && index !== lastMutationIndex) {
                    mutation.state?.context?.abortController?.abort()
                }
            })
        }

        // Pulisci la cache delle mutazioni se supera una certa lunghezza
        if (mutations.length > 10) {
            mutationCache.clear()
        }
    }

    return { cancelMutation }
}
