import { useCenterItem } from "../../../hooks/useCenterItem/useCenterItem"
import { useLocation } from "@tanstack/react-router"
import { useLogin } from "../../../hooks/Form/useLogin"
import { GoogleLoginBtn } from "../../SocialLoginButtons/GoogleLoginBtn"
import { FacebookSocialBtn } from "../../SocialLoginButtons/FacebookLoginBtn"
import { Button } from "../../Buttons/Button/Button"
import { useForm } from "../../../hooks/useForm/useForm"
import { useEffect, useRef } from "react"
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"
import { Input } from "../../Input/Input"
import { InlineMessage } from "../../InlineMessage/InlineMessage"

import CloseIcon from "@mui/icons-material/Close"
import LoginIcon from "@mui/icons-material/Login"

import classes from "./Login.module.scss"

export function Login({ showPopup = null, setShowPopup = null, setChangeToSignup = null }) {
    const location = useLocation()

    const { getValue } = useLocalStorage()
    const { handleSubmit, error, loading } = useLogin(setShowPopup)
    const { data, setData, showText, handleInputChange, handleShowText } = useForm({
        username: "",
        email: "",
        password: "",
        rememberMe: false,
    })

    useEffect(() => {
        //imposta il campo username se: 1) nel localStorage ci sono dati salvati, 2) rememberMe è stata checkata
        const userData = getValue("userData")
        if (userData) {
            const { username, rememberMe } = userData
            rememberMe && setData((prev) => ({ ...prev, username: username, rememberMe: rememberMe }))
        }
    }, [])

    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>
                <h1>Login</h1>
                <div onClick={() => setShowPopup && setShowPopup()} className={classes.closeIco}>
                    <CloseIcon />
                </div>
            </header>

            <form
                className={classes.formWrapper}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(data)
                }}
            >
                <div className={classes.inputsWrapper}>
                    <Input
                        isPopUp={showPopup}
                        name="username"
                        value={data.username}
                        placeholder={"Username"}
                        handleInputChange={(e) => handleInputChange(e)}
                        required={true}
                    />

                    <Input
                        isPopUp={showPopup}
                        name="password"
                        type={showText ? "text" : "password"}
                        placeholder={"Password"}
                        value={data.password}
                        required={true}
                        hasIcons={true}
                        handleInputChange={(e) => handleInputChange(e)}
                        handleShowText={handleShowText}
                        showText={showText}
                    />

                    <Input
                        isPopUp={showPopup}
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        value={data.rememberMe}
                        handleInputChange={handleInputChange}
                        label="Remember me"
                    />

                    {(error || loading) && <InlineMessage error={error} loading={loading} />}
                </div>

                <div className={classes.bottomItems}>
                    <Button
                        type="submit"
                        style="primary"
                        label="Login"
                        width="fill"
                        iconLeft={<LoginIcon fontSize="small" />}
                        active={data.username && data.password}
                    />
                    <div className={classes.loginToSignup}>
                        <p className={classes.text}>Don't have an account yet?</p>
                        <Button style="transparent" action={() => setChangeToSignup && setChangeToSignup(true)} label="Sign Up" />
                    </div>
                </div>

                {/* <div className={classes.externalLoginWrapper}>
                    <GoogleLoginBtn />
                    <FacebookSocialBtn />
                </div> */}
            </form>
        </div>
    )
}
