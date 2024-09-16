import { RecipeCard } from "../../components/RecipeCard/RecipeCard"
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
import { InlineMessage } from "../../components/InlineMessage/InlineMessage"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import LoginIcon from "@mui/icons-material/Login"

import loginImage from "../../assets/images/Mobile login-bro.svg"
import addNoteImage from "../../assets/images/Add notes-bro.svg"
import shrugImage from "../../assets/images/Shrug-bro.svg"

import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"

export function History() {
    const [showPopup, setShowPopup] = useState()

    const {
        deselectFilters,
        recipes,
        setInputValue,
        historyLoading,
        favoritedLoading,
        foodPrefLoading,
        historyError,
        recipeFilters,
        inputValue,
        setRecipeFilters,
    } = useRecipesContext()
    const { isAuthenticated } = useAuth()
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    const searchHistory = useMemo(() => {
        return recipes.filteredHistory.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filteredHistory, recipes.history, recipeFilters])

    if (historyError) {
        return (
            <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart}`}>
                <InlineMessage error={historyError} />
                <Placeholder topImage={shrugImage} text="Oops >.< something went wrong!" />
            </div>
        )
    } else {
        return (
            <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart}`}>
                {favoritedLoading || foodPrefLoading || historyLoading ? (
                    [...Array(3)].map(() => (
                        <Skeleton key={Math.random()} sx={{ bgcolor: "#c5e4c9" }} variant="rounded" width={"100%"} height={"280px"} />
                    ))
                ) : isAuthenticated && recipes?.history.length > 0 ? (
                    <>
                        {searchHistory && searchHistory.length > 0 ? (
                            <section className={layout.recipesWrapper}>
                                {searchHistory.map((recipe) => (
                                    <RecipeCard recipe={recipe} key={`${recipe.id}_${recipe.title}`} />
                                ))}
                            </section>
                        ) : (
                            <Placeholder
                                text="Your search has  "
                                hightlitedText="no matching results"
                                bottomImage={shrugImage}
                                bottomPadding={true}
                                buttons={[
                                    <Button
                                        iconLeft={<RotateLeftOutlinedIcon fontSize="small" />}
                                        height="large"
                                        label="Reset Search"
                                        key="Reset Search"
                                        action={() => {
                                            deselectFilters({ filters: "recipeFilters", setFilters: setRecipeFilters })
                                            setInputValue("")
                                        }}
                                    />,
                                ]}
                            />
                        )}
                    </>
                ) : isAuthenticated ? (
                    <Placeholder
                        text="Your History is empty! "
                        hightlitedText=" Recipes will be stored here!"
                        topImage={addNoteImage}
                        bottomPadding={true}
                        buttons={[
                            <Button
                                key="Start Ingredients Shuffle"
                                link="roulette"
                                label="Start Ingredients Shuffle"
                                iconLeft={<LoopOutlinedIcon />}
                                height="large"
                            />,
                        ]}
                    />
                ) : (
                    <>
                        <Placeholder
                            text="You need to login "
                            hightlitedText="To see your History!"
                            topImage={loginImage}
                            bottomPadding={true}
                            buttons={[
                                <Button
                                    key={"Login or Signup"}
                                    action={() => setShowPopup(true)}
                                    style="primary"
                                    label="Login or Signup"
                                    iconLeft={<LoginIcon />}
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
}
