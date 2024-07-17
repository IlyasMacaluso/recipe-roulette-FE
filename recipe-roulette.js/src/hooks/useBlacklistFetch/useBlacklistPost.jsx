import { useMutation } from "@tanstack/react-query"
import { useCancelMutation } from "../useCancelMutation.jsx/useCancelMutation"
import axios from "axios"

export function useBlacklistPost() {
    const { cancelMutation } = useCancelMutation()

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

    return { handleBlacklistUpdate, updatePending: UpdateBlacklist.isPending }
}
