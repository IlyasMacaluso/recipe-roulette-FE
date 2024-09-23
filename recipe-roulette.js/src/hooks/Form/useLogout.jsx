import { useAuth } from "../Auth/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { usePostRequest } from "../usePostRequest/usePostRequest"

export function useLogout(setShowPopup) {
    const { setValue, getValue } = useLocalStorage()
    const { setIsAuthenticated } = useAuth()
    const { handleOpenSnackbar } = useSnackbar()
    const { postRequest } = usePostRequest()
    const queryClient = useQueryClient()

    const Logout = useMutation({
        mutationFn: () => {
            const { username, email, token, id } = getValue("userData")
            const user = { username, email, token, id }
            
            setValue(null, "userData")
            return postRequest({ url: "http://localhost:3000/api/users/logout", payload: user })
        },
        onSuccess: () => {
            let newUserData = getValue("userData")
            newUserData = { ...newUserData, token: null }

            setIsAuthenticated(false)
            setValue("userData", newUserData) // setLocalStorage localStorage

            const keys = [["get-recipes-history"], ["get-food-preferences"], ["get-favorited-recipes"], ["ingredients"]]
            keys.forEach((key) => queryClient.invalidateQueries(key))

            handleOpenSnackbar("You are now logged out!", 3000)
            setTimeout(() => setShowPopup(false), 0)
        },
        onError: (error) => {
            console.error("Logout failed:", error.message)
        },
    })

    function handleLogout() {
        Logout.mutate()
    }

    return {
        loading: Logout.isPending,
        error: Logout.error,
        handleLogout,
    }
}
