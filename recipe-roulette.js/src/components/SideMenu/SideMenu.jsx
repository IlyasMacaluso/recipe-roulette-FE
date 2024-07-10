import { useAuth } from "../../hooks/Auth/useAuth"
import { NavigationLink } from "./NavigationLink/NavigationLink"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"

import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import LogoutIcon from "@mui/icons-material/Logout"
import CloseIcon from "@mui/icons-material/Close"
import classes from "./SideMenu.module.scss"
import { createPortal } from "react-dom"
import { Popup } from "../Pop-up/Popup"
import { useState } from "react"
import { ValidationBox } from "../Validation Box/ValidationBox"
import { useSnackbar } from "../Snackbar/useSnackbar"
import { Login } from "../authentication/login/Login"
import { useLocation } from "@tanstack/react-router"
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"
import { Signup } from "../authentication/signup/Signup"

export function SideMenu({ handleMenuToggle, menuState = false }) {
    const { logout, isAuthenticated } = useAuth()
    const [showPopup, setShowPopup] = useState()
    const { handleOpenSnackbar } = useSnackbar()
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()

    const { pathname } = useLocation()

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
                    <NavigationLink
                        path={pathname}
                        handleMenuToggle={handleMenuToggle}
                        label="Roulette"
                        destination="/roulette"
                        icon={<AutorenewIcon fontSize="small" />}
                    />
                    <NavigationLink
                        path={pathname}
                        handleMenuToggle={handleMenuToggle}
                        label="Favorited"
                        destination="/favorited"
                        icon={<BookmarksOutlinedIcon fontSize="small" />}
                    />
                    <NavigationLink
                        path={pathname}
                        handleMenuToggle={handleMenuToggle}
                        label="Settings"
                        destination="/settings"
                        icon={<SettingsOutlinedIcon fontSize="small" />}
                    />
                    <div className={classes.separator} />
                    {isAuthenticated ? (
                        <NavigationLink
                            handleMenuToggle={handleMenuToggle}
                            label={"Logout"}
                            icon={<LogoutIcon fontSize="small" />}
                            action={() => setShowPopup(true)}
                        />
                    ) : (
                        <NavigationLink
                            handleMenuToggle={handleMenuToggle}
                            label="Login"
                            icon={<LoginOutlinedIcon fontSize="small" />}
                            action={() => setShowPopup(true)}
                        />
                    )}
                </section>
            </div>
            {showPopup &&
                createPortal(
                    <Popup handleClosePopup={() => setShowPopup(false)}>
                        {isAuthenticated ? (
                            <ValidationBox
                                message="Confirm logout?"
                                setShowPopup={setShowPopup}
                                handleValidationAction={() => {
                                    logout(), handleOpenSnackbar("You have successfully logged out.")
                                }}
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
