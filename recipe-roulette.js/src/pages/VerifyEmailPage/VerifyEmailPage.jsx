import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Button } from "../../components/Buttons/Button/Button"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined"

import landingImage from "../../assets/images/eating a variety of foods-bro.svg"

import layout from "../../assets/scss/pageLayout/pageFH.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"

import { Header } from "../../components/Header/Header"
import { createPortal } from "react-dom"
import { useEffect, useMemo, useState } from "react"
import { Popup } from "../../components/Pop-up/Popup"
import { ConfirmPopup } from "../../components/ConfirmPopup/ConfirmPopup"
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest"
import { useNavigate, useSearch } from "@tanstack/react-router"

export function VerifyEmailPage() {
    const [showPopup, setShowPopup] = useState(true)
    const { handlePostRequest, success, error, loading } = usePostRequest()
    const navigate = useNavigate()
    const search = useSearch({})
    const token = search?.token

    useEffect(() => {
        if (!token) {
            navigate({ to: "/roulette" })
        } else {
            console.log(token)

            handlePostRequest({
                url: "http://localhost:3000/api/users/verify-email",
                token: token,
            })
        }
    }, [token])

    const message = useMemo(() => {
        if (!success) return null        
        return "Email verified successfully"
    }, [success])

    console.log(message);
    

    if (!token) {
        return
    }

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
                        <ConfirmPopup
                            title={"Verifying your email"}
                            error={error}
                            loading={loading}
                            inlineMessage={message}

                            buttons={[
                                <Button
                                    label="Retry"
                                    active={error}
                                    action={() =>
                                        handlePostRequest({
                                            url: "http://localhost:3000/api/users/verify-email",
                                            token: token,
                                        })
                                    }
                                />,
                                <Button width="fill" label="Continue" active={success} action={() => setShowPopup(false)} />,
                            ]}
                        />
                    </Popup>,
                    document.getElementById("root")
                )}
        </div>
    )
}
