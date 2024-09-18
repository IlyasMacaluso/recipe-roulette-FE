import { useSignup } from "../../../hooks/Form/useSignup"
import { Button } from "../../Buttons/Button/Button"
import { useLocation } from "@tanstack/react-router"
import { useMemo } from "react"

import EditNoteIcon from "@mui/icons-material/EditNote"
import StartIcon from "@mui/icons-material/Start"
import CloseIcon from "@mui/icons-material/Close"

import classes from "../login/Login.module.scss"
import { Input } from "../../Input/Input"
import { useForm } from "../../../hooks/useForm/useForm"
import { InlineMessage } from "../../InlineMessage/InlineMessage"

export function Signup({ showPopup = false, setShowPopup = null, setChangeToSignup = null }) {
    const location = useLocation()

    const { handleSubmit, error, loading } = useSignup(setShowPopup)
    const { data, showText, handleInputChange, handleShowText } = useForm({
        username: "",
        email: "",
        password: "",
        confirmPass: "",
    })

    const { password, confirmPass, username, email, termsAndConditions } = useMemo(() => {
        return data
    }, [data])

    const message = useMemo(() => {
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
    })

    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>
                <h1>Sign Up</h1>
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
                        value={username}
                        handleInputChange={handleInputChange}
                        placeholder={"Username"}
                        required={true}
                    />

                    <Input
                        isPopUp={showPopup}
                        name="email"
                        type="email"
                        value={email}
                        handleInputChange={handleInputChange}
                        placeholder={"Email"}
                    />

                    <Input
                        isPopUp={showPopup}
                        name="password"
                        type={showText ? "text" : "password"}
                        placeholder={"Password"}
                        handleInputChange={handleInputChange}
                        hasIcons={true}
                        handleShowText={handleShowText}
                        error={password && confirmPass && password !== confirmPass}
                        value={password}
                    />

                    <Input
                        isPopUp={showPopup}
                        name="confirmPass"
                        type={showText ? "text" : "password"}
                        placeholder={"Confrim password"}
                        handleInputChange={handleInputChange}
                        hasIcons={true}
                        handleShowText={handleShowText}
                        error={password && confirmPass && password !== confirmPass}
                        value={confirmPass}
                    />
                </div>

                {(message || error || loading) && <InlineMessage message={message && message} error={error} loading={loading} />}

                <div className={classes.bottomItems}>
                    <Button
                        style="primary"
                        width="fill"
                        type="submit"
                        label="Sign up"
                        iconLeft={<EditNoteIcon fontSize="small" />}
                        active={username && password && confirmPass && email && confirmPass === password}
                        prevPath={location.pathname}
                    />
                    <div className={classes.loginToSignup}>
                        <p className={classes.text}>Already have an account?</p>
                        <Button style="transparent" action={() => setChangeToSignup(false)} label="Login" />
                    </div>
                </div>
            </form>
        </div>
    )
}
