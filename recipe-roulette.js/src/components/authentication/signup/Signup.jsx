import { useSignup } from "../../../hooks/Form/useSignup"
import { Button } from "../../Buttons/Button/Button"
import { useLocation } from "@tanstack/react-router"
import { useLogin } from "../../../hooks/Form/useLogin"
import { useMemo } from "react"

import EditNoteIcon from "@mui/icons-material/EditNote"
import StartIcon from "@mui/icons-material/Start"
import CloseIcon from "@mui/icons-material/Close"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CachedIcon from '@mui/icons-material/Cached';

import classes from "./Signup.module.scss"

export function Signup({ setShowPopup = null, setChangeToSignup = null }) {
    const { data, handleInput, handleSubmit, error, loading } = useSignup(setShowPopup)
    const { showPassword, handleShowPassword } = useLogin()
    const location = useLocation()

    const { password, confirmPass, username, email } = useMemo(() => {
        return data
    }, [data])

    return (
        <div className={`${classes.container}`}>
            <header className={classes.title}>
                <h1>Signup</h1>
                <div onClick={() => setShowPopup && setShowPopup()} className={classes.closeIco}>
                    <CloseIcon />
                </div>
            </header>

            <form onSubmit={(e) => handleSubmit(e)} className={classes.formWrapper}>
                <div className={classes.inputsWrapper}>
                    <div className={classes.inputWrapper}>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={handleInput}
                            placeholder="Insert your username"
                            required
                        />
                    </div>

                    <div className={classes.inputWrapper}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleInput}
                            placeholder="Insert your email"
                            required
                        />
                    </div>

                    <div className={classes.inputWrapper}>
                        <label>Password</label>
                        <div className={classes.passInput}>
                            <input
                                className={`${password !== confirmPass && classes.error}`}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={password}
                                placeholder="Insert password here"
                                onChange={handleInput}
                                required
                            />

                            <div className={classes.icoWrapper}>
                                {password !== confirmPass && (
                                    <ErrorOutlineIcon className={`${classes.ico} ${classes.errIco}`} fontSize="small" />
                                )}
                                {showPassword ? (
                                    <VisibilityOffIcon onClick={handleShowPassword} className={classes.ico} fontSize="small" />
                                ) : (
                                    <VisibilityIcon onClick={handleShowPassword} className={classes.ico} fontSize="small" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={classes.inputWrapper}>
                        <label>Confirm password</label>
                        <div className={classes.passInput}>
                            <input
                                className={`${password !== confirmPass && classes.error}`}
                                type={showPassword ? "text" : "password"}
                                name="confirmPass"
                                id="password"
                                value={data.confirmPass}
                                placeholder="Confirm password"
                                onChange={handleInput}
                                required
                            />
                        </div>
                    </div>

                    <label htmlFor="check" className={classes.checkLabel}>
                        <div>
                            I agree with <span>Terms & Conditions</span>
                        </div>
                        <input type="checkbox" name="check" id="check" checked={data.check} onChange={handleInput} required />
                    </label>
                </div>

                {error && (
                    <div className={`${classes.inlineMsg} ${classes.red}`}>
                        <ErrorOutlineIcon fontSize="small" />
                        {error.message}
                    </div>
                )}
                {loading && (
                    <div className={classes.inlineMsg}>
                        {<CachedIcon fontSize="small" />}
                        Loading...
                    </div>
                )}

                <div className={classes.buttonsWrapper}>
                    <Button
                        style="primary"
                        width="fill"
                        type="submit"
                        label="Sign up"
                        icon={<EditNoteIcon fontSize="small" />}
                        active={
                            data.username &&
                            data.password &&
                            data.confirmPass &&
                            data.confirmPass === data.password &&
                            data.email &&
                            data.check
                        }
                        prevPath={location.pathname}
                    />

                    <Button
                        action={() => setShowPopup && setShowPopup(false)}
                        prevPath={location.pathname}
                        label="Skip"
                        icon={<StartIcon fontSize="small" />}
                    />
                </div>
                <div className={classes.message}>
                    <p>Already have an account?</p>
                    <span className={classes.login}>
                        <Button action={() => setChangeToSignup(false)} label="Login" />
                    </span>
                </div>
            </form>
        </div>
    )
}
