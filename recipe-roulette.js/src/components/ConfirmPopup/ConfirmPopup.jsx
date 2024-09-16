import { InlineMessage } from "../InlineMessage/InlineMessage"
import classes from "./ConfirmPopup.module.scss"

export function ConfirmPopup({ error, loading, title, message, buttons = null }) {
    
    return (
        <div className={`${classes.confirmPopup}`}>
            <section className={classes.topItems}>
                <header className={classes.header}>{title}</header>
                {message && <p className={classes.message}>{message}</p>}
            </section>

            <InlineMessage error={error} loading={loading} />

            <div className={classes.buttonsWrapper}>{buttons && buttons.map((button) => button)}</div>
        </div>
    )
}
