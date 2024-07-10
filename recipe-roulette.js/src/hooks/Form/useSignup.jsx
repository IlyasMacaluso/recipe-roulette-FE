import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"

export function useSignup(setShowPopup) {
    const [data, setData] = useState(createData())
    const [passError, setPassError] = useState(null)
    const [isRegistered, setisRegistered] = useState()
    const { handleOpenSnackbar } = useSnackbar()

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

    function getItem(data) {
        try {
            const username = window.localStorage.getItem("username")
            const email = window.localStorage.getItem("email")
            const password = window.localStorage.getItem("password")

            if (username && password) {
                setData({ ...data, username, password, email })
            }
        } catch (error) {
            console.log(error)
        }
    }

    function setItem(data) {
        try {
            localStorage.setItem("username", data.username)
            localStorage.setItem("email", data.email)
            localStorage.setItem("password", data.password)
        } catch (error) {
            console.error("Error while saving to localStorage:", error)
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

    async function handlePostSignUpData(data) {
        try {
            const response = await fetch("http://localhost:3000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data?.username,
                    email: data?.email,
                    password: data?.password,
                }),
            })

            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText)
            }

            const responseData = await response.json()
            console.log(responseData)
            return responseData
        } catch (error) {
            console.error("Error while fetching data:", error)
            throw new Error("Error while fetching data")
        }
    }

    const mutation = useMutation({
        mutationFn: handlePostSignUpData,
        onSuccess: (data) => {
            console.log(data)
            getItem()
            setItem(data)
            setisRegistered(true)
            handleOpenSnackbar("Signed up successfully! Please log in", 3000)
            setTimeout(() => setShowPopup(false), 0)
        },
        onError: (error) => {
            handleOpenSnackbar("There is already a user with this username or password", 3500)
            console.error("Signup failed:", error.message)
        },
    })

    //serve? il bottone non si attiva se le password non sono uguali
    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
        if (data.password === data.confirmPass && data.check) {
            mutation.mutate({ username: data.username, email: data.email, password: data.password })
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
