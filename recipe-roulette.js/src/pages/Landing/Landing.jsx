import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Button } from "../../components/Buttons/Button/Button"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined"

import landingImage from "../../assets/images/eating a variety of foods-bro.svg"

import layout from "../../assets/scss/pageLayout/pageFH.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"
import { Header } from "../../components/Header/Header"

export function Landing() {
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${layout.pageFH} ${animate ? transition.animationEnd : transition.animationStart}`}>
            <Header pageTitle="Welcome!" />
            <Placeholder
                text="Reduce food wastes and get inspired by "
                hightlitedText="Recipe Roulette"
                topImage={landingImage}
                buttons={[
                    <Button
                        key={"Start Ingredients Shuffle"}
                        style="primary"
                        label="Start Ingredients Shuffle"
                        height={"large"}
                        iconLeft={<LoopOutlinedIcon />}
                        link="/roulette"
                    />,
                    <Button
                        key={"Support the Developers"}
                        label="Support the Developers"
                        iconLeft={<VolunteerActivismOutlinedIcon fontSize="small" />}
                    />,
                ]}
            />
        </div>
    )
}
