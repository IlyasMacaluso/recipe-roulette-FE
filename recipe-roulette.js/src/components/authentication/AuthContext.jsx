import { createContext, useEffect, useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest"
import { useQueryClient } from "@tanstack/react-query"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { getValue } = useLocalStorage()
    const { handlePostRequest } = usePostRequest()
    const queryClient = useQueryClient()

    useEffect(() => {
        try {
            const userData = getValue("userData")

            if (!userData) {
                setIsAuthenticated(false)
                return
            }

            const id = userData.id
            const token = userData.token

            if (!userData?.token) {
                setIsAuthenticated(false)
                return
            }

            if (userData?.token) {
                setIsAuthenticated(true)
            }
            
            handlePostRequest({
                url: "http://localhost:3000/api/users/verify-token",
                payload: { user: { id, token } },
                onSuccess: () => setIsAuthenticated(true),
                onError: () => {
                    console.log(error.message)
                    if (res.message === "Invalid token!") {
                        setIsAuthenticated(false)
                    }
                },
            })
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        queryClient.invalidateQueries()
    }, [isAuthenticated])

    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
}
