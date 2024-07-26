import { Link } from "@tanstack/react-router"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined"
import classes from "./Landing.module.scss"
import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Button } from "../../components/Buttons/Button/Button"

export function Landing() {
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${classes.discoveryPreview} ${animate && classes.discoveryPreviewAnimate}`}>
            <Placeholder
                text="Reduce food wastes and get inspired by "
                hightlitedText="Recipe Roulette"
                topImage={"undraw_ideas_flow_re_bmea.svg"}
                buttons={[
                    <Button style="primary" label="Start Ingredients Shuffle" height={"large"} icon={<LoopOutlinedIcon />} link="/roulette" />,
                    <Button label="Support the Developers" icon={<VolunteerActivismOutlinedIcon fontSize="small" />} />,
                ]}
            />
        </div>
    )
}
