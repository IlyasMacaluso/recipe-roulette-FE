import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useProfile } from "../../hooks/Form/useProfile"
import { CardSetting } from "./CardSetting"
import { LinkBox } from "./Linkbox"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./Settings.module.scss"
import { useLogout } from "../../hooks/Form/useLogout"

export function Settings() {
    const {
        editing,
        avatar,
        userData,
        handleEditClick,
        handleSaveClick,
        handleAvatarChange,
        handleSignupInput,
        handleDiscardClick,
    } = useProfile()

    const { handleLogout } = useLogout()
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    const passError = userData.password !== userData.confirmPass ? "Passwords do not match" : ""

    return (
        <div className={`${classes.settingsPage} ${animate && classes.animateSettings}`}>
            <CardSetting
                editing={editing}
                avatar={avatar}
                userData={userData}
                handleAvatarChange={handleAvatarChange}
                handleSignupInput={handleSignupInput}
                handleSaveClick={handleSaveClick}
                handleEditClick={handleEditClick}
                handleDiscardClick={handleDiscardClick}
                passError={passError}
            />
            {!editing && <LinkBox handleLogoutClick={handleLogout} />}
        </div>
    )
}
