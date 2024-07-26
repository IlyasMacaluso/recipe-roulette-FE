import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useMemo, useState } from "react"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Popup } from "../../components/Pop-up/Popup"
import { createPortal } from "react-dom"
import { Login } from "../../components/authentication/login/Login"
import { useLocationHook } from "../../hooks/useLocationHook"
import { Skeleton } from "@mui/material"
import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Button } from "../../components/Buttons/Button/Button"

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
                        <Placeholder
                            text="Your search has  "
                            hightlitedText="no matching results"
                            highlightColor="#dd3e46"
                            spacious={true}
                            bottomImage={"searching.svg"}
                        />
                    )}
                </>
            ) : isAuthenticated ? (
                <Placeholder
                    text="Your History is empty! "
                    hightlitedText=" Recipes will be stored here!"
                    topImage={"searching.svg"}
                    buttons={[
                        <Button
                            link={"roulette"}
                            style="primary"
                            label="Start Ingredients Shuffle"
                            icon={<LoopOutlinedIcon />}
                            height={"large"}
                        />,
                    ]}
                />
            ) : (
                <>
                    <Placeholder
                        text="You need to login "
                        hightlitedText="To see your History!"
                        topImage={"undraw_access_account_re_8spm.svg"}
                        buttons={[
                            <Button
                                action={() => setShowPopup(true)}
                                style="primary"
                                label="Login or Signup"
                                icon={<LoginIcon />}
                                height={"large"}
                            />,
                        ]}
                    />
                    {showPopup &&
                        createPortal(
                            <Popup>
                                <Login setShowPopup={setShowPopup} />
                            </Popup>,
                            document.getElementById("popup-root")
                        )}
                </>
            )}
        </div>
    )
}
