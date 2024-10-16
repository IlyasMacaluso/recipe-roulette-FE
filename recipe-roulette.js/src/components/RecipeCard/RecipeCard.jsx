import { useLocation, useNavigate } from "@tanstack/react-router"
import { useRecipeCard } from "./useRecipeCard"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { FilterChip } from "../FilterChip/FilterChip"
import { useAuth } from "../../hooks/Auth/useAuth"
import { useImagesContext } from "../../contexts/imagesContext/ImageContext"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import Skeleton from "@mui/material/Skeleton"

import classes from "./RecipeCard.module.scss"

export function RecipeCard({ isExpanded = false, recipe, handleClickLoginSnackBar = null }) {
    const location = useLocation()
    const navigate = useNavigate()
    const cardImage = useImagesContext()

    const { recipeAnimation, handleTargetedRecipe } = useRecipesContext()
    const { isAuthenticated } = useAuth()
    const { title, attributes, is_gluten_free, is_vegetarian, is_vegan, ingQuantities, preparation } = recipe
    const { handleCardState, cardState, expandedCard, expandedIngredients, handleIngWrapperState, handleOpenRecipePage } = useRecipeCard(
        recipe,
        isExpanded
    )

    return (
        <div
            onClick={() => {
                if (!expandedCard) {
                    localStorage.setItem("prevPath", location.pathname)
                    handleOpenRecipePage(recipe)
                    handleTargetedRecipe(recipe)
                    navigate({ to: "/recipe" })
                }
            }}
            className={`${classes.recipeCard} ${expandedCard && classes.recipeCardExpanded} ${recipeAnimation && classes.animateRecipeCard}`}
        >
            <div className={classes.topItems}>
                <div
                    onClick={(e) => {
                        isAuthenticated ? handleCardState(e) : handleClickLoginSnackBar(e)
                        e.stopPropagation()
                    }}
                    className={`${classes.favIcon} ${!cardState.isFavorited ? classes.notFav : classes.isFav}`}
                >
                    <FavoriteIcon stroke={"#e5e0df"} strokeWidth={cardState.isFavorited ? "0" : "1px"} />
                </div>

                {!cardImage ? (
                    <Skeleton className={classes.skeleton} sx={{ bgcolor: "#C5E4C9" }} variant="rectangular" height={"100%"} />
                ) : (
                    <img src={cardImage} alt="" />
                )}
            </div>

            {/* bottomItems */}
            <div className={classes.bottomItems}>
                <section className={classes.chipsWrapper}>
                    {/* {is_vegan && <FilterChip label={"Vegan"} />}
                    {is_vegetarian && <FilterChip label={"Vegetarian"} />}
                    {is_gluten_free && <FilterChip label={"GlutenFree"} />} */}
                    {attributes && attributes.length > 0 && attributes.map((chip, index) => <FilterChip key={index} label={chip} />)}
                </section>
                {!expandedCard && <p className={classes.title}>{title}</p>}
            </div>

            {expandedCard && (
                <div className={classes.recipeBody}>
                    {/* lista ingredienti */}
                    <ul
                        className={`${classes.ingredients} ${
                            expandedIngredients ? classes.ingredientsExpanded : classes.ingredientsCollapsed
                        }`}
                    >
                        <div onClick={(e) => handleIngWrapperState(e)} className={classes.ingredientsHeader}>
                            <h4>Ingredients</h4>
                            <ExpandLessIcon className={classes.ico} fontSize="small" />
                        </div>

                        <ul>
                            {ingQuantities.length > 0 &&
                                ingQuantities.map((ingredient, index) => {
                                    return <li key={index}>{ingredient}</li>
                                })}
                        </ul>
                    </ul>

                    {/* Preparation instructions */}
                    <div className={classes.preparation}>
                        <h2>Preparation</h2>
                        {preparation.length > 0 && (
                            // preparations steps (mapped from array)
                            <ol>
                                {preparation.map((steps, index) => {
                                    return (
                                        <li key={index} className={classes.step}>
                                            {steps[0]}
                                            <ul>
                                                {steps.length > 0 &&
                                                    steps.map((step, index) => {
                                                        if (index > 0) {
                                                            return (
                                                                <li key={index} className={classes.detail}>
                                                                    {step}
                                                                </li>
                                                            )
                                                        }
                                                    })}
                                            </ul>
                                        </li>
                                    )
                                })}
                            </ol>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
