import { Button } from "../../components/Buttons/Button/Button"

import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined"

import classes from "./Settings.module.scss"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { createPortal } from "react-dom"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Popup } from "../../components/Pop-up/Popup"
import { Login } from "../../components/authentication/login/Login"
import { ValidationBox } from "../../components/Validation Box/ValidationBox"
import { useLogout } from "../../hooks/Form/useLogout"
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"
import { Signup } from "../../components/authentication/signup/Signup"

export function LinkBox() {
    const [showPopup, setShowPopup] = useState()
    const { handleLogout, loading, error } = useLogout(setShowPopup)
    const { isAuthenticated } = useAuth()
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()

    return (
        <>
            <div className={classes.menuSection}>
                <Link to="/history" className={classes.menuItem}>
                    Recipes History
                    <NavigateNextOutlinedIcon fontSize="medium" />
                </Link>
                
                <Link to="/food-preferences" className={classes.menuItem}>
                    Food Preferences
                    <NavigateNextOutlinedIcon fontSize="medium" />
                </Link>

                <Link to="/feedback-&-support" className={classes.menuItem}>
                    Feedback & Support
                    <NavigateNextOutlinedIcon fontSize="medium" />
                </Link>
            </div>
            <div className={classes.logoutButtonWrapper}>
                {isAuthenticated ? (
                    <Button
                        label="Logout"
                        width="fill"
                        action={() => setShowPopup && setShowPopup(true)}
                        icon={<LogoutIcon fontSize="small" />}
                    />
                ) : (
                    <Button
                        type="submit"
                        style="primary"
                        label="Login"
                        width="fill"
                        icon={<LoginIcon fontSize="small" />}
                        action={() => setShowPopup && setShowPopup(true)}
                    />
                )}
            </div>
            {showPopup &&
                createPortal(
                    <Popup>
                        {isAuthenticated ? (
                            <ValidationBox
                                loading={loading}
                                error={error}
                                message="Confirm logout?"
                                setShowPopup={setShowPopup}
                                handleValidation={handleLogout}
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
