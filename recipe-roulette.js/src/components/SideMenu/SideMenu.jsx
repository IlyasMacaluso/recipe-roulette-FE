import { useAuth } from "../../hooks/Auth/useAuth"
import { NavigationLink } from "./NavigationLink/NavigationLink"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { createPortal } from "react-dom"
import { Popup } from "../Pop-up/Popup"
import { useState } from "react"
import { Login } from "../authentication/login/Login"
import { useLocation } from "@tanstack/react-router"
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"
import { Signup } from "../authentication/signup/Signup"
import { useLogout } from "../../hooks/Form/useLogout"

import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import LogoutIcon from "@mui/icons-material/Logout"
import CloseIcon from "@mui/icons-material/Close"
import HistoryIcon from "@mui/icons-material/History"

import classes from "./SideMenu.module.scss"
import { ConfirmPopup } from "../ConfirmPopup/ConfirmPopup"
import { Button } from "../Buttons/Button/Button"

export function SideMenu({ handleMenuToggle, menuState = false }) {
    const [showPopup, setShowPopup] = useState()
    const { isAuthenticated } = useAuth()
    const { loading, error, handleLogout } = useLogout(setShowPopup)
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()
    const { pathname } = useLocation()\

    const navigationLinks = [
        {
            id: "roulette",
            label: "Roulette",
            destination: "/roulette",
            icon: <AutorenewIcon fontSize="small" />,
        },
        {
            id: "favorited",
            label: "Favorited",
            destination: "/favorited",
            icon: <BookmarksOutlinedIcon fontSize="small" />,
        },
        {
            id: "history",
            label: "History",
            destination: "/history",
            icon: <HistoryIcon fontSize="small" />,
        },
        {
            id: "settings",
            label: "Settings",
            destination: "/settings",
            icon: <SettingsOutlinedIcon fontSize="small" />,
        },
        {
            id: isAuthenticated ? "logout" : "login",
            label: isAuthenticated ? "Logout" : "Login",
            icon: isAuthenticated ? <LogoutIcon fontSize="small" /> : <LoginOutlinedIcon fontSize="small" />,
            action: () => setShowPopup(true),
        },
    ]

    return (
        <div>
            <div
                onClick={handleMenuToggle}
                className={`${classes.backgroundOverlay} ${menuState && classes.backgroundOverlayToggled}`}
            ></div>
            <div className={`${classes.sidebar} ${menuState && classes.sidebarToggled}`}>
                <header>
                    <h4>Browse</h4>
                    <IcoButton action={handleMenuToggle} icon={<CloseIcon />} style="transparent" />
                </header>
                <section className={classes.links}>
                    {navigationLinks.map((item) => {
                        return (
                            <NavigationLink
                                key={item.id}
                                path={pathname}
                                handleMenuToggle={handleMenuToggle}
                                label={item.label}
                                destination={item.destination}
                                icon={item.icon}
                                action={item?.action || null}
                            />
                        )
                    })}
                </section>
            </div>
            {showPopup &&
                createPortal(
                    <Popup>
                        {isAuthenticated ? (
                            <ConfirmPopup
                                title={"Are you sure you want to logout?"}
                                loading={loading}
                                error={error}
                                buttons={[
                                    <Button key={"button2"} label="Cancel" action={() => setShowPopup(false)} />,
                                    <Button
                                        key={"button1"}
                                        style={"primary"}
                                        label="Logout"
                                        action={() => {
                                            handleLogout()
                                        }}
                                    />,
                                ]}
                            />
                        ) : !changeToSignup ? (
                            <Login setChangeToSignup={setChangeToSignup} setShowPopup={setShowPopup} />
                        ) : (
                            <Signup setChangeToSignup={setChangeToSignup} setShowPopup={setShowPopup} />
                        )}
                    </Popup>,
                    document.getElementById("popup-root")
                )}
        </div>
    )
}
