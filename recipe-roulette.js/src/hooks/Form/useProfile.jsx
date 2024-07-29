import { useState, useEffect } from "react"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useAuth } from "../Auth/useAuth"
import { useForm } from "../useForm/useForm"

export function useProfile() {
    const [isEditing, setIsEditing] = useState(false)

    const { data, showText, setData, handleInputChange, handleShowText } = useForm({
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

        if (file) {
            const filePath = URL.createObjectURL(file)

            // Aggiorna data.avatar con il percorso del file
            setData((prev) => ({ ...prev, avatar: filePath }))

            //funzione per aggiornare i dati del database
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
        data,
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
