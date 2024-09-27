import { useProfile } from "../../hooks/Form/useProfile"
import { SettingsCard } from "../../components/SettingsCard/SettingsCard"

import { createPortal } from "react-dom"
import { Popup } from "../../components/Pop-up/Popup"
import { ConfirmPopup } from "../../components/ConfirmPopup/ConfirmPopup"
import { useLogout } from "../../hooks/Form/useLogout"
import { useState } from "react"

import { useAuth } from "../../hooks/Auth/useAuth"
import { Button } from "../../components/Buttons/Button/Button"

import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import BugReportIcon from "@mui/icons-material/BugReport"
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"
import FactCheckIcon from "@mui/icons-material/FactCheck"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

import classes from "./Settings.module.scss"

import { Link } from "@tanstack/react-router"
import { useTutorial } from "../../hooks/useTutorial/useTutorial"
import { Tutorial } from "../../components/tutorial/Tutorial"
import { Header } from "../../components/Header/Header"
import { AuthenticationPopup } from "../../components/authentication/login/AuthenticationPopup"

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
    const { showTutorial, setShowTutorial } = useTutorial(false)

    return (
        <div className={classes.settingsPage}>
            <Header pageTitle={"Settings"} />
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

                {showTutorial && createPortal(<Tutorial setShowTutorial={setShowTutorial} />, document.querySelector(".appContainer > .centerContent"))}

                {!isEditing && (
                    <>
                        <div className={classes.linksWrapper}>
                            <Link to="/settings/food-preferences" className={classes.linkItem}>
                                <div className={classes.itemsLeft}>
                                    <RestaurantMenuIcon fontSize="small" />
                                    <p className={classes.label}>Food Preferences</p>
                                </div>
                                <NavigateNextIcon fontSize="medium" />
                            </Link>

                            <Link className={classes.linkItem} onClick={() => setShowTutorial(true)}>
                                <div className={classes.itemsLeft}>
                                    <FactCheckIcon fontSize="small" />
                                    <p className={classes.label}> Show Tutorial</p>
                                </div>
                                <NavigateNextIcon fontSize="medium" />
                            </Link>
                            <Link to="/settings/feedback-&-support" className={classes.linkItem}>
                                <div className={classes.itemsLeft}>
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
                                    cta={true}
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
                                                <Button
                                                    iconLeft={<CloseIcon fontSize="small" />}
                                                    key="button2"
                                                    label="Cancel"
                                                    action={() => setShowPopup(false)}
                                                />,
                                                <Button
                                                    iconLeft={<CheckIcon fontSize="small" />}
                                                    key="button1"
                                                    style="primary"
                                                    label="Logout"
                                                    action={() => handleLogout()}
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
                )}
            </div>
        </div>
    )
}
