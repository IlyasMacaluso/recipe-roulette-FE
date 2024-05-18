import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import classes from "./Search.module.scss"
import { SearchSuggestion } from "./SearchSuggestion"

export function SearchSuggestions({ inputActive, searchCriteria }) {
    const { ing } = useManageIngredients()
    return (
        <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
            {ing &&
                ing
                    .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                    .map((ingredient) => {
                        if (!ingredient[searchCriteria]) {
                            return (
                                <SearchSuggestion
                                    ing={ingredient}
                                    prop={searchCriteria}
                                    className={classes.active}
                                    key={ingredient.id}
                                />
                            )
                        } else {
                            return <SearchSuggestion ing={ingredient} className={classes.inactive} key={ingredient.id} />
                        }
                    })}
        </div>
    )
}
