import { useIngredientSearch } from "../SearchBar/useIngredientSearch"
import { useIngredientSuggestion } from "./useIngredientSuggestion"

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import classes from "./IngredientSuggestions.module.scss"
import { useSearchContext } from "../../../contexts/InputStateContext"

export function IngredientSuggestionActive({ ing, prop }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick, handleBlur } = useIngredientSearch()
    const { inputRef } = useSearchContext()

    return (
        <>
            {prop === "isBlackListed" && (
                <p
                    className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
                    onClick={() => {
                        handleSuggestionClick(prop, ingState, setIngState)
                        handleBlur(inputRef)
                    }}
                >
                    <CancelOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
            {prop === "isSelected" && (
                <p
                    className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
                    onClick={() => {
                        handleSuggestionClick(prop, ingState, setIngState)
                        handleBlur(inputRef)
                    }}
                >
                    <LockOpenOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
        </>
    )
}
