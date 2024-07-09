import { useNavigate } from "@tanstack/react-router"
import classes from "./Button.module.scss"

export function Button({
    type = "button",
    width = "fitContent",
    label = "label",
    icon = null,
    action,
    active = true,
    prevPath = null,
    link = null,
    style = "secondary",
}) {
    const navigate = useNavigate()

    function handleOnClick() {
        action && action()
        setTimeout(() => {
            link && navigate({ to: `/${link}` })
            prevPath && prevPath === "/recipes-results" && navigate({ to: "/recipes-results" })
            prevPath && prevPath === "/login" && navigate({ to: "/" })
            prevPath && prevPath === "/signup" && navigate({ to: "/" })
        }, 0)
    }

    return (
        <button
            type={type}
            onClick={() => {
                active && handleOnClick()
            }}
            className={`${classes.button} ${!active && classes.disabled} 
            ${width === "fill" && classes.wideButton}
            ${style === "primary" && classes.primaryColor}
            ${style === "transparent" && classes.transparent}`}
        >
            {icon}
            {label}
        </button>
    )
}
