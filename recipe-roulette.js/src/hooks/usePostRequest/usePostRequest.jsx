import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCancelMutation } from "../useCancelMutation.jsx/useCancelMutation"
import axios from "axios"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"

export function usePostRequest() {
    const { cancelMutation } = useCancelMutation()
    const { getValue } = useLocalStorage()
    const queryClient = useQueryClient()

    const postRequest = async (data) => {
        const userData = getValue("userData")
        try {
            const { url = null, signal = null, payload = null } = data
            const token = userData?.token
            const headers = token ? { Authorization: `Bearer ${token}` } : undefined

            const res = await axios.post(url, payload, { headers, signal })

            if (res.status !== 201) {
                throw new Error(`Network error, ${res.data.msg || "Something went wrong"} `)
            }

            return res.data
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("request canceled", error.message)
            } else {
                // console.log(error)
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
            console.error(error.response.data.msg)
        },
        onSettled: (data, error, variables) => {
            if (error) {
                return
            }
            variables.onSettled && variables.onSettled()
        },
    })

    const handlePostRequest = async ({ url, payload, mutationId = null, queryKey = null, onSettled = null }, meta = null) => {
        mutationId && cancelMutation(mutationId)
        mutation.mutate(
            {
                url,
                payload, //data needed for the post request
                mutationId, // needed to cancel previous requests
                queryKey, //invalidate query onSuccess (re execute query with this id)
                onSettled, //operations to execute on query success
                signal: mutationId ? mutation?.context?.abortController.signal : null, // cancels previous requests with that mutationId
            },
            { meta } //scopeId (queue requests with same scopeId)
        )
    }

    return { handlePostRequest, postRequest, loading: mutation.isPending, error: mutation.error }
}
