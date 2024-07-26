import { useIngredientSuggestion } from "./useIngredientSuggestion"
import { useIngredientSearch } from "../SearchBar/useIngredientSearch"

import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import NoMealsOutlinedIcon from "@mui/icons-material/NoMealsOutlined"

import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestionInactive({ inputRef = null, ing, prop = "is_selected", setInputState }) {
    const { id, name, bg_color, is_selected, is_blacklisted } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bg_color, is_selected, is_blacklisted)
    const { handleSuggestionClick, handleBlur } = useIngredientSearch()

    return (
        <>
            {ing.is_blacklisted && (
                <p className={`${!ing.is_selected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
                    <BlockOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
            {ing.is_selected && (
                <p
                    onClick={() => {
                        handleSuggestionClick(prop, ingState, setIngState)
                        handleBlur(inputRef, setInputState)
                    }}
                    className={`${!ing.is_selected && classes.inactiveSuggestion} ${classes.lockedSuggestion} ${classes.ingredientSuggestion}`}
                >
                    <LockOutlinedIcon fontSize="small" />
                    {name}{" "}
                </p>
            )}
            {!ing.is_selected && !ing.is_blacklisted && (
                <p className={`${!ing.is_selected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
                    <NoMealsOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
        </>
    )
}
{
    /* <p className={`${!ing.is_selected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
            {ing.is_blacklisted && <MaterialSymbol icon="block" grade={20} size={20} />}
            {ing.is_selected && <MaterialSymbol icon="task_alt" grade={20} size={20} />}
            {(!ing.is_selected && !ing.is_blacklisted) && <MaterialSymbol icon="instant_mix" grade={20} size={20} />}
            {name}
        </p> */
}
