import { useAuth } from "../Auth/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { usePostRequest } from "../usePostRequest/usePostRequest"

export function useLogin(setShowPopup) {
    const { setValue } = useLocalStorage()
    const { setIsAuthenticated } = useAuth()
    const { handleOpenSnackbar } = useSnackbar()
    const { postRequest } = usePostRequest()
    const queryClient = useQueryClient()

    const Login = useMutation({
        mutationFn: (variables) => postRequest({ url: "http://localhost:3000/api/users/login", payload: variables }),
        onSuccess: (data, variables) => {
            const { id, username, email, token, avatar } = data
            
            setValue("userData", { id, username, email, token, rememberMe: variables.rememberMe, avatar })
            setIsAuthenticated(true)

            const keys = [
                ["get-recipes-history"],
                ["get-food-preferences"],
                ["get-favorited-recipes"],
                ["blacklisted-ingredients"],
                ["ingredients"],
            ]
            keys.forEach((key) => queryClient.invalidateQueries(key))

            handleOpenSnackbar("You are now logged in!", 3000)
            setTimeout(() => setShowPopup(false), 0)
        },
        onError: (error) => {
            console.error(error)
        },
    })

    function handleSubmit(data) {
        Login.mutate(data)
    }

    return {
        error: Login.error,
        loading: Login.isPending,
        handleSubmit,
    }
}
