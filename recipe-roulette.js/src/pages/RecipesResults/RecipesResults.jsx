import { RecipeCard } from "../../components/RecipeCard/RecipeCard"

import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocationHook } from "../../hooks/useLocationHook"

import { BlocksShuffleThree } from "react-svg-spinners"
import { useRecipesFetch } from "../../hooks/useRecipesFetch/useRecipesFetch"
import { Placeholder } from "../../components/Placeholder/Placeholder"

import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"

export function RecipeResults() {
    const { recipes } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()
    const { state } = useRecipesFetch()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart} `}>
            {!state.loading ? (
                <section className={layout.recipesWrapper}>
                    {recipes.results &&
                        recipes.results.map((recipe) => {
                            return (
                                <RecipeCard
                                    handleClickLoginSnackBar={handleClickLoginSnackBar}
                                    key={recipe.id + recipe.title}
                                    recipe={recipe}
                                />
                            )
                        })}
                </section>
            ) : (
                <Placeholder
                    text="Generating Your Recipes, "
                    hightlitedText="This could take a few minutes"
                    loadingAnimation={<BlocksShuffleThree color="#00a55b" width={"40%"} height={"40%"} />}
                />
            )}
        </div>
    )
}
