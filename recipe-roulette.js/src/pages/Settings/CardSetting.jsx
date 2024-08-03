import { Button } from "../../components/Buttons/Button/Button"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Input } from "../../components/Input/Input.jsx"

import DoneAllIcon from "@mui/icons-material/DoneAll"
import EditNoteIcon from "@mui/icons-material/EditNote"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import EditIcon from "@mui/icons-material/Edit"

import { InlineMessage } from "../../components/InlineMessage/InlineMessage.jsx"
import { useMemo } from "react"
import { createPortal } from "react-dom"
import { Popup } from "../../components/Pop-up/Popup.jsx"
import { ConfirmationPopup } from "../../components/ConfirmationPopup/ConfirmationPopup.jsx"
import { useHandleConfirmationPopup } from "../../hooks/useHandleBackBtn/useHandleConfirmationPopup.jsx"

import classes from "./Settings.module.scss"

export function CardSetting({
    isEditing,
    profileData,
    setIsEditing,
    handleAvatarChange,
    handleInputChange,
    handleSaveChanges,
    handleDiscardChanges,
    showText,
    handleShowText,
    loading,
    error,
    status,
    reset,
    proceed,
    setBlockCondition,
}) {
    const { isAuthenticated } = useAuth()
    useHandleConfirmationPopup(isEditing, status)
    const {
        newPassword = null,
        confirmNewPass = null,
        oldPassword = null,
        username = null,
        email = null,
        avatar = null,
    } = useMemo(() => {
        return profileData
    }, [profileData])

    const message = useMemo(() => {
        if (newPassword && confirmNewPass) {
            if (newPassword.length >= 8 || confirmNewPass.length >= 8) {
                if (newPassword !== confirmNewPass) {
                    return "Passwords do not match"
                } else {
                    return null
                }
            } else {
                return "Password must be at least 8 characters long"
            }
        }
    })

    if (!isAuthenticated) {
        return (
            <div className={classes.profileSection}>
                <h2 className={classes.profileName}>Not Logged In</h2>
                <p className={classes.profileEmail}>Please log in to edit your profile</p>
            </div>
        )
    }

    return (
        <>
            {isEditing ? (
                <div className={classes.editProfileSection}>
                    <section className={classes.profileImageSection}>
                        <img className={classes.profilePicture} src={`data:${avatar.type};base64,${avatar}`} alt="Profile" />
                        <div className={classes.editProfileImageButtonWrapper}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className={classes.editProfileImageButton}
                                id="profileImageInput"
                            />

                            {/*edit image button */}
                            <label htmlFor="profileImageInput" className={classes.editProfileImageButtonLabel}>
                                <EditIcon sx={{ fontSize: 18 }} />
                            </label>
                        </div>
                    </section>

                    <div className={classes.editForm}>
                        <section className={classes.formSection}>
                            <Input
                                handleInputChange={handleInputChange}
                                label="Change username"
                                name="username"
                                placeholder="Username"
                                value={username}
                            />

                            <Input
                                label="Change email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                handleInputChange={handleInputChange}
                            />
                        </section>

                        <section className={classes.formSection}>
                            <h2 className={classes.title}>Change password</h2>
                            <Input
                                name="oldPassword"
                                type={showText ? "text" : "password"}
                                placeholder={"Insert old password"}
                                handleInputChange={handleInputChange}
                                hasIcons={true}
                                handleShowText={handleShowText}
                                value={oldPassword}
                                label="Old password"
                            />

                            <Input
                                name="newPassword"
                                type={showText ? "text" : "password"}
                                placeholder={"Insert new password"}
                                handleInputChange={handleInputChange}
                                hasIcons={true}
                                handleShowText={handleShowText}
                                error={newPassword && confirmNewPass && newPassword !== confirmNewPass}
                                value={newPassword}
                                label="New password"
                            />

                            <Input
                                name="confirmNewPass"
                                type={showText ? "text" : "password"}
                                placeholder={"Confirm new password"}
                                handleInputChange={handleInputChange}
                                hasIcons={true}
                                handleShowText={handleShowText}
                                error={newPassword && confirmNewPass && newPassword !== confirmNewPass}
                                value={confirmNewPass}
                                label="Confirm new password"
                            />
                        </section>

                        <InlineMessage
                            message={message && message}
                            error={error}
                            loading={loading}
                            loadingMessage="Updating your informations"
                        />

                        <div className={classes.bottomItems}>
                            <Button
                                active={(!newPassword && !confirmNewPass) || (newPassword.length >= 8 && newPassword === confirmNewPass)}
                                style="primary"
                                width="fill"
                                action={handleSaveChanges}
                                label="Save Changes"
                                icon={<DoneAllIcon fontSize="small" />}
                                loading={loading}
                            />

                            <Button
                                width="fill"
                                action={handleDiscardChanges}
                                label="Discard Changes"
                                icon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                            />
                        </div>
                    </div>
                    {status === "blocked" &&
                        createPortal(
                            <Popup>
                                <ConfirmationPopup
                                    title={"Are you sure you want to leave?"}
                                    message={"Changes that you made may not be saved"}
                                    buttons={[
                                        <Button key={"button2"} label="Cancel" action={reset} />,
                                        <Button
                                            key={"button1"}
                                            style={"primary"}
                                            label="Continue"
                                            action={() => {
                                                proceed()
                                                handleDiscardChanges()
                                            }}
                                        />,
                                    ]}
                                />
                            </Popup>,
                            document.getElementById("popup-root")
                        )}
                </div>
            ) : (
                <div className={classes.profileSection}>
                    <img src={`data:${avatar.type};base64,${avatar}`} alt="Profile" className={classes.profilePicture} />
                    <h2 className={classes.profileName}>{username}</h2>
                    <p className={classes.profileEmail}>{email}</p>

                    <Button
                        width="fill"
                        action={() => setIsEditing(true)}
                        label="Edit Information"
                        icon={<EditNoteIcon fontSize="small" />}
                    />
                </div>
            )}
        </>
    )
}
