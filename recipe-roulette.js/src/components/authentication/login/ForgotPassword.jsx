import { Button } from "../../Buttons/Button/Button"
import { useForm } from "../../../hooks/useForm/useForm"
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"
import { Input } from "../../Input/Input"
import { InlineMessage } from "../../InlineMessage/InlineMessage"

import CloseIcon from "@mui/icons-material/Close"
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined"

import classes from "./Login.module.scss"

export function ForgotPassword({ setResetPassword = null, showPopup = false, setShowPopup = null, setForgotPassword = null }) {
    const { getValue } = useLocalStorage()
    const { data, handleInputChange } = useForm({
        emailOrUsername: "",
    })

    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>
                <h1>Reset Your Password</h1>
                <div onClick={() => setShowPopup && setShowPopup()} className={classes.closeIco}>
                    <CloseIcon />
                </div>
            </header>

            <form className={classes.formWrapper} onSubmit={(e) => e.preventDefault()}>
                <div className={classes.inputsWrapper}>
                    <Input
                        isPopUp={showPopup}
                        name="emailOrUsername"
                        value={data.emailOrUsername}
                        placeholder={"Email or Username"}
                        handleInputChange={(e) => handleInputChange(e)}
                        required={true}
                    />

                    {/* {(error || loading) && <InlineMessage error={error} loading={loading} />} */}
                </div>

                <div className={classes.bottomItems}>
                    <Button
                        type={"button"}
                        style="primary"
                        label={"Reset Password"}
                        width="fill"
                        iconLeft={<ForwardToInboxOutlinedIcon fontSize="small" />}
                        active={data.emailOrUsername}
                        action={() => {
                            "send reset password email"
                            setResetPassword && setResetPassword(true)
                            setForgotPassword && setForgotPassword(false)
                        }}
                        // username or email exists in DB ? create token with jwt and send email to user.email
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
                </div>
            </form>
        </div>
    )
}
