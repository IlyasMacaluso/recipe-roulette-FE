import { IngredientSuggestionActive } from "./IngredientSuggestionActive"
import { IngredientSuggestionInactive } from "./IngredientSuggestionInactive"
import { useRecipesContext } from "../../../contexts/RecipesContext"
import { Placeholder } from "../../Placeholder/Placeholder"
import { InlineMessage } from "../../InlineMessage/InlineMessage"

import { useManageIngredients } from "../../../pages/Roulette/IngredientsContext"
import { Skeleton } from "@mui/material"
import placeholderImage from "../../../assets/images/Shrug-bro.svg"
import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestions({ inputRef = null, setInputState, inputActive, searchCriteria, suggestions }) {
    const { recipePreferences } = useRecipesContext()
    const { ingredientsLoading, blacklistedLoading, ingredientsError } = useManageIngredients()

    const isIngredientActive = (ingredient) => {
        if (ingredient.is_selected || ingredient.is_blacklisted) {
            return false
        }
        if (recipePreferences.is_vegetarian && !ingredient.is_vegetarian) {
            return false
        }
        if (recipePreferences.is_gluten_free && !ingredient.is_gluten_free) {
            return false
        }
        if (recipePreferences.is_vegan && !ingredient.is_vegan) {
            return false
        }
        return true
    }

    if (ingredientsError) {
        return (
            <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
                <InlineMessage error={ingredientsError} />
                <Placeholder topImage={placeholderImage} text="Oops >.< something went wrong!" />
            </div>
        )
    } else {
        return (
            <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
                {ingredientsLoading || blacklistedLoading ? (
                    <>
                        {[...Array(20)].map(() => (
                            <Skeleton
                                className={classes.skeleton}
                                key={Math.random()}
                                sx={{ bgcolor: "#c5e4c9" }}
                                variant="rounded"
                                width={"100%"}
                                height={"36px"}
                            />
                        ))}
                    </>
                ) : suggestions?.length > 0 ? (
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
                        topImage={placeholderImage}
                        text="Your search has "
                        hightlitedText="no matching results"
                        highlightColor="#f9dde0"
                    />
                )}
            </div>
        )
    }
}
