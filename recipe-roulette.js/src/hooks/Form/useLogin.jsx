import { useState } from "react"
import { useAuth } from "../Auth/useAuth"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import axios from "axios"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"

export function useLogin(setShowPopup) {
    const [data, setData] = useState(createData())
    const [showPassword, setShowPassword] = useState(false)
    const { setValue } = useLocalStorage()
    const { setIsAuthenticated } = useAuth()
    const { handleOpenSnackbar } = useSnackbar()

    function createData() {
        return {
            username: ``,
            password: ``,
            check: ``,
        }
    }

    function handleInput(e) {
        const name = e.target.name
        const value = e.target.value

        setData((old) => {
            return {
                ...old,
                [name]: value,
            }
        })
    }

    const loginFn = async (clientData) => {
        try {
            const res = await axios.post("http://localhost:3000/api/users/login", clientData)

            if (res.status !== 200) {
                throw new Error(`Network error, ${res.data.msg}`)
            }

            const resData = await res.data
            return resData
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    const Login = useMutation({
        mutationFn: loginFn,
        onSuccess: (data) => {
            console.log(data);

            const { id, username, email, token } = data
            setValue("userData", { id, username, email, token })
            
            setIsAuthenticated(true)
            handleOpenSnackbar("You are now logged in!", 3000)

            setTimeout(() => {
                setShowPopup(false)
                const h1 = document.querySelector("header h1")
                h1.click() //click sull'header per chiudere la tastiera
            }, 0)
        },
        onError: (error) => {
            handleOpenSnackbar("Incorrect credentials", 3500)
            console.error("Login failed:", error.message)
        },
    })

    function handleSubmit(e) {
        e.preventDefault()
        Login.mutate(data)
    }

    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    return {
        data,
        showPassword,
        handleInput,
        handleSubmit,
        handleShowPassword,
    }
}
