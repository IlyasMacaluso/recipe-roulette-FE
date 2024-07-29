import { useState, useEffect } from "react"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useAuth } from "../Auth/useAuth"
import { useForm } from "../useForm/useForm"

export function useProfile() {
    const [isEditing, setIsEditing] = useState(false)

    const {
        data: profileData,
        showText,
        setData,
        handleInputChange,
        handleShowText,
    } = useForm({
        username: "",
        email: "",
        password: "",
        confirmPass: "",
        avatar: "src/assets/images/3d_avatar_26.png",
    })

    const { getValue, setValue } = useLocalStorage()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        const userData = getValue("userData")

        if (userData) {
            const { username = null, email = null, avatar = null } = userData

            if (!isEditing) {
                setData((prev) => {
                    return {
                        ...prev,
                        username: username || prev.username,
                        email: email || prev.email,
                        avatar: avatar || prev.avatar,
                    }
                })
            }
        }
    }, [isAuthenticated, isEditing])

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        let localData = getValue("userData")

        console.log(file)

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result

                setData((prev) => {
                    return {
                        ...prev,
                        avatar: base64String,
                    }
                })

                localData = {
                    ...localData,
                    avatar: base64String,
                }

                setValue("userData", localData)

                console.log(base64String) // Verifica la stringa base64

                // Funzione per aggiornare i dati del database
            }
            reader.readAsDataURL(file) // Assicurati di chiamare readAsDataURL per leggere il file
        }
    }

    const handleSaveChanges = () => {
        let userData = getValue("userData")

        const { username = null, email = null, avatar = null } = userData

        setData((prev) => {
            let newData = {
                ...prev,
                username: prev.username !== "" ? prev.username : username,
                email: prev.email !== "" ? prev.email : email,
                avatar: prev.avatar || avatar,
            }

            userData = {
                ...userData,
                username: prev.username !== "" ? prev.username : username,
                email: prev.email !== "" ? prev.email : email,
                avatar: prev.avatar || avatar,
            }
            setValue("userData", userData)

            return newData
        })

        //funzione per aggiornare i dati del database

        setIsEditing(false)
    }

    const handleDiscardChanges = () => {
        const userData = getValue("userData")

        const { username = null, email = null, avatar = null } = userData

        setData({
            username: username,
            email: email,
            password: "",
            confirmPass: "",
            avatar: avatar || prev.avatar,
        })
        setIsEditing(false)
    }

    return {
        profileData,
        handleInputChange,

        isEditing,
        setIsEditing,

        showText,
        handleShowText,

        handleSaveChanges,
        handleAvatarChange,
        handleDiscardChanges,
    }
}
