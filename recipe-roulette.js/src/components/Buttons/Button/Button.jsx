import { useNavigate } from "@tanstack/react-router"
import classes from "./Button.module.scss"

export function Button({
    type = "button",
    width = "fitContent",
    height = null,
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
        if (action) {
            setTimeout(() => {
                link && navigate({ to: `/${link}` })
                if (prevPath) {
                    prevPath === "/recipes-results" && navigate({ to: "/recipes-results" })
                }
            }, 0)
        } else {
            link && navigate({ to: `/${link}` })
            if (prevPath) {
                prevPath === "/recipes-results" && navigate({ to: "/recipes-results" })
            }
        }
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
                ${height === "large" && classes.cta}
                ${style === "transparent" && classes.transparent}`}
        >
            {icon}
            {label}
        </button>
    )
}
