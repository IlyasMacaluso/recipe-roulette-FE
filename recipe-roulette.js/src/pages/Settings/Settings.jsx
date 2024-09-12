import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useProfile } from "../../hooks/Form/useProfile"
import { SettingsCard } from "../../components/SettingsCard/SettingsCard"
import { useLocationHook } from "../../hooks/useLocationHook"

import { createPortal } from "react-dom"
import { Popup } from "../../components/Pop-up/Popup"
import { ConfirmPopup } from "../../components/ConfirmPopup/ConfirmPopup"
import { useLogout } from "../../hooks/Form/useLogout"
import { Login } from "../../components/authentication/login/Login"
import { Signup } from "../../components/authentication/signup/Signup"
import { useState } from "react"

import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Button } from "../../components/Buttons/Button/Button"

import transitions from "../../assets/scss/pageLayout/pageTransition.module.scss"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import BugReportIcon from "@mui/icons-material/BugReport"
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"
import FactCheckIcon from "@mui/icons-material/FactCheck"

import classes from "./Settings.module.scss"
import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss"

import { Link } from "@tanstack/react-router"
import { useTutorial } from "../../hooks/useTutorial/useTutorial"
import { Tutorial } from "../../components/tutorial/Tutorial"

export function Settings() {
    const [showPopup, setShowPopup] = useState(false)

    const {
        profileData,
        handleInputChange,

        isEditing,
        setIsEditing,

        showText,
        handleShowText,

        loading,
        error,

        status,
        reset,
        proceed,
        setBlockCondition,

        handleSaveChanges,
        handleAvatarChange,
        handleDiscardChanges,
    } = useProfile()

    const { handleLogout, loading: popupLoading, error: popupError } = useLogout(setShowPopup)
    const { isAuthenticated } = useAuth()
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    const { showTutorial, setShowTutorial } = useTutorial(false)

    if (showTutorial) {
        return <>{createPortal(<Tutorial setShowTutorial={setShowTutorial} />, document.getElementById("popup-root"))}</>
    } else {
        return (
            <div className={`${layout.scrollPage}  ${layout.padding24} ${animate ? transitions.animationEnd : transitions.animationStart}`}>
                <div className={classes.pageContent}>
                    <SettingsCard
                        isEditing={isEditing}
                        profileData={profileData}
                        handleAvatarChange={handleAvatarChange}
                        handleInputChange={handleInputChange}
                        handleSaveChanges={handleSaveChanges}
                        setIsEditing={setIsEditing}
                        handleDiscardChanges={handleDiscardChanges}
                        showText={showText}
                        handleShowText={handleShowText}
                        loading={loading}
                        error={error}
                        status={status}
                        reset={reset}
                        proceed={proceed}
                        setBlockCondition={setBlockCondition}
                    />

                    {!isEditing && (
                        <>
                            <div className={classes.linksWrapper}>
                                <Link to="/settings/food-preferences" className={classes.linkItem}>
                                    <div className={classes.leftItems}>
                                        <RestaurantMenuIcon fontSize="small" />
                                        <p className={classes.label}>Food Preferences</p>
                                    </div>
                                    <NavigateNextIcon fontSize="medium" />
                                </Link>

                                <Link className={classes.linkItem} onClick={() => setShowTutorial(true)}>
                                    <div className={classes.leftItems}>
                                        <FactCheckIcon fontSize="small" />
                                        <p className={classes.label}> Show Tutorial</p>
                                    </div>
                                    <NavigateNextIcon fontSize="medium" />
                                </Link>
                                <Link to="/settings/feedback-&-support" className={classes.linkItem}>
                                    <div className={classes.leftItems}>
                                        <BugReportIcon fontSize="small" />
                                        <p className={classes.label}>Report a Bug</p>
                                    </div>
                                    <NavigateNextIcon fontSize="medium" />
                                </Link>
                            </div>

                            <div className={classes.bottomItems}>
                                {isAuthenticated ? (
                                    <Button
                                        label="Logout"
                                        width="fill"
                                        action={() => setShowPopup(true)}
                                        iconLeft={<LogoutIcon fontSize="small" />}
                                    />
                                ) : (
                                    <Button
                                        type="submit"
                                        style="primary"
                                        label="Login"
                                        width="fill"
                                        iconLeft={<LoginIcon fontSize="small" />}
                                        action={() => setShowPopup(true)}
                                    />
                                )}
                            </div>

                            {/* popup a comparsa */}
                            {showPopup &&
                                createPortal(
                                    <Popup>
                                        {isAuthenticated ? (
                                            <ConfirmPopup
                                                title={"Are you sure you want to logout?"}
                                                loading={popupLoading}
                                                error={popupError}
                                                buttons={[
                                                    <Button key="button2" label="Cancel" action={() => setShowPopup(false)} />,
                                                    <Button key="button1" style="primary" label="Logout" action={() => handleLogout()} />,
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
                    )}
                </div>
            </div>
        )
    }
}
