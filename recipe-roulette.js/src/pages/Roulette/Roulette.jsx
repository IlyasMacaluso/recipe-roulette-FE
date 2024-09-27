import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { Button } from "../../components/Buttons/Button/Button"
import { useButtonState } from "../../hooks/ButtonState/useButtonState"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocationHook } from "../../hooks/useLocationHook"
import { useRecipesFetch } from "../../hooks/useRecipesFetch/useRecipesFetch"
import { useShakeAnimation } from "../../hooks/useShakeAnimation/useShakeAnimation"
import { useManageIngredients } from "./IngredientsContext"
import { Skeleton } from "@mui/material"
import { InlineMessage } from "../../components/InlineMessage/InlineMessage"
import { Placeholder } from "../../components/Placeholder/Placeholder"
import { Tutorial } from "../../components/tutorial/Tutorial"
import { useTutorial } from "../../hooks/useTutorial/useTutorial"
import { createPortal } from "react-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { Header } from "../../components/Header/Header"
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider"

import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined"
import AddIcon from "@mui/icons-material/Add"
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import LockResetIcon from "@mui/icons-material/LockReset"
import FilterListIcon from "@mui/icons-material/FilterList"

import shrugImage from "../../assets/images/Shrug-bro.svg"

import classes from "./Roulette.module.scss"
import layout from "../../assets/scss/pageLayout/pageFH.module.scss"
import searchWrapper from "../../assets/scss/searchWrapper.module.scss"

import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"

export function Roulette() {
    const { ingredients, shuffleIng, handleIngIncrement, ingredientsLoading, blacklistedLoading, ingredientsError, deselectIngredients } =
        useManageIngredients()
    const { recipePreferences } = useRecipesContext()
    const { isActive } = useButtonState(ingredients)
    const { handleRecipesFetch } = useRecipesFetch()
    const { handleAnimation, animationState } = useShakeAnimation()
    const { getValue } = useLocalStorage()
    const { setNavSidebar, setPrefSidebar } = useSidebar()

    const showTutorialAgain = getValue("showTutorial")
    const { showTutorial, setShowTutorial } = useTutorial(showTutorialAgain)

    if (showTutorial) {
        return <>{createPortal(<Tutorial setShowTutorial={setShowTutorial} checkbox={true} />, document.getElementById("root"))}</>
    } else if (ingredientsError) {
        return (
            <div className={`${layout.pageFH} ${layout.noVerticalPadding}`}>
                <Header pageTitle="Roulette" toggleNavSidebar={setNavSidebar()} />
                <InlineMessage error={ingredientsError} />
                <Placeholder topImage={shrugImage} text="Oops >.< something went wrong!" />
            </div>
        )
    } else {
        return (
            <div
                className={`${layout.pageFH} ${layout.noVerticalPadding}`}
            >
                <div>
                    <Header pageTitle="Roulette" />

                    <div className={searchWrapper.globalActions}>
                        <IngredientSearch searchCriteria="is_selected" />
                        <IcoButton action={() => deselectIngredients("is_selected")} icon={<LockResetIcon fontSize={"small"} />} />
                        <IcoButton action={() => setPrefSidebar((b) => !b)} icon={<FilterListIcon fontSize={"small"} />} />
                    </div>
                </div>

                <div className={classes.contentWrapper}>
                    <div className={classes.ingredientsWrapper}>
                        {ingredientsLoading || blacklistedLoading
                            ? [...Array(5)].map(() => (
                                  <Skeleton
                                      className={classes.skeleton}
                                      key={Math.random()}
                                      sx={{ bgcolor: "#c5e4c9" }}
                                      variant="rounded"
                                      width={"100%"}
                                  />
                              ))
                            : ingredients?.displayed && ingredients?.displayed.map((ing) => <IngredientCard key={ing.id} ing={ing} />)}
                    </div>
                </div>
                <div className={classes.bottomButtons}>
                    <Button
                        width={"fill"}
                        active={isActive}
                        action={() => handleIngIncrement()}
                        label="Item"
                        iconLeft={<AddIcon fontSize="small" />}
                        size={18}
                        iconWheight={600}
                    />
                    <button
                        className={`${classes.cycleButton} ${animationState.isAnimating && classes.cycleButtonAnimation}`}
                        onClick={() => {
                            handleAnimation()
                            shuffleIng()
                        }}
                    >
                        {" "}
                        <LoopOutlinedIcon fontSize="medium" />
                    </button>

                    <Button
                        link={"recipe-results"}
                        width={"fill"}
                        active={true}
                        action={() => {
                            const ingNames = ingredients?.displayed.map((ing) => ing.name)
                            handleRecipesFetch(
                                ingNames,
                                recipePreferences.preparationTime,
                                recipePreferences.caloricApport,
                                recipePreferences.cuisineEthnicity,
                                recipePreferences.is_vegetarian,
                                recipePreferences.is_vegan,
                                recipePreferences.is_gluten_free,
                                recipePreferences.difficulty
                            )
                        }}
                        label="Recipes"
                        iconLeft={<ManageSearchOutlinedIcon fontSize="small" />}
                        size={20}
                    />
                </div>
            </div>
        )
    }
}
