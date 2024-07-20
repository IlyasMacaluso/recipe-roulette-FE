import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { Button } from "../../components/Buttons/Button/Button"
import { useButtonState } from "../../hooks/ButtonState/useButtonState"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocationHook } from "../../hooks/useLocationHook"
import { useRecipesFetch } from "../../hooks/useRecipesFetch/useRecipesFetch"
import { useShakeAnimation } from "../../hooks/useShakeAnimation/useShakeAnimation"
import { useManageIngredients } from "./IngredientsContext"
import { Skeleton } from "@mui/material"

import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined"
import AddIcon from "@mui/icons-material/Add"
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import classes from "./Roulette.module.scss"

export function Roulette() {
    const { ingredients, shuffleIng, handleIngIncrement, ingredientsLoading, blacklistedLoading } = useManageIngredients()
    const { recipeFilter } = useRecipesContext()
    const { isActive, setIsActive } = useButtonState(ingredients)
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    const { handleRecipesFetch } = useRecipesFetch()
    const { handleAnimation, animationState } = useShakeAnimation()

    return (
        <div className={`${classes.discoveryPage} ${animate && classes.animateDiscovery}`}>
            <div className={classes.contentWrapper}>
                <div className={classes.ingredientsWrapper}>
                    {ingredientsLoading || blacklistedLoading
                        ? [...Array(5)].map(() => <Skeleton key={Math.random()} sx={{ bgcolor: "#c5e4c9" }} variant="rounded" width={"100%"} height={"100%"} />)
                        : ingredients?.displayed.map((ing) => <IngredientCard key={ing.id} ing={ing} />)}
                </div>
            </div>
            <div className={classes.bottomButtons}>
                <Button
                    width={"fill"}
                    active={isActive}
                    action={() => handleIngIncrement()}
                    label="Ingredient"
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
