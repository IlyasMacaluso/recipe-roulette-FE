import { useCenterItem } from "../../../hooks/useCenterItem/useCenterItem"
import { useLocation } from "@tanstack/react-router"
import { useLogin } from "../../../hooks/Form/useLogin"
import { GoogleLoginBtn } from "../../SocialLoginButtons/GoogleLoginBtn"
import { FacebookSocialBtn } from "../../SocialLoginButtons/FacebookLoginBtn"
import { Button } from "../../Buttons/Button/Button"
import { useRef } from "react"

import CloseIcon from "@mui/icons-material/Close"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import LoginIcon from "@mui/icons-material/Login"
import StartIcon from "@mui/icons-material/Start"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import CachedIcon from "@mui/icons-material/Cached"

import classes from "./Login.module.scss"

export function Login({ setShowPopup = null, setChangeToSignup = null }) {
    const inputRef = useRef(null)
    const location = useLocation()

    const { data, showPassword, handleInput, handleSubmit, handleShowPassword, error, loading } = useLogin(setShowPopup)
    const { scrollToCenter, refs } = useCenterItem(2)

    return (
        <div className={`${classes.container}`}>
            <header className={classes.header}>
                <h1>Login</h1>
                {setShowPopup && ( //mostra la X solo quando il componente viene utilizzato come popup
                    <div onClick={() => setShowPopup && setShowPopup()} className={classes.closeIco}>
                        <CloseIcon />
                    </div>
                )}
            </header>

            <form
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
                className={classes.formWrapper}
            >
                <div className={classes.inputsWrapper}>
                    <div className={classes.inputWrapper}>
                        <label>Username</label>
                        <input
                            ref={refs[0]}
                            type="text"
                            name="username"
                            id="username"
                            value={data.username}
                            placeholder="Insert username here"
                            onFocus={() => scrollToCenter(refs[0])}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className={classes.inputWrapper}>
                        <label>Password</label>
                        <div className={classes.passInput}>
                            <input
                                ref={refs[1]}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={data.password}
                                placeholder="Insert password here"
                                onChange={handleInput}
                                onFocus={() => scrollToCenter(refs[1])}
                                required
                            />
                            {showPassword ? (
                                <div onClick={handleShowPassword} className={classes.passwordIcon}>
                                    {" "}
                                    <VisibilityOffIcon fontSize="small" />
                                </div>
                            ) : (
                                <div onClick={handleShowPassword} className={classes.passwordIcon}>
                                    {" "}
                                    <VisibilityIcon fontSize="small" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={classes.rememberMe}>
                        <label htmlFor="check">Remember me</label>
                        <input id="check" name="check" onChange={handleInput} type="checkbox" checked={data.check} />
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
                </div>

                <div className={classes.buttonsWrapper}>
                    <Button
                        style="primary"
                        type="submit"
                        label="Login"
                        icon={<LoginIcon fontSize="small" />}
                        active={data.username && data.password}
                    />
                    <Button
                        action={() => setShowPopup && setShowPopup(false)}
                        prevPath={location.pathname}
                        label="Skip"
                        icon={<StartIcon fontSize="small" />}
                    />
                </div>

                <div className={classes.loginBtnBox}>
                    <GoogleLoginBtn />
                    <FacebookSocialBtn />
                </div>

                <div className={classes.message}>
                    <p>Don't have an account yet?</p>
                    <span className={classes.signup}>
                        <Button action={() => setChangeToSignup && setChangeToSignup(true)} label="Sign Up" />
                    </span>
                </div>
            </form>
        </div>
    )
}
