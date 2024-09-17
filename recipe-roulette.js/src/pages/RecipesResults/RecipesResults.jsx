import { RecipeCard } from "../../components/RecipeCard/RecipeCard"

import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocationHook } from "../../hooks/useLocationHook"

import { BlocksShuffleThree } from "react-svg-spinners"
import { useRecipesFetch } from "../../hooks/useRecipesFetch/useRecipesFetch"
import { Placeholder } from "../../components/Placeholder/Placeholder"

import loadingImage from "../../assets/images/healthy food-bro.svg"

import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss"
import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"
import { Header } from "../../components/Header/Header"
import { InlineMessage } from "../../components/InlineMessage/InlineMessage"

export function RecipeResults() {
    const { recipes } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()
    const { state } = useRecipesFetch()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${layout.scrollPage} ${animate ? transition.animationEnd : transition.animationStart} `}>
            <div style={{ paddingLeft: "8px", paddingRight: "8px" }}>
                <Header pageTitle="New Recipes" />
            </div>
            {!state.loading ? (
                <section className={layout.recipesWrapper}>
                    {state.error && <InlineMessage error={state.error} />}
                    {recipes.results &&
                        recipes.results.map((recipe) => {
                            return (
                                <RecipeCard
                                    handleClickLoginSnackBar={handleClickLoginSnackBar}
                                    key={`${recipe.id}_${recipe.title}`}
                                    recipe={recipe}
                                />
                            )
                        })}
                </section>
            ) : (
                <Placeholder
                    topPadding={true}
                    bottomPadding={true}
                    text="Generating Your Recipes, "
                    highlightColor={"#449a50"}
                    hightlitedText="This could take a few minutes"
                    topImage={loadingImage}
                    loadingAnimation={<BlocksShuffleThree color="#449a50" width={"20%"} height={"20%"} />}
                />
            )}
        </div>
    )
}
