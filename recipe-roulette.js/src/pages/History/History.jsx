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

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import LoginIcon from "@mui/icons-material/Login"

import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"
import { InlineMessage } from "../../components/InlineMessage/InlineMessage"

export function History() {
    const [showPopup, setShowPopup] = useState()

    const { recipes, setInputValue, historyLoading, favoritedLoading, foodPrefLoading, historyError, recipeFilter, inputValue } =
        useRecipesContext()
    const { isAuthenticated } = useAuth()
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    const searchHistory = useMemo(() => {
        return recipes.filteredHistory.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filteredHistory, recipes.history, recipeFilter])

    if (historyError) {
        return (
            <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart}`}>
                <InlineMessage error={historyError} />
                <Placeholder topImage="Shrug-bro.svg" text="Oops >.< something went wrong!" />
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
                                highlightColor="#dd3e46"
                                bottomImage="Personal files-bro.svg"
                                bottomPadding={true}
                                buttons={[
                                    <Button
                                        icon={<RotateLeftOutlinedIcon fontSize="small" />}
                                        height="large"
                                        label="Reset Search"
                                        key="Reset Search"
                                        action={() => {
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
                        topImage="Add notes-bro.svg"
                        bottomPadding={true}
                        buttons={[
                            <Button
                                key="Start Ingredients Shuffle"
                                link="roulette"
                                label="Start Ingredients Shuffle"
                                icon={<LoopOutlinedIcon />}
                                height="large"
                            />,
                        ]}
                    />
                ) : (
                    <>
                        <Placeholder
                            text="You need to login "
                            hightlitedText="To see your History!"
                            topImage="Mobile login-bro.svg"
                            bottomPadding={true}
                            buttons={[
                                <Button
                                    key={"Login or Signup"}
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
}
