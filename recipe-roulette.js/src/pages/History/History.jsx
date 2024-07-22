import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useMemo, useState } from "react"
import { Link } from "@tanstack/react-router"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Popup } from "../../components/Pop-up/Popup"
import { createPortal } from "react-dom"
import { Login } from "../../components/authentication/login/Login"
import { useLocationHook } from "../../hooks/useLocationHook"
import { Skeleton } from "@mui/material"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import LoginIcon from "@mui/icons-material/Login"
import classes from "../Favorited/Favorite.module.scss"

export function History() {
    const [showPopup, setShowPopup] = useState()

    const { recipes, inputValue, historyLoading, favoritedLoading, foodPrefLoading } = useRecipesContext()
    const { isAuthenticated } = useAuth()
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    const searchHistory = useMemo(() => {
        if (!historyLoading && !foodPrefLoading && !favoritedLoading) {
            return recipes?.history.filter((recipe) => recipe.title.toLowerCase().includes(inputValue.toLowerCase()))
        } else {
            return []
        }
    }, [inputValue, recipes.history])

    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            {favoritedLoading || foodPrefLoading || historyLoading ? (
                [...Array(3)].map(() => (
                    <Skeleton key={Math.random()} sx={{ bgcolor: "#c5e4c9" }} variant="rounded" width={"100%"} height={"280px"} />
                ))
            ) : isAuthenticated && recipes?.history.length > 0 ? (
                <>
                    {searchHistory && searchHistory.length > 0 ? (
                        <section className={classes.recipesWrapper}>
                            {searchHistory.map((recipe) => (
                                <RecipeCard recipe={recipe} key={recipe.id + recipe.title} />
                            ))}
                        </section>
                    ) : (
                        <div className={`${classes.placeholder} ${classes.placeholderSearch}`}>
                            <h2>
                                There is <span>no recipe</span> <br />
                                matching this search <br />
                            </h2>
                            <div className={classes.placeholderImage}>
                                <img src="../src/assets/images/undraw_cancel_re_pkdm 1.svg" alt="" />
                            </div>
                        </div>
                    )}
                </>
            ) : isAuthenticated ? (
                <div className={classes.placeholder}>
                    <div className={classes.placeholderImage}>
                        <img src="../src/assets/images/undraw_add_files_re_v09.svg" alt="" />
                    </div>
                    <h2>
                        <span>Your History is empty!</span> <br />
                        Recipes you open will be stored here!
                    </h2>

                    <Link className={classes.cta} to="/roulette">
                        <LoopOutlinedIcon />
                        <p>Start Ingredients Shuffle</p>
                    </Link>
                </div>
            ) : (
                <div className={classes.placeholder}>
                    <div className={classes.placeholderImage}>
                        <img src="../src/assets/images/undraw_access_account_re_8spm.svg" alt="" />
                    </div>
                    <h2>
                        <span>You need to login</span> <br />
                        To see your History!
                    </h2>
                    {showPopup &&
                        createPortal(
                            <Popup>
                                <Login setShowPopup={setShowPopup} />
                            </Popup>,
                            document.getElementById("popup-root")
                        )}
                    <Link className={classes.cta} onClick={() => setShowPopup(true)}>
                        <LoginIcon fontSize="small" />
                        <p>Signup or Login</p>
                    </Link>
                </div>
            )}
        </div>
    )
}
