import { useState, useEffect } from "react"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useAuth } from "../Auth/useAuth"

export function useProfile() {
    const [editing, setEditing] = useState(false)
    const [avatar, setAvatar] = useState("src/assets/images/3d_avatar_26.png")
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: "",
    })
    const { getValue, setValue } = useLocalStorage()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        const user = getValue("userData")
        if (user) {
            setUserData((prevData) => ({
                ...prevData,
                username: user.username,
                email: user.email,
            }))
            setAvatar((prev) => user?.avatar || prev)
        }
    }, [isAuthenticated, editing])

    const handleEditClick = () => setEditing(true)

    const handleDiscardClick = () => {
        const user = getValue("userData")

        setUserData({
            username: user.username,
            email: user.email,
            password: "",
            confirmPass: "",
        })
        setAvatar((prev) => user?.avatar || prev)
        setEditing(false)
    }

    const handleSaveClick = () => {
        let localData = getValue("userData")
        localData = {
            ...localData,
            username: userData.username !== "" ? userData.username : localData.username,
            email: userData.email !== "" ? userData.email : localData.email,
        }
        setValue("userData", localData)
        //funzione per aggiornare i dati del database

        // if (userData.password === userData.confirmPass && userData.password !== "") {
        //     localStorage.setItem("password", userData.password)
        // }
        setEditing(false)
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setAvatar(reader.result)
            localStorage.setItem("avatar", reader.result)
        }
        reader.readAsDataURL(file)

        //funzione per aggiornare i dati del database
    }

    const handleSignupInput = (e) => {
        const { name, value } = e.target
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return {
        editing,
        avatar,
        userData,
        handleEditClick,
        handleSaveClick,
        handleAvatarChange,
        handleSignupInput,
        handleDiscardClick,
    }
}
