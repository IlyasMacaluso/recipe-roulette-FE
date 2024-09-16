import { useState, useEffect } from "react"
import { useLocalStorage } from "../useLocalStorage/useLocalStorage"
import { useAuth } from "../Auth/useAuth"
import { useForm } from "../useForm/useForm"
import { usePostRequest } from "../usePostRequest/usePostRequest"
import { useImageToString } from "../imgToString/imgToString"
import { useBlocker } from "@tanstack/react-router"

export function useProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [blockCondition, setBlockCondition] = useState(false)

    const {
        data: profileData,
        showText,
        setData,
        handleInputChange,
        handleShowText,
    } = useForm({
        username: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPass: "",
        avatar: "",
    })

    const { getValue, setValue } = useLocalStorage()
    const { isAuthenticated } = useAuth()
    const { handlePostRequest, error, loading } = usePostRequest()
    const { imgToString } = useImageToString()
    const { proceed, reset, status } = useBlocker({
        condition: blockCondition,
    })

    useEffect(() => {
        if (isEditing) {
            setBlockCondition(true)
        } else {
            setBlockCondition(false)
        }
    }, [isEditing])

    useEffect(() => {
        const userData = getValue("userData")

        if (!isAuthenticated) {
            setIsEditing(false)
        }

        if (isEditing) {
            return
        }

        if (userData) {
            const { username = null, email = null, avatar = null } = userData

            if (!avatar) {
                imgToString("src/assets/images/3d_avatar_26.png").then((base64Avatar) => {
                    setData((prev) => {
                        return {
                            ...prev,
                            username: username || prev.username,
                            email: email || prev.email,
                            avatar: base64Avatar,
                            oldPassword: "",
                            newPassword: "",
                            confirmNewPass: "",
                        }
                    })
                })
            } else {
                setData((prev) => {
                    return {
                        ...prev,
                        username: username || prev.username,
                        email: email || prev.email,
                        avatar: avatar,
                        oldPassword: "",
                        newPassword: "",
                        confirmNewPass: "",
                    }
                })
            }
            //aggiorna la variabile di stato quando si passa a !isEditing (dopo aver aggiornato i dati, o dopo il login)
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
            }
            reader.readAsDataURL(avatar) // Assicurati di chiamare readAsDataURL per leggere il file
        }
    }

    const handleSaveChanges = () => {
        let localData = getValue("userData")
        const { username = null, email = null, avatar = null } = localData

        setData((prev) => {
            const usernameChanged = username !== prev.username && prev.username !== ""
            const emailChanged = email !== prev.email && prev.email !== ""
            const avatarChanged = avatar !== prev.avatar
            const passwordChanged = prev.oldPassword && prev.newPassword && prev.confirmNewPass && prev.newPassword === prev.confirmNewPass
            const userDataChanged = usernameChanged || emailChanged || avatarChanged || passwordChanged

            let newData = {
                ...prev, //passwords etc
                username: usernameChanged ? prev.username : username,
                email: emailChanged ? prev.email : email,
                avatar: avatarChanged ? prev.avatar : avatar,
            }

            localData = {
                ...localData, //token etc
                username: usernameChanged ? prev.username : username,
                email: emailChanged ? prev.email : email,
                avatar: avatarChanged ? prev.avatar : avatar,
            }
            setValue("userData", localData)

            if (!userDataChanged) {
                setIsEditing(false)
            } else {
                handlePostRequest({
                    url: "http://localhost:3000/api/users/change-user-data",
                    payload: {
                        newUsername: usernameChanged ? prev.username : null,
                        newEmail: emailChanged ? prev.email : null,
                        oldPassword: passwordChanged ? prev.oldPassword : null,
                        newPassword: passwordChanged ? prev.newPassword : null,
                        newAvatar: avatarChanged ? prev.avatar : null,
                        userId: localData.id,
                    },
                    onSuccess: () => setIsEditing(false),
                })
            }

            return newData
        })
    }

    const handleDiscardChanges = () => {
        const userData = getValue("userData")

        const { username = null, email = null, avatar = null } = userData

        setData((prev) => {
            return {
                ...prev,
                username: username,
                email: email,
                oldPassword: "",
                newPassword: "",
                confirmNewPass: "",
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

        loading,
        error,

        status,
        proceed,
        reset,
        setBlockCondition,

        handleSaveChanges,
        handleAvatarChange,
        handleDiscardChanges,
    }
}
