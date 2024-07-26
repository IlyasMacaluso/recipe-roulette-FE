import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useMemo, useState } from "react"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Popup } from "../../components/Pop-up/Popup"
import { createPortal } from "react-dom"
import { Login } from "../../components/authentication/login/Login"
import { useLocationHook } from "../../hooks/useLocationHook"
import { Button } from "../../components/Buttons/Button/Button"
import { Skeleton } from "@mui/material"
import { Placeholder } from "../../components/Placeholder/Placeholder"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import LoginIcon from "@mui/icons-material/Login"
import classes from "./Favorite.module.scss"

export function Favorited() {
    const { recipes, inputValue, handleDeselectRecipeFilters, setInputValue, favoritedLoading, historyLoading, foodPrefLoading } =
        useRecipesContext()
    const { isAuthenticated } = useAuth()
    const [showPopup, setShowPopup] = useState()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    const searchFavorites = useMemo(() => {
        return recipes.filtered.filter((recipe) => recipe.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filtered, recipes.favorited])

    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            {favoritedLoading || foodPrefLoading || historyLoading ? (
                [...Array(3)].map(() => (
                    <Skeleton key={Math.random()} sx={{ bgcolor: "#c5e4c9" }} variant="rounded" width={"100%"} height={"280px"} />
                ))
            ) : isAuthenticated && recipes?.favorited.length > 0 ? (
                <>
                    {searchFavorites && searchFavorites.length > 0 ? (
                        <section className={classes.recipesWrapper}>
                            {searchFavorites.map((recipe) => (
                                <RecipeCard recipe={recipe} key={recipe.id + recipe.title} />
                            ))}
                        </section>
                    ) : (
                        <Placeholder
                            bottomImage={"searching.svg"}
                            text="Your search has  "
                            hightlitedText="no matching results"
                            highlightColor="#dd3e46"
                            spacious={true}
                            buttons={[
                                <Button
                                    icon={<RotateLeftOutlinedIcon fontSize="small"/>}
                                    height={"large"}
                                    label="Reset Filters"
                                    action={() => {
                                        setInputValue("")
                                        handleDeselectRecipeFilters()
                                    }}
                                />,
                            ]}
                        />
                    )}
                </>
            ) : isAuthenticated ? (
                <Placeholder
                    topImage={"undraw_add_files_re_v09.svg"}
                    text="Your Favorited list is empty!  "
                    hightlitedText="Favorite your first recipe!"
                    buttons={[
                        <Button
                            icon={<LoopOutlinedIcon fontSize="small" />}
                            height="large"
                            style="primary"
                            label="Start Ingredients Shuffle"
                            link={"/roulette"}
                        />,
                    ]}
                />
            ) : (
                <>
                    <Placeholder
                        topImage={"undraw_access_account_re_8spm.svg"}
                        text="Your Favorited list is empty,  "
                        hightlitedText="Favorite your first recipe!"
                        spacious={true}
                        buttons={[
                            <Button
                                icon={<LoginIcon fontSize="small" />}
                                style="primary"
                                height="large"
                                label="Login or Signup"
                                action={() => setShowPopup(true)}
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
