import { useEffect, useState } from "react"
import { useAuth } from "../Auth/useAuth"
import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"

import axios from "axios"

export function useLogin(setShowPopup) {
    const [data, setData] = useState(createData())
    const [showPassword, setShowPassword] = useState(false)
    const { getValue, setValue } = useLocalStorage()
    const { setIsAuthenticated } = useAuth()
    const { handleOpenSnackbar } = useSnackbar()

    function createData() {
        return {
            username: ``,
            password: ``,
            check: false,
        }
    }
    useEffect(() => {
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
            throw new Error(error?.response?.data.msg || error)
        }
    }

    const Login = useMutation({
        mutationFn: loginFn,
        onSuccess: (resData) => {
            console.log(resData);
            const { id, username, email, token } = resData
            setValue("userData", { id, username, email, token, rememberMe: data.check })

            setIsAuthenticated(true)
            handleOpenSnackbar("You are now logged in!", 3000)

            setTimeout(() => {
                setShowPopup(false)
                const h1 = document.querySelector("header h1")
                h1.click() //click sull'header per chiudere la tastiera
            }, 0)
        },
        onError: (error) => {
            console.error(error)
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
        error: Login.error,
        loading: Login.isPending,
        handleInput,
        handleSubmit,
        handleShowPassword,
    }
}
