import { useNavigate } from "react-router-dom"
import classes from "./Button.module.scss"

export function Button({
    type = "button",
    width = "fitContent",
    label = "label",
    icon = null,
    action,
    active = true,
    link = null,
    style = "secondary"
}) {
    const navigate = useNavigate()

    return (
        <button
            type={type}
            onClick={() => {
                action && action()
                link && navigate(`/${link}`)
            }}
            className={`${classes.button} ${!active && classes.disabled} 
            ${width === "fill" && classes.wideButton}
            ${style === "primary" && classes.primaryColor}`}
        >
            {icon}
            {label}
        </button>
    )
}
