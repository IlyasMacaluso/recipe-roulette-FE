// components
import { NavigationLink } from "./NavigationLink/NavigationLink"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { createPortal } from "react-dom"
import { Popup } from "../Pop-up/Popup"
import { Login } from "../authentication/login/Login"
import { Signup } from "../authentication/signup/Signup"
import { ConfirmPopup } from "../ConfirmPopup/ConfirmPopup"
import { Button } from "../Buttons/Button/Button"

import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import LogoutIcon from "@mui/icons-material/Logout"
import CloseIcon from "@mui/icons-material/Close"
import HistoryIcon from "@mui/icons-material/History"

// hooks
import { useState } from "react"
import { useLogout } from "../../hooks/Form/useLogout"
import { useLocation } from "@tanstack/react-router"
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"
import { useAuth } from "../../hooks/Auth/useAuth"

// CSS
import classes from "./SideMenu.module.scss"
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider"

export function SideMenu() {
    const [showPopup, setShowPopup] = useState()
    const { isAuthenticated } = useAuth()
    const { loading, error, handleLogout } = useLogout(setShowPopup)
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()
    const { pathname } = useLocation()
    const { setNavSidebar, navSidebar } = useSidebar()
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
        <>
            <div
                onClick={() => setNavSidebar(false)}
                className={`${classes.backgroundOverlay} ${navSidebar && classes.backgroundOverlayToggled}`}
            ></div>

            <div className={`${classes.sidebar} ${navSidebar && classes.sidebarToggled}`}>
                <header>
                    <h4>Browse</h4>
                    <IcoButton action={() => setNavSidebar(false)} icon={<CloseIcon />} style="transparent" />
                </header>

                <section className={classes.links}>
                    {navigationLinks.map((item) => {
                        return (
                            <NavigationLink
                                key={item.id}
                                path={pathname}
                                setNavSidebar={() => setNavSidebar(false)}
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
        </>
    )
}
