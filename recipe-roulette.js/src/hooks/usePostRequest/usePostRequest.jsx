import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCancelMutation } from "../useCancelMutation.jsx/useCancelMutation"
import axios from "axios"

export function usePostRequest() {
    const { cancelMutation } = useCancelMutation()
    const queryClient = useQueryClient()

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
        mutationFn: postRequest,
        onMutate: async (variables) => {
            const abortController = new AbortController()
            const context = { id: variables.mutationId, abortController, variables }
            return context
        },
        onSuccess: (data, variables) => {
            console.log(data)

            if (variables?.queryKey) {
                variables.queryKey.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: key })
                })
            }
        },
        onError: (error) => {
            console.error(error)
        },
    })

    const handlePostRequest = async ({ url, payload, mutationId = null, queryKey = null }, meta = null) => {
        mutationId && cancelMutation(mutationId)
        mutation.mutate(
            {
                url,
                payload, //data needed for the post request
                mutationId, // needed to cancel previous requests
                queryKey, //invalidate query onSuccess (re execute query with this id)
                signal: mutationId ? mutation?.context?.abortController.signal : null, // cancels previous requests with that mutationId
            },
            { meta } //scopeId (queue requests with same scopeId)
        )
    }

    return { handlePostRequest, postRequest }
}
