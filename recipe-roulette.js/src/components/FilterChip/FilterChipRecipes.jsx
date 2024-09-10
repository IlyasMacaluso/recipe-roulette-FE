import { useFilterChipRecipes } from "./useFilterChipRecipes"
import { useRecipesContext } from "../../contexts/RecipesContext"

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"
import classes from "./FilterChip.module.scss"

export function FilterChipRecipes({ filters = "recipePreferences", propValue = 9999, filterType = null, label }) {
    const { handleRecipeFilters, setRecipePreferences, setRecipeFilters } = useRecipesContext()
    const { selectedState } = useFilterChipRecipes(filters, filterType, propValue)

    return (
        <div
            onClick={() => {
                handleRecipeFilters({
                    filters: filters, // preferences (used to generate recipes) / filters (used to filter recipe arrays)
                    setFilters: filters === "recipePreferences" ? setRecipePreferences : setRecipeFilters,
                    propToUpdate: filterType,
                    propValue: propValue,
                    isPropSelected: selectedState,
                })
            }}
            className={`${classes.filterChip} ${selectedState ? classes.active : classes.inactive}`}
        >
            <CheckOutlinedIcon className={classes.ico} fontSize="18px" />
            <p className={classes.label}>{label}</p>
        </div>
    )
}