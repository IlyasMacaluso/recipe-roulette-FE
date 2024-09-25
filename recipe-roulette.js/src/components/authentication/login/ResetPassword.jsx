import { useCenterItem } from "../../../hooks/useCenterItem/useCenterItem"
import { useLocation } from "@tanstack/react-router"
import { useLogin } from "../../../hooks/Form/useLogin"
import { GoogleLoginBtn } from "../../SocialLoginButtons/GoogleLoginBtn"
import { FacebookSocialBtn } from "../../SocialLoginButtons/FacebookLoginBtn"
import { Button } from "../../Buttons/Button/Button"
import { useForm } from "../../../hooks/useForm/useForm"
import { useEffect, useMemo, useRef, useState } from "react"
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"
import { Input } from "../../Input/Input"
import { InlineMessage } from "../../InlineMessage/InlineMessage"

import CloseIcon from "@mui/icons-material/Close"
import LoginIcon from "@mui/icons-material/Login"

import classes from "./Login.module.scss"

export function ResetPassword(showPopup = null, setShowPopup = null, setForgotPassword = null, setResetPassword = null) {
    const { data, showText, handleInputChange, handleShowText } = useForm({
        password: "",
        confirmPass: "",
    })

    const message = useMemo(() => {
        const { password, confirmPass } = data

        if (password && confirmPass) {
            if (password.length >= 8 || confirmPass.length >= 8) {
                if (password !== confirmPass) {
                    return "Passwords do not match"
                } else {
                    return null
                }
            } else {
                return "Password must be at least 8 characters long"
            }
        }
    }, [data])

    const buttonActive = useMemo(() => {
        const { password, confirmPass } = data

        if (!password || !confirmPass) {
            return false
        }

        if (password.length < 8 || confirmPass.length < 8) {
            return false
        }

        if (password === confirmPass) {
            return true
        } else {
            return false
        }
        
    }, [data])

    console.log(buttonActive)

    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>
                <h1>Set New Password</h1>
                <div onClick={() => setShowPopup && setShowPopup()} className={classes.closeIco}>
                    <CloseIcon />
                </div>
            </header>

            <form className={classes.formWrapper} onSubmit={(e) => e.preventDefault()}>
                <div className={classes.inputsWrapper}>
                    <Input
                        isPopUp={showPopup}
                        name="password"
                        type={showText ? "text" : "password"}
                        placeholder={"Password"}
                        handleInputChange={handleInputChange}
                        hasIcons={true}
                        handleShowText={handleShowText}
                        error={data.password && data.confirmPass && data.password !== data.confirmPass}
                        value={data.password}
                    />

                    <Input
                        isPopUp={showPopup}
                        name="confirmPass"
                        type={showText ? "text" : "password"}
                        placeholder={"Confrim password"}
                        handleInputChange={handleInputChange}
                        hasIcons={true}
                        handleShowText={handleShowText}
                        error={data.password && data.confirmPass && data.password !== data.confirmPass}
                        value={data.confirmPass}
                    />

                    {/* {(error || loading) && <InlineMessage error={error} loading={loading} />} */}
                    {message && <InlineMessage message={message} />}
                </div>

                <div className={classes.bottomItems}>
                    <Button
                        type={"button"}
                        style="primary"
                        label={"Reset Password"}
                        width="fill"
                        iconLeft={<LoginIcon fontSize="small" />}
                        active={buttonActive}
                        action={() => "send reset password email"}
                    />

                    <div className={classes.textBlock}>
                        <Button
                            style="transparent"
                            action={() => {
                                setForgotPassword(false)
                            }}
                            label={"Return to login"}
                        />
                    </div>
                    <div className={classes.divider} />

                    <div className={classes.textBlock}>
                        <p className={classes.text}>Don't have an account yet?</p>
                        <Button style="transparent" action={() => setChangeToSignup && setChangeToSignup(true)} label="Sign Up" />
                    </div>
                </div>
            </form>
        </div>
    )
}
