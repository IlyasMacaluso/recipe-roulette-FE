import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useProfile } from "../../hooks/Form/useProfile"
import { CardSetting } from "./CardSetting"
import { LinkBox } from "./Linkbox"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./Settings.module.scss"

export function Settings() {

    const {
        data,
        handleInputChange,

        isEditing,
        setIsEditing,

        showText,
        handleShowText,

        handleSaveChanges,
        handleAvatarChange,
        handleDiscardChanges,

    } = useProfile()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${classes.settingsPage} ${animate && classes.animateSettings}`}>
            <CardSetting
                isEditing={isEditing}
                data={data}
                handleAvatarChange={handleAvatarChange}
                handleInputChange={handleInputChange}
                handleSaveChanges={handleSaveChanges}
                setIsEditing={setIsEditing}
                handleDiscardChanges={handleDiscardChanges}
                showText={showText}
                handleShowText={handleShowText}
            />
            {!isEditing && <LinkBox />}
        </div>
    )
}
