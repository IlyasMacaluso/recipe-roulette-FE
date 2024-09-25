import { useSnackbar } from "./useSnackbar"
import { useState } from "react"
import { createPortal } from "react-dom"
import { Popup } from "../Pop-up/Popup"
import { Button } from "../Buttons/Button/Button"

import CloseIcon from "@mui/icons-material/Close"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import classes from "./Snackbar.module.scss"
import { AuthenticationPopup } from "../authentication/login/AuthenticationPopup"

export function Snackbar() {
    const { isActive, message, handleCloseSnackbar, showBtn } = useSnackbar()
    const [showPopup, setShowPopup] = useState()

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
