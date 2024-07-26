import { createContext, useEffect, useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { getValue } = useLocalStorage()

    useEffect(() => {
        try {
            const userData = getValue("userData")
            
            if (userData?.token) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
}
