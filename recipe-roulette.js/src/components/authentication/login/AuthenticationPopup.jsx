import { useLocation } from "@tanstack/react-router"
import { ForgotPassword } from "./ForgotPassword"
import { useState } from "react"
import { ResetPassword } from "./ResetPassword"
import { Login } from "./Login"
import { Signup } from "./Signup"

export function AuthenticationPopup({ showPopup = null, setShowPopup = null}) {
    const [isRegistered, setIsRegistered] = useState(true)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const location = useLocation()

    if (!forgotPassword && !resetPassword && isRegistered) {
        return <Login showPopup={showPopup} setShowPopup={setShowPopup} setForgotPassword={setForgotPassword} setIsRegistered={setIsRegistered} />
    }

    if (!forgotPassword && !resetPassword && !isRegistered) {
        return <Signup showPopup={showPopup} setShowPopup={setShowPopup} setIsRegistered={setIsRegistered} />
    }

    if (forgotPassword) {
        return <ForgotPassword setResetPassword={setResetPassword} showPopup={showPopup} setShowPopup={setShowPopup} setForgotPassword={setForgotPassword}  />
    }

    if (resetPassword) {
        return <ResetPassword showPopup={showPopup} setShowPopup={setShowPopup} setForgotPassword={setForgotPassword} setResetPassword={setResetPassword}/>
    }
}
