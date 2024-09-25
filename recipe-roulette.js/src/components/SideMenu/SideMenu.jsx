// components
import { NavigationLink } from "./NavigationLink/NavigationLink"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { createPortal } from "react-dom"
import { Popup } from "../Pop-up/Popup"

import { ConfirmPopup } from "../ConfirmPopup/ConfirmPopup"
import { Button } from "../Buttons/Button/Button"

import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import LogoutIcon from "@mui/icons-material/Logout"
import CloseIcon from "@mui/icons-material/Close"
import HistoryIcon from "@mui/icons-material/History"
import CheckIcon from "@mui/icons-material/Check"

// hooks
import { useEffect, useMemo, useState } from "react"
import { useLogout } from "../../hooks/Form/useLogout"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { useAuth } from "../../hooks/Auth/useAuth"

// CSS
import classes from "./SideMenu.module.scss"
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider"
import { useProfile } from "../../hooks/Form/useProfile"
import { AuthenticationPopup } from "../authentication/login/AuthenticationPopup"

export function SideMenu() {
    const [showPopup, setShowPopup] = useState()
    const navigate = useNavigate()

    const { isAuthenticated } = useAuth()
    const { loading, error, handleLogout } = useLogout(setShowPopup)
    const { pathname } = useLocation()
    const { setNavSidebar, navSidebar } = useSidebar()
    const { profileData, loading: profileDataLoading } = useProfile()

    const {
        username = null,
        email = null,
        avatar = null,
    } = useMemo(() => {
        return profileData
    }, [profileData])

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
                    {isAuthenticated && (
                        <div className={classes.profileCard}>
                            <div
                                className={classes.informationWrapper}
                                onClick={() => {
                                    navigate({ to: "/settings" })
                                    setNavSidebar(false)
                                }}
                            >
                                <img className={classes.picture} src={`data:${avatar.type};base64,${avatar}`} alt="Profile" />
                                <div className={classes.information}>
                                    <p className={`${classes.text} ${classes.username}`}>{username}</p>
                                    <p className={classes.text}>{email}</p>
                                </div>
                            </div>
                        </div>
                    )}
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
                                    <Button
                                        iconLeft={<CloseIcon fontSize="small" />}
                                        key={"button2"}
                                        label="Cancel"
                                        action={() => setShowPopup(false)}
                                    />,
                                    <Button
                                        key={"button1"}
                                        style={"primary"}
                                        label="Logout"
                                        iconLeft={<CheckIcon fontSize="small" />}
                                        action={() => {
                                            handleLogout()
                                        }}
                                    />,
                                ]}
                            />
                        ) : (
                            <AuthenticationPopup showPopup={showPopup} setShowPopup={setShowPopup} />
                        )}
                    </Popup>,
                    document.getElementById("root")
                )}
        </>
    )
}
