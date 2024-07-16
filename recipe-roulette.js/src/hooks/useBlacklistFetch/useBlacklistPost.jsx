import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useEffect } from "react"
import axios from "axios"

export function useBlacklistPost(ingredients, setIngredients) {
    const queryClient = useQueryClient()
    const { getValue } = useLocalStorage()

    // useEffect(() => {
    //     test_quick_multiple_updates()
    // }, [])

    const blacklistPost = async (data) => {
        try {
            const signal = data?.signal
            const res = await axios.post(
                "http://localhost:3000/api/preferences/set-blacklisted-ingredients",
                {
                    newBlacklist: data.newBlacklisted,
                    userId: data.id,
                },
                { signal }
            )

            if (res.status !== 201) {
                throw new Error(`Network error, ${res?.data.msg || "Bad request"}`)
            }
            const resData = await res.data
            return resData
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("request canceled", error.message)
            } else {
                console.log(error)
                throw new Error(error.response?.data.msg || "soemthing went wrong")
            }
        }
    }

    const UpdateBlacklist = useMutation({
        mutationFn: blacklistPost,
        scope: {
            id: "blacklist",
        },
        onMutate: async (variables) => {
            const abortController = new AbortController()
            const context = { id: "blacklistUpdate", abortController, variables }
            return context
        },
        onSuccess: async (resData) => {
            if (await resData) {
                const { msg, blacklisted_ingredients } = resData
                console.log(msg, blacklisted_ingredients)
            }
        },
        onError: (error) => {
            console.error(error)
        },
    })

    const handleBlacklistUpdate = async (newBlacklisted, id) => {
        cancelMutation("blacklistUpdate")
        UpdateBlacklist.mutate({ newBlacklisted, id, signal: UpdateBlacklist?.context?.abortController.signal })
    }

    const cancelMutation = (mutationId) => {
        const mutationCache = queryClient.getMutationCache();
        const mutations = mutationCache.getAll();
    
        // Identifica l'ultima mutazione con il mutationId specificato
        const lastMutationIndex = mutations
            .map((mutation, index) => ({ mutation, index }))
            .filter(({ mutation }) => mutation.state.context?.id === mutationId)
            .pop()?.index;
    
        if (lastMutationIndex !== undefined) {
            mutations.forEach((mutation, index) => {
                if (mutation.state.context?.id === mutationId && index !== lastMutationIndex) {
                    mutation.state?.context?.abortController.abort();
                }
            });
        }
    
        // Pulisci la cache delle mutazioni se supera una certa lunghezza
        if (mutations.length > 10) {
            mutationCache.clear();
        }
    };

    const test_quick_multiple_updates = () => {
        const { id } = getValue("userData")
        setIngredients((prev) => {
            return {
                ...prev,
                blacklist: prev.all,
            }
        })

        for (let index = 0; index < 25; index++) {
            handleBlacklistUpdate(ingredients.blacklisted, id)
            setIngredients((prev) => {
                prev.blacklisted.pop()
                const newBl = prev.blacklisted
                return {
                    ...prev,
                    blacklisted: newBl,
                }
            })
        }
    }

    return { handleBlacklistUpdate, updatePending: UpdateBlacklist.isPending }
}
