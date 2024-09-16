import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Button } from "../../components/Buttons/Button/Button"

import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"

import notFountImage from "../../assets/images/404 Error with a cute animal-bro.svg"

import transitions from "../../assets/scss/pageLayout/pageTransition.module.scss"
import layouts from "../../assets/scss/pageLayout/pageFH.module.scss"

export function NotFound404() {
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${layouts.pageFH} ${animate ? transitions.animationEnd : transitions.animationStart}`}>
            <Placeholder
                topImage={notFountImage}
                buttons={[<Button key={"Return to home"} label="Return to home" iconLeft={<HomeOutlinedIcon />} link={"/"} height={"large"} />]}
            />
        </div>
    )
}
