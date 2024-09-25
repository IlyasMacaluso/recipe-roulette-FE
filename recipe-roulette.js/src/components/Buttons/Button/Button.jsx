import { useNavigate } from "@tanstack/react-router"
import classes from "./Button.module.scss"

export function Button({
    type = "button",
    width = "fitContent",
    cta = null,
    label = "label",
    iconLeft = null,
    iconRight = null,
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
                ${iconLeft && classes.iconLeft}
                ${iconRight && classes.iconRight}
                ${width === "fill" && classes.wideButton}
                ${style === "primary" && classes.primaryColor}
                ${style === "secondary" && classes.secondaryColor}
                ${cta && classes.cta}
                ${style === "transparent" && classes.transparent}`}
        >
            {iconLeft}
            <p className={classes.p}>{label}</p>
            {iconRight}
        </button>
    )
}
