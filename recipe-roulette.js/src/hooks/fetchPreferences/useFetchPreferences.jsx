import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useFetchPreferences = () => {
    const preferencesPost = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/preferences/set-preferences", {
                newPreferences: data.preferences,
                userId: data.id,
            })

            if (res.status !== 201) {
                throw new Error(`Network error, ${res.data.msg}`)
            }
            const resData = await res.data
            return resData
        } catch (error) {
            throw new Error(error.response.data.msg)
        }
    }

    const UpdatePreferences = useMutation({
        mutationFn: preferencesPost,
        onSuccess: (resData) => {
            const { msg, preferences } = resData
            console.log(msg, preferences)
        },
        onError: (error) => {
            console.error(error)
        },
    })

    const handlePrefsUpdate = (preferences, id) => {
        UpdatePreferences.mutate({ preferences, id })
    }

    return { handlePrefsUpdate }
}
