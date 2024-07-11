import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useAuth } from "../Auth/useAuth"
import axios from "axios"

export function useSignup(setShowPopup) {
    const [data, setData] = useState(createData())
    const [passError, setPassError] = useState(null)
    const [isRegistered, setisRegistered] = useState()
    const { handleOpenSnackbar } = useSnackbar()
    const { setIsAuthenticated } = useAuth()
    const { setValue } = useLocalStorage()

    //ho importato questi per settare nel localStorage i dati dell'utente ed effettuare l'accesso

    function createData() {
        return {
            username: ``,
            email: ``,
            password: ``,
            confirmPass: ``,
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

    const signupFn = async (clientData) => {
        try {
            const res = await axios.post("http://localhost:3000/api/users/signup", clientData)

            if (res.status !== 201) {
                throw new Error(`Network error, ${res.data.msg}`)
            }

            const resData = await res.data
            return resData
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    const Signup = useMutation({
        mutationFn: signupFn,
        onSuccess: (data) => {
            const { id, username, email, token } = data
            setValue("userData", { id, username, email, token })

            setisRegistered(true)
            setIsAuthenticated(true)
            handleOpenSnackbar("Signup & Login successfull!", 3000)

            setTimeout(() => {
                setShowPopup(false)
                const h1 = document.querySelector("header h1")
                h1.click() //click sull'header per chiudere la tastiera
            }, 0)
        },
        onError: (error) => {
            handleOpenSnackbar("There is already a user with this username or password", 3500)
            handleOpenSnackbar(error.message, 3500)

            console.error("Signup failed:", error.message)
        },
    })

    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
        //serve? il bottone non si attiva se le password non sono uguali
        if (data.password === data.confirmPass && data.check) {
            Signup.mutate({ username: data.username, email: data.email, password: data.password })
        } else {
            console.log("Please, confirm your password")
            setPassError(`Please, confirm your password`)
        }
    }

    return {
        data,
        passError,
        isRegistered,
        handleInput,
        handleSubmit,
    }
}
