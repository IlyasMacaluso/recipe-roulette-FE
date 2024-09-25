import { useSnackbar } from "./useSnackbar"
import { useState } from "react"
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"
import { createPortal } from "react-dom"
import { Popup } from "../Pop-up/Popup"
import { Button } from "../Buttons/Button/Button"
import { Login } from "../authentication/login/Login"
import { Signup } from "../authentication/login/Signup"

import CloseIcon from "@mui/icons-material/Close"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import classes from "./Snackbar.module.scss"
import { AuthenticationPopup } from "../authentication/login/AuthenticationPopup"

export function Snackbar() {
    const { isActive, message, handleCloseSnackbar, showBtn } = useSnackbar()
    const [showPopup, setShowPopup] = useState()
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()

    return (
        <div className={`${classes.snackbar} ${isActive ? classes.snackbarActive : classes.snackbarInactive}`}>
            <div className={classes.itemsLeft}>
                <ErrorOutlineIcon fontSize="small" />
                <p>{message}</p>
                {showBtn && <Button label="Log in" action={() => setShowPopup(true)} />}
            </div>
            <div tabIndex={-1} onClick={handleCloseSnackbar} className={classes.itemsRight}>
                <CloseIcon fontSize="small" />
            </div>
            {showPopup &&
                createPortal(
                    <Popup>
                        <AuthenticationPopup showPopup={showPopup} setShowPopup={setShowPopup} />
                    </Popup>,
                    document.getElementById("root")
                )}
        </div>
    )
}
