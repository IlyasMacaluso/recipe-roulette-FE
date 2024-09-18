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
import { InlineMessage } from "../../components/InlineMessage/InlineMessage"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import LoginIcon from "@mui/icons-material/Login"
import FilterListIcon from "@mui/icons-material/FilterList"

import loginImage from "../../assets/images/Mobile login-bro.svg"
import addNoteImage from "../../assets/images/Add notes-bro.svg"
import shrugImage from "../../assets/images/Shrug-bro.svg"

import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"
import searchWrapper from "../../assets/scss/searchWrapper.module.scss"

import { Header } from "../../components/Header/Header"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"
import { BaseSearch } from "../../components/Search/BaseSearch/BaseSearch"
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider"

export function Favorited() {
    const [showPopup, setShowPopup] = useState()
    const {
        recipes,
        inputValue,
        deselectFilters,
        setInputValue,
        favoritedLoading,
        historyLoading,
        foodPrefLoading,
        favoritedError,
        recipeFilters,
        setRecipeFilters,
    } = useRecipesContext()
    const { isAuthenticated } = useAuth()
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    const { setFilterSidebar } = useSidebar()

    const searchFavorites = useMemo(() => {
        return recipes.filteredFavorites.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filteredFavorites, recipes.favorited, recipeFilters])

    if (favoritedError) {
        return (
            <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart}`}>
                <Header pageTitle="Favorited" />
                <InlineMessage error={favoritedError} />
                <Placeholder topImage={shrugImage} text="Oops >.< something went wrong!" />
            </div>
        )
    } else {
        return (
            <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart}`}>
                     <div style={{ paddingLeft: "8px", paddingRight: "8px" }}>
                    <Header pageTitle="Favorited" />

                    {isAuthenticated && recipes?.favorited && recipes?.favorited.length > 0 && (

                        <section className={searchWrapper.globalActions}>
                            <BaseSearch data={searchFavorites} inputValue={inputValue} setInputValue={setInputValue} />
                            <IcoButton
                                action={() => setFilterSidebar((b) => !b)}
                                label="Filters"
                                icon={<FilterListIcon fontSize="small" />}
                            />
                        </section>
                    )}
                </div>

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
                                bottomImage={shrugImage}
                                text="Your search has  "
                                hightlitedText="no matching results"
                                bottomPadding={true}
                                buttons={[
                                    <Button
                                        iconLeft={<RotateLeftOutlinedIcon fontSize="small" />}
                                        cta={true}
                                        label="Reset Filters"
                                        key={"Reset Filters"}
                                        action={() => {
                                            setInputValue("")
                                            deselectFilters({ filters: "recipeFilters", setFilters: setRecipeFilters })
                                        }}
                                    />,
                                ]}
                            />
                        )}
                    </>
                ) : isAuthenticated ? (
                    <Placeholder
                        topImage={addNoteImage}
                        text="Your Favorited list is empty!  "
                        hightlitedText="Favorite your first recipe!"
                        bottomPadding={true}
                        buttons={[
                            <Button
                                iconLeft={<LoopOutlinedIcon fontSize="small" />}
                                cta={true}
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
                            topImage={loginImage}
                            bottomPadding={true}
                            text="You need to login,  "
                            hightlitedText="to add or see favorites!"
                            buttons={[
                                <Button
                                    key={"Login or Signup"}
                                    iconLeft={<LoginIcon fontSize="small" />}
                                    style="primary"
                                    cta={true}
                                    label="Login"
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
