import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import { useRecipesContext } from "../../contexts/RecipesContext"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./RecipesResults.module.scss"
import { BlocksShuffleThree } from "react-svg-spinners"
import { useRecipesFetch } from "../../hooks/useRecipesFetch/useRecipesFetch"

export function RecipeResults() {
    const { recipes } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()
    const { state } = useRecipesFetch()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${classes.recipesResultsPage} ${animate && classes.animateFavorite} `}>
            {!state.loading ? (
                <section className={classes.recipesWrapper}>
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
                <div className={classes.placeholder}>
                    <BlocksShuffleThree color="#00a55b" width={"40%"} height={"40%"} />
                    <h2>
                        <span>Generating Your Recipes!</span> <br />
                        This could take a few minutes...
                    </h2>
                </div>
            )}
        </div>
    )
}
