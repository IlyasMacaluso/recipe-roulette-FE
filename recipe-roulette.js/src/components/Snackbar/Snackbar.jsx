import { MaterialSymbol } from "react-material-symbols"
import { useSnackbar } from "./useSnackbar"

import classes from "./Snackbar.module.scss"
import { useState } from "react"
import { createPortal } from "react-dom"
import { PopupLogin } from "../Pop-up/Popup"
import { Button } from "../Buttons/Button/Button"
import { Login } from "../authentication/login/Login"
import { useLocation } from "react-router-dom"

export function Snackbar() {
    const { isActive, message, handleCloseSnackbar, showBtn } = useSnackbar()
    const [showPopup, setShowPopup] = useState()
    const location = useLocation()

    return (
        <div className={`${classes.snackbar} ${isActive ? classes.snackbarActive : classes.snackbarInactive}`}>
            <div className={classes.leftItems}>
                <MaterialSymbol icon="error" weight={600} size={18} grade={18} />
                <p>{message}</p>
                {showBtn && <Button label="Log in" action={() => setShowPopup(true)} /> }
            </div>
            <div tabIndex={-1} onClick={handleCloseSnackbar} className={classes.rightItems}>
                <MaterialSymbol className={classes.ico} icon="close" size={24} grade={24} />
            </div>
            {showPopup && createPortal(
                <PopupLogin /* onClose={() => setShowPopup(false)} */ children={<Login prevLocation={location.pathname} setShowPopup={setShowPopup}/>} />,
                document.getElementById('popup-root')
            )}
        </div>
    )
}
