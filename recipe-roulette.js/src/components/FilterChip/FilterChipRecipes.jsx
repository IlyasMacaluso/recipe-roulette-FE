import { useFilterChipRecipes } from "./useFilterChipRecipes"

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"

import classes from "./FilterChip.module.scss"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function FilterChipRecipes({ numericValue = 9999, filterType = null, label }) {
    const { handlePreferencesToggle } = useRecipesContext()
    const { selectedState } = useFilterChipRecipes(label, filterType, numericValue)

    return (
        <div
            onClick={() => {
                filterType === "cuisineEthnicity" && handlePreferencesToggle(filterType, label.toLowerCase(), selectedState)
                filterType === "caloricApport"  && handlePreferencesToggle(filterType, numericValue, selectedState)
                filterType === "preparationTime" && handlePreferencesToggle(filterType, numericValue, selectedState)
                filterType === "difficulty" && handlePreferencesToggle(filterType, numericValue, selectedState)
            }}
            className={`${classes.filterChip} ${selectedState ? classes.active : classes.inactive}`}
        >
            <CheckOutlinedIcon className={classes.ico} fontSize="18px" />
            <p className={classes.label}>{label}</p>
        </div>
    )
}
