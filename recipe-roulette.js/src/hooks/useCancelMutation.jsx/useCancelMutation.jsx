import { useQueryClient } from "@tanstack/react-query"

export function useCancelMutation() {
    const queryClient = useQueryClient()

    const cancelMutation = (mutationId) => {
        const mutationCache = queryClient.getMutationCache()
        const mutations = mutationCache.getAll()

        // Identifica l'ultima mutazione con il mutationId specificato
        const lastMutationIndex = mutations
            .map((mutation, index) => ({ mutation, index }))
            .filter(({ mutation }) => mutation.state.context?.id === mutationId)
            .pop()?.index

        if (lastMutationIndex !== undefined) {
            mutations.forEach((mutation, index) => {
                if (mutation.state.context?.id === mutationId && index !== lastMutationIndex) {
                    mutation.state?.context?.abortController.abort()
                }
            })
        }

        // Pulisci la cache delle mutazioni se supera una certa lunghezza
        if (mutations.length > 10) {
            // max 10 to limit performance loss (foreach cicle on each request)
            mutationCache.clear()
        }
    }

    return { cancelMutation }
}
