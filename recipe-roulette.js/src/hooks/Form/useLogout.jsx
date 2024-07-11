import { useState } from "react"
import { useAuth } from "../Auth/useAuth"
import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import axios from "axios"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"

export function useLogout(setShowPopup) {
    const [data, setData] = useState()

    const { setValue, getValue } = useLocalStorage()
    const { setIsAuthenticated } = useAuth()
    const { handleOpenSnackbar } = useSnackbar()

    const logoutFn = async () => {
        const clientData = getValue("userData")
        if (clientData) {
            console.log(clientData)
            try {
                const res = await axios.post("http://localhost:3000/api/users/logout", clientData)

                if (res.status !== 200) {
                    throw new Error(`Network error, ${res.data.msg}`)
                }

                const resData = await res.data
                return resData
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        } else {
            throw new Error(error || "Failed retrieving data from local storage")
        }
    }

    const Logout = useMutation({
        mutationFn: logoutFn,
        onSuccess: () => {
            
            setValue("userData", null)

            setIsAuthenticated(false)
            handleOpenSnackbar("You are now logged out!", 3000)

            setTimeout(() => setShowPopup(false), 0)
        },
        onError: (error) => {
            handleOpenSnackbar(error.response.data.msg, 3500)
            console.error("Login failed:", error.message)
        },
    })

    function handleLogout() {
        Logout.mutate(data)
    }

    return {
        data,
        handleLogout,
    }
}
