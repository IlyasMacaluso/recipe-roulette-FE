import { useState, useEffect } from "react"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useAuth } from "../Auth/useAuth"
import { useForm } from "../useForm/useForm"
import { usePostRequest } from "../usePostRequest/usePostRequest"
import { useImageToString } from "../imgToString/imgToString"

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
        avatar: "",
    })

    const { getValue, setValue } = useLocalStorage()
    const { isAuthenticated } = useAuth()
    const { handlePostRequest } = usePostRequest()
    const { imgToString } = useImageToString()

    useEffect(() => {
        const userData = getValue("userData")

        if (userData) {
            const { username = null, email = null, avatar = null } = userData

            if (!isEditing) {

                imgToString("src/assets/images/3d_avatar_26.png").then((base64Avatar) => {
                    
                    setData((prev) => {
                        return {
                            ...prev,
                            username: username || prev.username,
                            email: email || prev.email,
                            avatar: avatar || base64Avatar,
                        }
                    })
                })
            }
        }
    }, [isAuthenticated, isEditing])

    const handleAvatarChange = (e) => {
        const avatar = e.target.files[0]
        let localData = getValue("userData")

        if (avatar) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result.split(",")[1]

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
            }
            reader.readAsDataURL(avatar) // Assicurati di chiamare readAsDataURL per leggere il file
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

            handlePostRequest({
                url: "http://localhost:3000/api/users/change-avatar",
                payload: { avatar: prev.avatar, userId: userData.id },
            })

            return newData
        })

        //funzione per aggiornare i dati del database

        setIsEditing(false)
    }

    const handleDiscardChanges = () => {
        const userData = getValue("userData")

        const { username = null, email = null, avatar = null } = userData

        setData((prev) => {
            return {
                ...prev,
                username: username,
                email: email,
                password: "",
                confirmPass: "",
                avatar: avatar || prev.avatar,
            }
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
