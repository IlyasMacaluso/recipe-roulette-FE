import { Button } from "../Buttons/Button/Button.jsx"
import { useAuth } from "../../hooks/Auth/useAuth.jsx"
import { Input } from "../Input/Input.jsx"

import { InlineMessage } from "../InlineMessage/InlineMessage.jsx"
import { useMemo } from "react"
import { createPortal } from "react-dom"
import { Popup } from "../Pop-up/Popup.jsx"
import { ConfirmPopup } from "../ConfirmPopup/ConfirmPopup.jsx"
import { useHandleConfirmationPopup } from "../../hooks/useHandleBackBtn/useHandleConfirmationPopup.jsx"

import DoneAllIcon from "@mui/icons-material/DoneAll"
import EditNoteIcon from "@mui/icons-material/EditNote"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import EditIcon from "@mui/icons-material/Edit"

import classes from "./SettingsCard.module.scss"

export function SettingsCard({
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
}) {
    const { isAuthenticated } = useAuth()
    const { firstTime } = useHandleConfirmationPopup(isEditing, status)

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
        return
    }

    return (
        <>
            {isEditing ? (
                <div className={`${classes.profileSection} ${classes.editProfileSection}`}>
                    <section className={classes.profileImageSection}>
                        <img className={classes.profilePicture} src={`data:${avatar.type};base64,${avatar}`} alt="Profile" />
                        <div className={classes.editButtonWrapper}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className={classes.defaultEditBtn}
                                id="profileImageInput"
                            />

                            {/*edit image button */}
                            <label htmlFor="profileImageInput" className={classes.customEditBtn}>
                                <EditIcon sx={{ fontSize: 18 }} />
                            </label>
                        </div>
                    </section>

                    <div className={classes.formWrapper}>
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
                                placeholder={"Old password"}
                                handleInputChange={handleInputChange}
                                hasIcons={true}
                                handleShowText={handleShowText}
                                value={oldPassword}
                            />

                            <Input
                                name="newPassword"
                                type={showText ? "text" : "password"}
                                placeholder={"New password"}
                                handleInputChange={handleInputChange}
                                hasIcons={true}
                                handleShowText={handleShowText}
                                error={newPassword && confirmNewPass && newPassword !== confirmNewPass}
                                value={newPassword}
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
                            />
                        </section>

                        <div className={classes.bottomItems}>
                            {(error || message || loading) && (
                                <InlineMessage
                                    message={message && message}
                                    error={error}
                                    loading={loading}
                                    loadingMessage="Updating your informations"
                                />
                            )}

                            <Button
                                active={(!newPassword && !confirmNewPass) || (newPassword.length >= 8 && newPassword === confirmNewPass)}
                                style="primary"
                                width="fill"
                                action={handleSaveChanges}
                                label="Save Changes"
                                iconLeft={<DoneAllIcon fontSize="small" />}
                                loading={loading}
                            />

                            <Button
                                width="fill"
                                action={handleDiscardChanges}
                                label="Discard Changes"
                                iconLeft={<DeleteOutlineOutlinedIcon fontSize="small" />}
                            />
                        </div>
                    </div>
                    {status === "blocked" &&
                        createPortal(
                            <Popup>
                                <ConfirmPopup
                                    title={"Are you sure you want to leave?"}
                                    message={"Changes that you made may not be saved"}
                                    buttons={[
                                        <Button key={"button2"} label="Cancel" action={reset} />,
                                        <Button
                                            key={"button1"}
                                            style={"primary"}
                                            label="Continue"
                                            action={() => {
                                                if (firstTime) {
                                                    reset()
                                                } else {
                                                    proceed()
                                                }
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
                    <h2 className={classes.title}>{username}</h2>
                    <p className={classes.profileEmail}>{email}</p>

                    <Button
                        width="fill"
                        action={() => setIsEditing(true)}
                        label="Edit Information"
                        iconLeft={<EditNoteIcon fontSize="small" />}
                    />
                </div>
            )}
        </>
    )
}
