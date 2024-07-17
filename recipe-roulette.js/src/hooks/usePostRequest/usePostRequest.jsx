import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export function usePostRequest(url, reqId = null) {
    const postRequest = async (data) => {
        try {
            // console.log(data)
            const res = await axios.post(url, data)

            if (res.status !== 201) {
                throw new Error(`Network error, ${res?.data.msg || "Bad request"}`)
            }

            return res.data
        } catch (error) {
            throw new Error(error.response?.data?.message || error || "Something went wrong")
        }
    }

    const mutation = useMutation({
        mutationFn: postRequest,
        scope: {
            id: reqId ? reqId : null,
        },
        onSuccess: async (resData) => {
            if (await resData) {
                console.log(resData)
            }
        },
        onError: (error) => {
            console.error(error)
        },
    })

    return { mutation }
}
