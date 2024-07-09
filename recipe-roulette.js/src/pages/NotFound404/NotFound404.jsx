import { Link } from "@tanstack/react-router"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import classes from "./NotFound404.module.scss"

export function NotFound404() {
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    return (
        <div className={`${classes.discoveryPreview} ${animate && classes.discoveryPreviewAnimate}`}>
            <div className={classes.mainContent}>
                <img src="../" />
                <img src="../src/assets/images/notfound.svg" alt="" />

                <h2>
                    The page you're looking for <br /> <span>does not exist!</span>
                </h2>
                <Link className={classes.cta} to={-1}>
                    <ArrowBackOutlinedIcon />
                    <p>Go back</p>
                </Link>
            </div>
        </div>
    )
}
