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

export function Signup({ setShowPopup = null, setChangeToSignup = null }) {
    const location = useLocation()

    const { handleSubmit, error, loading } = useSignup(setShowPopup)
    const { data, showText, handleInputChange, handleShowText } = useForm({
        username: "",
        email: "",
        password: "",
        confirmPass: "",
        termsAndConditions: false,
    })

    const { password, confirmPass, username, email, termsAndConditions } = useMemo(() => {
        return data
    }, [data])

    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>
                <h1>Signup</h1>
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
                        name="username"
                        value={username}
                        handleInputChange={handleInputChange}
                        placeholder={"Insert your username"}
                        label="Username"
                        required={true}
                    />

                    <Input
                        name="email"
                        type="email"
                        value={email}
                        handleInputChange={handleInputChange}
                        placeholder={"Insert your email"}
                        label="Email"
                    />

                    <Input
                        name="password"
                        type={showText ? "text" : "password"}
                        placeholder={"Insert your password"}
                        handleInputChange={handleInputChange}
                        hasIcons={true}
                        handleShowText={handleShowText}
                        error={password && confirmPass && password !== confirmPass}
                        value={password}
                        label="Password"
                    />

                    <Input
                        name="confirmPass"
                        type={showText ? "text" : "password"}
                        placeholder={"Confrim your password"}
                        handleInputChange={handleInputChange}
                        hasIcons={true}
                        handleShowText={handleShowText}
                        error={password && confirmPass && password !== confirmPass}
                        value={confirmPass}
                        label="Password"
                    />

                    <Input
                        type="checkbox"
                        name="termsAndConditions"
                        id="termsAndConditions"
                        value={termsAndConditions}
                        handleInputChange={handleInputChange}
                        label={"I agree with Terms & Conditions"}
                    />
                </div>

                <InlineMessage error={error} loading={loading} />

                <div className={classes.buttonsWrapper}>
                    <Button
                        style="primary"
                        width="fill"
                        type="submit"
                        label="Sign up"
                        icon={<EditNoteIcon fontSize="small" />}
                        active={username && password && confirmPass && email && termsAndConditions && confirmPass === password}
                        prevPath={location.pathname}
                    />

                    <Button
                        action={() => setShowPopup && setShowPopup(false)}
                        prevPath={location.pathname}
                        label="Skip"
                        icon={<StartIcon fontSize="small" />}
                    />
                </div>
                <div className={classes.loginToSignup}>
                    <p>Already have an account?</p>
                    <Button action={() => setChangeToSignup(false)} label="Login" />
                </div>
            </form>
        </div>
    )
}
