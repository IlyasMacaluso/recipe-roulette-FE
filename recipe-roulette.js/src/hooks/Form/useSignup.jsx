import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useAuth } from "../Auth/useAuth"
import axios from "axios"
import { usePostRequest } from "../usePostRequest/usePostRequest"

export function useSignup(setShowPopup) {
    const [data, setData] = useState(createData())
    const { handleOpenSnackbar } = useSnackbar()
    const { setIsAuthenticated } = useAuth()
    const { setValue } = useLocalStorage()
    const { postRequest } = usePostRequest()

    //ho importato questi per settare nel localStorage i dati dell'utente ed effettuare l'accesso

    function createData() {
        return {
            username: "",
            email: "",
            password: "",
            confirmPass: "",
            check: false,
        }
    }

    function handleInput(e) {
        const name = e.target.name
        const value = e.target.value
        const checked = e.target.checked
        const type = e.target.type

        setData((d) => {
            return {
                ...d,
                [name]: type === `checkbox` ? checked : value,
            }
        })
    }

    const Signup = useMutation({
        mutationFn: () => postRequest({ url: "http://localhost:3000/api/users/signup", payload: data }),
        onSuccess: (data) => {
            const { id, username, email, token } = data

            setValue("userData", { id, username, email, token })
            setIsAuthenticated(true)
            handleOpenSnackbar("Signup & Login successfull!", 3000)
            setTimeout(() => setShowPopup(false), 0)
        },
        onError: (error) => {
            console.error(error.message)
        },
    })

    function handleSubmit(e) {
        e.preventDefault()
        Signup.mutate()
    }

    return {
        data,
        loading: Signup.isPending,
        error: Signup.error,
        handleInput,
        handleSubmit,
    }
}
