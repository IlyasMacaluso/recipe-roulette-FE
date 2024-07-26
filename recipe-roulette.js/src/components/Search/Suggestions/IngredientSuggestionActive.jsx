import { useIngredientSearch } from "../SearchBar/useIngredientSearch"
import { useIngredientSuggestion } from "./useIngredientSuggestion"

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestionActive({inputRef = null, ing, prop, setInputState }) {
    const { id, name, bg_color, is_selected, is_blacklisted } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bg_color, is_selected, is_blacklisted)
    const { handleSuggestionClick, handleBlur } = useIngredientSearch()

    return (
        <>
            {prop === "is_blacklisted" && (
                <p
                    className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
                    onClick={() => {
                        handleSuggestionClick(prop, ingState, setIngState)
                        handleBlur(inputRef, setInputState)
                    }}
                >
                    <CancelOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
            {prop === "is_selected" && (
                <p
                    className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
                    onClick={() => {
                        handleSuggestionClick(prop, ingState, setIngState)
                        handleBlur(inputRef, setInputState)
                    }}
                >
                    <LockOpenOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
        </>
    )
}
