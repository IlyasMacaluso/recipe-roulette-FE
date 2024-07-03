import { IngredientSuggestionActive } from "./IngredientSuggestionActive"
import { IngredientSuggestionInactive } from "./IngredientSuggestionInactive"
import { useRecipesContext } from "../../../contexts/RecipesContext"

import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestions({ inputActive, searchCriteria, suggestions }) {
    const { recipeFilter } = useRecipesContext()

    const isIngredientActive = (ingredient) => {
        if (ingredient.isSelected || ingredient.isBlackListed) {
            return false
        }
        if (recipeFilter.isVegetarian && !ingredient.isVegetarian) {
            return false
        }
        if (recipeFilter.isGlutenFree && !ingredient.isGlutenFree) {
            return false
        }
        if (recipeFilter.isVegan && !ingredient.isVegan) {
            return false
        }
        return true
    }

    return (
        <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
            {suggestions && suggestions.length > 0 ? (
                suggestions &&
                suggestions
                    .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                    .map((ingredient) => {
                        if (isIngredientActive(ingredient)) {
                            return <IngredientSuggestionActive ing={ingredient} prop={searchCriteria} key={ingredient.id} />
                        } else {
                            return <IngredientSuggestionInactive ing={ingredient} key={ingredient.id} />
                        }
                    })
            ) : (
                <div className={classes.placeholder}>
                    <h2>
                        There is <span>no ingredient</span> <br />
                        matching your search!
                    </h2>
                    <div className={classes.placeholderImage}>
                        <img src="../src/assets/images/undraw_cancel_re_pkdm 1.svg" alt="" />
                    </div>
                </div>
            )}
        </div>
    )
}
