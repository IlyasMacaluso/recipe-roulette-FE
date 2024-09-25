import { Button } from "../../Buttons/Button/Button"
import { useForm } from "../../../hooks/useForm/useForm"
import { useEffect, useMemo } from "react"
import { Input } from "../../Input/Input"
import { InlineMessage } from "../../InlineMessage/InlineMessage"

import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"

import classes from "./Login.module.scss"
import { usePostRequest } from "../../../hooks/usePostRequest/usePostRequest"
import { useNavigate, useSearch } from "@tanstack/react-router"

export function ResetPassword({ showPopup = null, setShowPopup = null }) {
    const { data, showText, handleInputChange, handleShowText } = useForm({
        password: "",
        confirmPass: "",
    })

    const { handlePostRequest, error, loading, success } = usePostRequest()
    const navigate = useNavigate()
    const search = useSearch({})
    const token = search?.token

    const message = useMemo(() => {
        const { password, confirmPass } = data
        console.log(success)

        if (success) {
            return "Password updated successfully"
        }

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
    }, [data, success])

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

    useEffect(() => {
        if (!token) {
            navigate({ to: "/roulette" })
        }
    }, [])

    if (!token) {
        return
    }

    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>
                <h1>Set new password</h1>
                <div onClick={() => setShowPopup && setShowPopup()} className={classes.closeIco}>
                    <CloseIcon />
                </div>
            </header>

            <form
                className={classes.formWrapper}
                onSubmit={(e) => {
                    e.preventDefault()
                    handlePostRequest({
                        url: "http://localhost:3000/api/users/reset-password",
                        payload: { password: data.password },
                        token: token,
                    })
                }}
            >
                <div className={classes.inputsWrapper}>
                    <Input
                        isPopUp={showPopup}
                        name="password"
                        type={showText ? "text" : "password"}
                        placeholder={"New password"}
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
                        placeholder={"Confrim new password"}
                        handleInputChange={handleInputChange}
                        hasIcons={true}
                        handleShowText={handleShowText}
                        error={data.password && data.confirmPass && data.password !== data.confirmPass}
                        value={data.confirmPass}
                    />

                    {(error || loading) && <InlineMessage error={error} loading={loading} />}
                    {message && <InlineMessage message={message} />}
                </div>

                <div className={classes.bottomItems}>
                    <Button
                        type={"submit"}
                        style="primary"
                        label={"Change Password"}
                        width="fill"
                        iconLeft={<CheckIcon fontSize="small" />}
                        active={buttonActive}
                    />

                    <div className={classes.textBlock}></div>
                </div>
            </form>
        </div>
    )
}
