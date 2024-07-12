import classes from "./Popup.module.scss"

export function Popup({ children }) {
    
    return (
        <div className={classes.overlay}>
            <div className={classes.popup}>
                {children}
            </div>
        </div>
    )
}
