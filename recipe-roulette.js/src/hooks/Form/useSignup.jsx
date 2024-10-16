import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useAuth } from "../Auth/useAuth"
import { usePostRequest } from "../usePostRequest/usePostRequest"

export function useSignup(setShowPopup) {
    const { handleOpenSnackbar } = useSnackbar()
    const { setIsAuthenticated } = useAuth()
    const { setValue } = useLocalStorage()
    const { postRequest } = usePostRequest()

    const Signup = useMutation({
        mutationFn: (data) => postRequest({ url: "http://localhost:3000/api/users/signup", payload: data }),
        onSuccess: (data) => {
            const { id, username, email, token, avatar, is_verified } = data
            setValue("userData", { id, username, email, token, rememberMe: data.rememberMe, avatar, isVerified: is_verified })
        },
        onError: (error) => {
            console.error(error.message)
        },
    })

    function handleSubmit(data) {
        Signup.mutate(data)
    }

    return {
        loading: Signup.isPending,
        error: Signup.error,
        success: Signup.isSuccess,
        handleSubmit,
    }
}
