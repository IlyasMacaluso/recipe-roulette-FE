import { useEffect, useState } from "react"
import { useAuth } from "../Auth/useAuth"
import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { usePostRequest } from "../usePostRequest/usePostRequest"

export function useLogin(setShowPopup) {
    const [data, setData] = useState(createData())
    const [showPassword, setShowPassword] = useState(false)

    const { getValue, setValue } = useLocalStorage()
    const { setIsAuthenticated } = useAuth()
    const { handleOpenSnackbar } = useSnackbar()
    const { postRequest } = usePostRequest()

    function createData() {
        return {
            username: ``,
            password: ``,
            check: false,
        }
    }

    useEffect(() => {
        //imposta il campo username se: 1) nel localStorage ci sono dati salvati, 2) remember me è stata checkata
        const userData = getValue("userData")
        if (userData) {
            const { username, rememberMe } = userData
            userData.rememberMe && setData((prev) => ({ ...prev, username: username, check: rememberMe }))
        }
    }, [])

    function handleInput(e) {
        const type = e.target.type
        const name = e.target.name
        const value = type === "checkbox" ? e.target.checked : e.target.value

        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const Login = useMutation({
        mutationFn: () => postRequest({ url: "http://localhost:3000/api/users/login", payload: data }),
        onSuccess: (resData) => {
            const { id, username, email, token } = resData
            setValue("userData", { id, username, email, token, rememberMe: data.check })
            setIsAuthenticated(true)
            handleOpenSnackbar("You are now logged in!", 3000)
            setTimeout(() => setShowPopup(false), 0)
        },
        onError: (error) => {
            console.error(error)
        },
    })

    function handleSubmit(e) {
        e.preventDefault()
        Login.mutate()
    }

    function handleShowPassword() {
        setShowPassword(!showPassword)
    }
    return {
        data,
        showPassword,
        error: Login.error,
        loading: Login.isPending,
        handleInput,
        handleSubmit,
        handleShowPassword,
    }
}
