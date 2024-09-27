import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Button } from "../../components/Buttons/Button/Button"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined"

import landingImage from "../../assets/images/eating a variety of foods-bro.svg"

import layout from "../../assets/scss/pageLayout/pageFH.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"

import { Header } from "../../components/Header/Header"
import { createPortal } from "react-dom"
import { ResetPassword } from "../../components/authentication/login/ResetPassword"
import { useState } from "react"
import { Popup } from "../../components/Pop-up/Popup"

export function ResetPasswordPage() {
    const [showPopup, setShowPopup] = useState(true)

    return (
        <div className={`${layout.pageFH} ${layout.noVerticalPadding}`}>
            <Header pageTitle="Welcome!" />

            <Placeholder
                bottomPadding={true}
                text="Reduce food wastes and get inspired by "
                hightlitedText="Recipe Roulette"
                topImage={landingImage}
                buttons={[
                    <Button
                        key={"Start Ingredients Shuffle"}
                        style="primary"
                        label="Start Ingredients Shuffle"
                        cta={true}
                        iconLeft={<LoopOutlinedIcon fontSize="small" />}
                        link="/roulette"
                    />,
                    <Button
                        key={"Support the Developers"}
                        label="Support the Developers"
                        iconLeft={<VolunteerActivismOutlinedIcon fontSize="small" />}
                    />,
                ]}
            />

            {showPopup &&
                createPortal(
                    <Popup>
                        <ResetPassword showPopup={showPopup} setShowPopup={setShowPopup} />
                    </Popup>,
                    document.getElementById("root")
                )}
        </div>
    )
}
