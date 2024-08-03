import { Button } from "../Buttons/Button/Button"
import { InlineMessage } from "../InlineMessage/InlineMessage"

import classes from "./ValidationBox.module.scss"

export function ValidationBox({ message, setShowPopup = null, handleValidation, loading, error }) {
    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>{message}</header>

            <InlineMessage loading={loading} error={error} />

            <div className={classes.buttonsWrapper}>
                <Button label="Cancel" action={() => setShowPopup(false)} style="transparent" />
                <Button label="Log out" action={() => handleValidation()} style="primary" />
            </div>
        </div>
    )
}
