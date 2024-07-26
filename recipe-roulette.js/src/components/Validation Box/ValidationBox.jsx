import { Button } from "../Buttons/Button/Button"

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import CachedIcon from '@mui/icons-material/Cached';

import classes from "./ValidationBox.module.scss"

export function ValidationBox({ message, setShowPopup = null, handleValidation, loading, error }) {
    return (
        <div className={`${classes.container}`}>
            <header>{message}</header>
            {error && (
                <div className={`${classes.inlineMsg} ${classes.red}`}>
                    <ErrorOutlineIcon fontSize="small" />
                    {error.message}
                </div>
            )}
            {loading && (
                <div className={classes.inlineMsg}>
                    {<CachedIcon fontSize="small" />}
                    Loading...
                </div>
            )}
            <div className={classes.buttonsWrapper}>
                <Button label="Cancel" action={() => setShowPopup(false)} style="transparent" />
                <Button label="Log out" action={() => handleValidation()} style="primary" />
            </div>
        </div>
    )
}
