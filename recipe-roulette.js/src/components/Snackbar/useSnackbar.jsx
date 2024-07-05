import { createContext, useContext, useState } from "react"
import { useAuth } from "../../hooks/Auth/useAuth"

// Creare il contesto
const SnackbarContext = createContext()

// Hook per usare il contesto
export const useSnackbar = () => useContext(SnackbarContext)

// Provider del contesto
export const SnackbarProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false)
    const [message, setMessage] = useState("")
    const [intervalId, setIntervalId] = useState(null)
    const { isAuthenticated } = useAuth()
    const [showBtn, setShowBtn] = useState(false)

    const handleOpenSnackbar = (message, duration = 2500) => {
        setShowBtn(false)
        setMessage(message)
        if (!isActive) {
            setIntervalId(
                setTimeout(() => {
                    setIsActive(false)
                }, duration)
            )
            setIsActive(true)
        }
    }

    const handleCloseSnackbar = () => {
        clearInterval(intervalId)
        setIsActive(false)
    }

    function handleClickLoginSnackBar(e) {
        e.preventDefault()
        if (!isAuthenticated) {
            handleOpenSnackbar("Want to add favorites?")
            setShowBtn(true)
        }
    }

    return (
        <SnackbarContext.Provider
            value={{ isActive, message, showBtn, handleCloseSnackbar, handleOpenSnackbar, handleClickLoginSnackBar }}
        >
            {children}
        </SnackbarContext.Provider>
    )
}
