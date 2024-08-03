import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useProfile } from "../../hooks/Form/useProfile"
import { CardSetting } from "./CardSetting"
import { LinkBox } from "./Linkbox"
import { useLocationHook } from "../../hooks/useLocationHook"

import transitions from "../../assets/scss/pageLayout/pageTransition.module.scss"
import classes from "./Settings.module.scss"

export function Settings() {
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
        proceed,
        reset,
        setBlockCondition,

        handleSaveChanges,
        handleAvatarChange,
        handleDiscardChanges,
    } = useProfile()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${classes.settingsPage} ${animate ? transitions.animationEnd : transitions.animationStart}`}>
            <CardSetting
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
                proceed={proceed}
                reset={reset}
                setBlockCondition={setBlockCondition}
            />
            {!isEditing && <LinkBox />}
        </div>
    )
}
