import { IngredientSuggestionActive } from "./IngredientSuggestionActive"
import { IngredientSuggestionInactive } from "./IngredientSuggestionInactive"
import { useRecipesContext } from "../../../contexts/RecipesContext"

import classes from "./IngredientSuggestions.module.scss"
import { Placeholder } from "../../Placeholder/Placeholder"

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
                <Placeholder
                    bottomImage={"searching.svg"}
                    text="Your search has  "
                    hightlitedText="no matching results"
                    highlightColor="#dd3e46"
                    spacious={true}
                />
            )}
        </div>
    )
}
