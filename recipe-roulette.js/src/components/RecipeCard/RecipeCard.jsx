import { Link } from "react-router-dom"
import { useRecipeCard } from "./useRecipeCard"

import FavoriteIcon from "@mui/icons-material/Favorite"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

import { FilterChip } from "../FilterChip/FilterChip"
import Skeleton from "@mui/material/Skeleton"

import classes from "./RecipeCard.module.scss"

const defaultTitle = "Card Title"

function RecipeCard({
    isExpanded = false,
    title = defaultTitle,
    images = [
        "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202312/MIT_Food-Diabetes-01_0.jpg?itok=Mp8FVJkC",
    ],
    attributes,
    isFav = false,
    isGlutenFree = false,
    isVegetarian = false,
    isVegan = false,
    ingredients = [],
    preparation = [],
}) {
    const { handleFavState, favState, expandedCard, expandedIngredients, handleCardState, handleIngWrapperState } = useRecipeCard(
        isFav,
        isExpanded
    )

    return (
        <Link
            onClick={(e) => handleCardState(e)}
            to={`${""}`}
            className={`${classes.recipeCard} ${expandedCard && classes.recipeCardExpanded}`}
        >
            {/* topItems */}
            <div className={classes.topItems}>
                <div
                    onClick={(e) => handleFavState(e)}
                    className={`${classes.favIcon} ${!favState ? classes.notFav : classes.isFav}`}
                >
                    <FavoriteIcon />
                </div>
                {/* da implementare la logica per capire se il caricamento dell'immagine è finito */}
                {false ? (
                    <Skeleton sx={{ bgcolor: "#C5E4C9" }} variant="rectangular" height={"100%"} />
                ) : (
                    <img src={images[0]} alt="" />
                )}
            </div>

            {/* bottomItems */}
            <div className={classes.bottomItems}>
                <section className={classes.chipsWrapper}>
                    {attributes &&
                        attributes.length > 0 &&
                        attributes.map((chip, index) => <FilterChip key={index} label={chip} />)}
                </section>
                {!expandedCard && <p className={classes.title}>{title}</p>}
            </div>

            {expandedCard && (
                <div className={classes.recipeBody}>
                    <ul
                        className={`${classes.ingredients} ${expandedIngredients ? classes.ingredientsExpanded : classes.ingredientsCollapsed}`}
                    >
                        <div onClick={(e) => handleIngWrapperState(e)} className={classes.ingredientsHeader}>
                            <h4>Ingredients</h4>
                            <ExpandLessIcon className={classes.ico} fontSize="small" />
                        </div>
                        <ul>
                            {ingredients.length > 0 &&
                                ingredients.map((ingredient, index) => {
                                    return <li key={index}>{ingredient}</li>
                                })}
                        </ul>
                    </ul>

                    <div className={classes.preparation}>
                        <h2>{title}</h2>
                        {preparation.length > 0 && (
                            <ol>
                                {preparation.map((steps, index) => {
                                    return (
                                        <li key={index} className={classes.step}>
                                            <ul>
                                                {steps[0]}
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
        </Link>
    )
}

export default RecipeCard
