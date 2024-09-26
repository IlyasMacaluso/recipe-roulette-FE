import { Button } from "../../Buttons/Button/Button"
import { useForm } from "../../../hooks/useForm/useForm"
import { Input } from "../../Input/Input"
import { InlineMessage } from "../../InlineMessage/InlineMessage"

import CloseIcon from "@mui/icons-material/Close"
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined"

import classes from "./Login.module.scss"
import { usePostRequest } from "../../../hooks/usePostRequest/usePostRequest"
import { useMemo } from "react"

export function ForgotPassword({ setResetPassword = null, showPopup = false, setShowPopup = null, setForgotPassword = null }) {
    const { handlePostRequest, error, loading, success } = usePostRequest()
    const { data, handleInputChange } = useForm({
        userInformation: "",
    })

    const message = useMemo(() => {
        if (success) {
            return "Email sent succesfully"
        }
    }, [success])

    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>
                <h1>Reset your password</h1>
                <div onClick={() => setShowPopup && setShowPopup()} className={classes.closeIco}>
                    <CloseIcon />
                </div>
            </header>

            <form
                className={classes.formWrapper}
                onSubmit={(e) => {
                    e.preventDefault()
                    handlePostRequest({
                        url: "http://localhost:3000/api/users/create-secure-link",
                        payload: { userInformation: data.userInformation },
                    })
                }}
            >
                <div className={classes.inputsWrapper}>
                    <Input
                        isPopUp={showPopup}
                        name="userInformation"
                        value={data.userInformation}
                        placeholder={"Email or Username"}
                        handleInputChange={(e) => handleInputChange(e)}
                        required={true}
                    />

                    {(error || loading) && <InlineMessage error={error} loading={loading} />}
                    {message && <InlineMessage message={message} />}
                </div>

                <div className={classes.bottomItems}>
                    <Button
                        type="submit"
                        style="primary"
                        label={"Reset Password"}
                        width="fill"
                        iconLeft={<ForwardToInboxOutlinedIcon fontSize="small" />}
                        active={data.userInformation}
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
