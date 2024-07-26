<<<<<<< HEAD
import { useState } from "react";
import { useAuth } from "../Auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../components/Snackbar/useSnackbar";

export function useLogin() {
  const [data, setData] = useState(createData());
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const {handleOpenSnackbar} = useSnackbar()
=======
import { useAuth } from "../Auth/useAuth"
import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { usePostRequest } from "../usePostRequest/usePostRequest"

export function useLogin(setShowPopup) {
    const { setValue } = useLocalStorage()
    const { setIsAuthenticated } = useAuth()
    const { handleOpenSnackbar } = useSnackbar()
    const { postRequest } = usePostRequest()
>>>>>>> 2e0e9382559818376710367e466d87ebf1e74301

    const Login = useMutation({
        mutationFn: (variables) => postRequest({ url: "http://localhost:3000/api/users/login", payload: variables }),
        onSuccess: (data, variables) => {
            const { id, username, email, token } = data
            setValue("userData", { id, username, email, token, rememberMe: variables.rememberMe })
            setIsAuthenticated(true)
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
