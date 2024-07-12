import classes from "./Popup.module.scss"

export function Popup({ handleClosePopup, children }) {
    function stopPropagation(e) {
        e.stopPropagation()
    }
    
    return (
        <div className={classes.overlay}>
            <div className={classes.popup}>
                {children}
            </div>
        </div>
    )
}
