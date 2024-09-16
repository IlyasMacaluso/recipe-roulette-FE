import { RecipeCard } from "../../components/RecipeCard/RecipeCard"

import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import layout from "../../assets/scss/pageLayout/pageFH.module.scss"

import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"

export function Recipe() {
    const { recipes } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${layout.pageFH} ${layout.noVerticalPadding} ${animate ? transition.animationEnd : transition.animationStart}`}>
            {recipes.targetedRecipe && (
                <RecipeCard isExpanded={true} handleClickLoginSnackBar={handleClickLoginSnackBar} recipe={recipes.targetedRecipe} />
            )}
        </div>
    )
}
