import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Button } from "../../components/Buttons/Button/Button"

import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"

import transitions from "../../assets/scss/pageLayout/pageTransition.module.scss"
import layouts from "../../assets/scss/pageLayout/pageFH.module.scss"

export function NotFound404() {
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${layouts.pageFH} ${animate ? transitions.animationEnd : transitions.animationStart}`}>
            <Placeholder
                topImage={"notfound.svg"}
                text="The page you're looking for "
                hightlitedText="does not exist!"
                buttons={[<Button key={"Return to home"} label="Return to home" icon={<HomeOutlinedIcon />} link={"/"} height={"large"} />]}
            />
        </div>
    )
}
