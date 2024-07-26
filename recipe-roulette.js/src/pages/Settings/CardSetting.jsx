import { Button } from "../../components/Buttons/Button/Button"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Input } from "../../components/Input/Input.jsx"

import DoneAllIcon from "@mui/icons-material/DoneAll"
import EditNoteIcon from "@mui/icons-material/EditNote"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import UploadIcon from "@mui/icons-material/Upload"

import classes from "./Settings.module.scss"

export function CardSetting({
    editing,
    avatar,
    userData,
    handleAvatarChange,
    handleSignupInput,
    handleSaveClick,
    handleDiscardClick,
    handleEditClick,
    passError,
}) {
    const { isAuthenticated } = useAuth()

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
            {editing ? (
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
                                handleInputChange={handleSignupInput}
                                label="Edit username or email"
                                name="username"
                                placeholder="Username"
                                value={userData.username}
                            />
                            <Input name="email" placeholder="Email" value={userData.email} handleInputChange={handleSignupInput} />
                        </section>

                        <section className={classes.formSection}>
                            <Input
                                label="Change password"
                                name="password"
                                type="password"
                                placeholder="Set new password"
                                value={userData.password}
                                handleInputChange={handleSignupInput}
                            />
                            <Input
                                name="confirmPass"
                                type="password"
                                placeholder="Confirm new password"
                                value={userData.confirmPass}
                                handleInputChange={handleSignupInput}
                            />
                        </section>

                        <div className={classes.bottomItems}>
                            <Button
                                style="primary"
                                width="fill"
                                action={handleSaveClick}
                                label="Save Changes"
                                icon={<DoneAllIcon fontSize="small" />}
                            />
                            <Button
                                width="fill"
                                action={handleDiscardClick}
                                label="Discard Changes"
                                icon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={classes.profileSection}>
                    <img src={avatar} alt="Profile" className={classes.profilePicture} />
                    <h2 className={classes.profileName}>{userData.username}</h2>
                    <p className={classes.profileEmail}>{userData.email}</p>
                    <Button width="fill" action={handleEditClick} label="Edit Information" icon={<EditNoteIcon fontSize="small" />} />
                </div>
            )}
        </>
    )
}
