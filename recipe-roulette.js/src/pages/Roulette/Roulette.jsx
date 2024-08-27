import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { Button } from "../../components/Buttons/Button/Button"
import { useButtonState } from "../../hooks/ButtonState/useButtonState"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocationHook } from "../../hooks/useLocationHook"
import { useRecipesFetch } from "../../hooks/useRecipesFetch/useRecipesFetch"
import { useShakeAnimation } from "../../hooks/useShakeAnimation/useShakeAnimation"
import { useManageIngredients } from "./IngredientsContext"
import { debounce, Skeleton } from "@mui/material"
import { InlineMessage } from "../../components/InlineMessage/InlineMessage"
import { useEffect, useState } from "react"

import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined"
import AddIcon from "@mui/icons-material/Add"
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"

import classes from "./Roulette.module.scss"
import layout from "../../assets/scss/pageLayout/pageFH.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"
import { Placeholder } from "../../components/Placeholder/Placeholder"

export function Roulette() {
    const [pageHeight, setPageHeight] = useState("100%")

    const { ingredients, shuffleIng, handleIngIncrement, ingredientsLoading, blacklistedLoading, ingredientsError } = useManageIngredients()
    const { recipeFilter } = useRecipesContext()
    const { isActive } = useButtonState(ingredients)
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    const { handleRecipesFetch } = useRecipesFetch()
    const { handleAnimation, animationState } = useShakeAnimation()

    useEffect(() => {
        const page = document.querySelector(`.${layout.pageFH}`)
        if (page) {
            const height = page.offsetHeight
            setPageHeight(height)
        }
    }, [])

    if (ingredientsError) {
        return (
            <div className={`${layout.pageFH} ${layout.noPadding}`}>
                <InlineMessage error={ingredientsError} />
                <Placeholder topImage={"Shrug-bro.svg"} text="Oops >.< something went wrong!" />
            </div>
        )
    } else {
        return (
            <div
                style={{
                    minHeight: `${pageHeight}px`,
                }}
                className={`${layout.pageFH} ${layout.noPadding} ${animate ? transition.animationEnd : transition.animationStart}`}
            >
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
                        icon={<AddIcon fontSize="small" />}
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
                                recipeFilter.preparationTime,
                                recipeFilter.caloricApport,
                                recipeFilter.cuisineEthnicity,
                                recipeFilter.is_vegetarian,
                                recipeFilter.is_vegan,
                                recipeFilter.is_gluten_free,
                                recipeFilter.difficulty
                            )
                        }}
                        label="Recipes"
                        icon={<ManageSearchOutlinedIcon fontSize="small" />}
                        size={20}
                    />
                </div>
            </div>
        )
    }
}
