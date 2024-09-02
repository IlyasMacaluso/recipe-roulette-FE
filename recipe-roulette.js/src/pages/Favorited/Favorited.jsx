import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useMemo, useState } from "react"
import { useAuth } from "../../hooks/Auth/useAuth"
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"

import { RecipeCard } from "../../components/RecipeCard/RecipeCard"
import { Popup } from "../../components/Pop-up/Popup"
import { createPortal } from "react-dom"
import { Login } from "../../components/authentication/login/Login"
import { useLocationHook } from "../../hooks/useLocationHook"
import { Button } from "../../components/Buttons/Button/Button"
import { Skeleton } from "@mui/material"
import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Signup } from "../../components/authentication/signup/Signup"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import LoginIcon from "@mui/icons-material/Login"

import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"
import { InlineMessage } from "../../components/InlineMessage/InlineMessage"

export function Favorited() {
    const [showPopup, setShowPopup] = useState()

    const {
        recipes,
        inputValue,
        handleDeselectRecipeFilters,
        setInputValue,
        favoritedLoading,
        historyLoading,
        foodPrefLoading,
        favoritedError,
        recipeFilter,
    } = useRecipesContext()
    const { isAuthenticated } = useAuth()
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    const searchFavorites = useMemo(() => {
        return recipes.filteredFavorites.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filteredFavorites, recipes.favorited, recipeFilter])

    if (favoritedError) {
        return (
            <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart}`}>
                <InlineMessage error={favoritedError} />
                <Placeholder topImage={"Shrug-bro.svg"} text="Oops >.< something went wrong!" />
            </div>
        )
    } else {
        return (
            <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart}`}>
                {favoritedLoading || foodPrefLoading || historyLoading ? (
                    [...Array(3)].map(() => (
                        <Skeleton key={Math.random()} sx={{ bgcolor: "#c5e4c9" }} variant="rounded" width={"100%"} height={"280px"} />
                    ))
                ) : isAuthenticated && recipes?.favorited.length > 0 ? (
                    <>
                        {searchFavorites && searchFavorites.length > 0 ? (
                            <section className={layout.recipesWrapper}>
                                {searchFavorites.map((recipe, index) => (
                                    <RecipeCard recipe={recipe} key={`${recipe.id}_${recipe.title}`} />
                                ))}
                            </section>
                        ) : (
                            <Placeholder
                                bottomImage="Personal files-bro.svg"
                                text="Your search has  "
                                hightlitedText="no matching results"
                                bottomPadding={true}
                                buttons={[
                                    <Button
                                        icon={<RotateLeftOutlinedIcon fontSize="small" />}
                                        height={"large"}
                                        label="Reset Filters"
                                        key={"Reset Filters"}
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
                        topImage="Add notes-bro.svg"
                        text="Your Favorited list is empty!  "
                        hightlitedText="Favorite your first recipe!"
                        bottomPadding={true}
                        buttons={[
                            <Button
                                icon={<LoopOutlinedIcon fontSize="small" />}
                                height="large"
                                style="primary"
                                key={"Start Ingredients Shuffle"}
                                label="Start Ingredients Shuffle"
                                link={"/roulette"}
                            />,
                        ]}
                    />
                ) : (
                    <>
                        <Placeholder
                            topImage="Mobile login-bro.svg"
                            bottomPadding={true}
                            text="You need to login,  "
                            hightlitedText="to see add or see favorites!"
                            buttons={[
                                <Button
                                    key={"Login or Signup"}
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
                                    {!changeToSignup ? (
                                        <Login setChangeToSignup={setChangeToSignup} setShowPopup={setShowPopup} />
                                    ) : (
                                        <Signup setChangeToSignup={setChangeToSignup} setShowPopup={setShowPopup} />
                                    )}
                                </Popup>,
                                document.getElementById("popup-root")
                            )}
                    </>
                )}
            </div>
        )
    }
}
