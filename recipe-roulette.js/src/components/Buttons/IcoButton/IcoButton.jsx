import { useNavigate } from "@tanstack/react-router"
import classes from "./IcoButton.module.scss"

export function IcoButton({ style = "default", link = null, icon = null, action = null, active = true }) {
    const navigate = useNavigate()
    return (
        <button
            type="button"
            onClick={() => {
                action && action()
                setTimeout(() => {
                    link && navigate({ to: link })
                }, 0)
            }}
            className={`
                ${classes.button}
                ${style === "transparent" && classes.noBorder} 
                ${!active && classes.disabled}
            `}
        >
            {icon}
        </button>
    )
}
