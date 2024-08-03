import classes from "../Validation Box/ValidationBox.module.scss"

export function ConfirmationPopup({ title, message, buttons = null }) {
    return (
        <div className={`${classes.container}`}>

            <section className={classes.topItems}>
                <header className={classes.header}>{title}</header>
                <p className={classes.message}>{message}</p>
            </section>
            
            <div className={classes.buttonsWrapper}>{buttons && buttons.map((button) => button)}</div>
        </div>
    )
}
