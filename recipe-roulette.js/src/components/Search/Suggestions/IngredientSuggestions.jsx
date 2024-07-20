import { IngredientSuggestionActive } from "./IngredientSuggestionActive"
import { IngredientSuggestionInactive } from "./IngredientSuggestionInactive"
import { useRecipesContext } from "../../../contexts/RecipesContext"

import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestions({ inputRef = null, setInputState, inputActive, searchCriteria, suggestions }) {
    const { recipeFilter } = useRecipesContext()

    const isIngredientActive = (ingredient) => {
        if (ingredient.is_selected || ingredient.is_blacklisted) {
            return false
        }
        if (recipeFilter.is_vegetarian && !ingredient.is_vegetarian) {
            return false
        }
        if (recipeFilter.is_gluten_free && !ingredient.is_gluten_free) {
            return false
        }
        if (recipeFilter.is_vegan && !ingredient.is_vegan) {
            return false
        }
        return true
    }

    return (
        <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
            {suggestions && suggestions.length > 0 ? (
                suggestions
                    .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                    .map((ingredient) => {
                        if (isIngredientActive(ingredient)) {
                            return (
                                <IngredientSuggestionActive
                                    inputRef={inputRef}
                                    setInputState={setInputState}
                                    ing={ingredient}
                                    prop={searchCriteria}
                                    key={ingredient.id}
                                />
                            )
                        } else {
                            return (
                                <IngredientSuggestionInactive
                                    inputRef={inputRef}
                                    setInputState={setInputState}
                                    ing={ingredient}
                                    key={ingredient.id}
                                />
                            )
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
