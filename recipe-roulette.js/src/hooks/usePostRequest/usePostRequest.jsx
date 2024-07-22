import { useMutation } from "@tanstack/react-query"
import { useCancelMutation } from "../useCancelMutation.jsx/useCancelMutation"
import axios from "axios"

export function usePostRequest() {
    const { cancelMutation } = useCancelMutation()

    const postRequest = async (data) => {
        try {
            const url = data.url
            const signal = data?.signal
            const payload = data?.payload
            const res = await axios.post(url, payload, { signal })

            if (res.status !== 201) {
                throw new Error(`Network error, ${res?.data.msg || "Bad request"}`)
            }

            return res.data
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("request canceled", error.message)
            } else {
                console.log(error)
                throw new Error(error.response?.data.msg || "Something went wrong")
            }
        }
    }

    const mutation = useMutation({
        mutationFn: postRequest, //variables = data
        onMutate: async (variables) => {
            const abortController = new AbortController()
            const context = { id: variables.mutationId, abortController, variables }
            return context
        },
        onSuccess: (resData) => {
            if (resData) {
                console.log(resData)
            }
        },
        onError: (error) => {
            console.error(error)
        },
    })

    const handlePostRequest = async (url, payload, mutationId = null, meta = null) => {
        //meta !== null => mutation with this mutationId will be queued
        //mutationId => sameId = sameQueue
        mutationId && cancelMutation(mutationId)
        mutation.mutate(
            {
                url,
                payload,
                mutationId,
                signal: mutationId ? mutation?.context?.abortController.signal : null,
            },
            { meta }
        )
    }

    return { handlePostRequest, postRequest }
}
