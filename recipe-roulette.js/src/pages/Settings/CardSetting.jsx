import { Button } from "../../components/Buttons/Button/Button"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Input } from "../../components/Input/Input.jsx"

import DoneAllIcon from "@mui/icons-material/DoneAll"
import EditNoteIcon from "@mui/icons-material/EditNote"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import UploadIcon from "@mui/icons-material/Upload"

import classes from "./Settings.module.scss"
import { InlineMessage } from "../../components/InlineMessage/InlineMessage.jsx"
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest.jsx"
import { useMemo } from "react"

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
}) {
    const { isAuthenticated } = useAuth()
    const { handlePostRequest, error, loading } = usePostRequest()

    const {
        password = null,
        confirmPass = null,
        username = null,
        email = null,
        avatar = null,
    } = useMemo(() => {
        return profileData
    }, [profileData])

    const message = useMemo(() => {
        if (password && confirmPass) {
            if (password.length >= 8 || confirmPass.length >= 8) {
                if (password !== confirmPass) {
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
                        <img src={avatar} alt="Profile" className={classes.profilePicture} />
                        <div className={classes.editProfileImageButtonWrapper}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className={classes.editProfileImageButton}
                                id="profileImageInput"
                            />
                            <label htmlFor="profileImageInput" className={classes.editProfileImageButtonLabel}>
                                <UploadIcon fontSize="small" />
                                Upload new image
                            </label>
                        </div>
                    </section>

                    <div className={classes.editForm}>
                        <section className={classes.formSection}>
                            <Input
                                handleInputChange={handleInputChange}
                                label="Edit username or email"
                                name="username"
                                placeholder="Username"
                                value={username}
                            />

                            <Input name="email" placeholder="Email" value={email} handleInputChange={handleInputChange} />
                        </section>

                        <section className={classes.formSection}>
                            <Input
                                name="password"
                                type={showText ? "text" : "password"}
                                placeholder={"Insert your password"}
                                handleInputChange={handleInputChange}
                                hasIcons={true}
                                handleShowText={handleShowText}
                                error={password && confirmPass && password !== confirmPass}
                                value={password}
                                label="Change password"
                            />

                            <Input
                                label="Password"
                                name="confirmPass"
                                type={showText ? "text" : "password"}
                                placeholder={"Confirm new password"}
                                handleInputChange={handleInputChange}
                                hasIcons={true}
                                handleShowText={handleShowText}
                                error={password && confirmPass && password !== confirmPass}
                                value={confirmPass}
                            />

                            <InlineMessage message={message && message} error={error} loading={loading} />
                        </section>

                        <div className={classes.bottomItems}>
                            <Button
                                active={(!password && !confirmPass) || (password.length >= 8 && password === confirmPass)}
                                style="primary"
                                width="fill"
                                action={handleSaveChanges}
                                label="Save Changes"
                                icon={<DoneAllIcon fontSize="small" />}
                            />

                            <Button
                                width="fill"
                                action={handleDiscardChanges}
                                label="Discard Changes"
                                icon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                            />
                        </div>
                    </div>
                </div>
                
            ) : (

                <div className={classes.profileSection}>
                    <img src={avatar} alt="Profile" className={classes.profilePicture} />
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
