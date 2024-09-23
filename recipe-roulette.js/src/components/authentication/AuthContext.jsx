import { createContext, useEffect, useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useGetRequest } from "../../hooks/useGetRequest/useGetRequest"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { getValue, setValue } = useLocalStorage()
    const { handlePostRequest } = usePostRequest()
    const { getRequest } = useGetRequest()
    const queryClient = useQueryClient()

    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: ["get-user"],
        queryFn: async () => {
            const { id = null } = getValue("userData")
            if (!id) return
            const res = await getRequest(`http://localhost:3000/api/users/get-user/${id}`)
            return res
        },
    })

    useEffect(() => {
        try {
            const userData = getValue("userData")

            if (!userData) {
                setIsAuthenticated(false)
                return
            }

            const id = userData.id
            const token = userData.token
            let verifiedEmail = userData.is_verified

            if (!verifiedEmail) {
                verifiedEmail = data.is_verified

                if (data.is_verified) {
                    const newUserData = { ...userData, is_verified: data.is_verified }
                    setValue("userData", newUserData)
                }
            }

            // token verification and login
            handlePostRequest({
                url: "http://localhost:3000/api/users/verify-token",
                payload: { user: { id, token } },
                onSuccess: () => {
                    if (verifiedEmail) {
                        setIsAuthenticated(true)
                    }
                },
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
    }, [data])

    useEffect(() => {
        queryClient.invalidateQueries()
    }, [isAuthenticated])

    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
}
