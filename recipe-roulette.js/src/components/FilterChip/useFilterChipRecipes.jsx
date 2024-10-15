import { useEffect, useState } from "react";
import { useRecipesContext } from "../../contexts/RecipesContext";

export function useFilterChipRecipes(filters, filterType, propValue) {
  const [selectedState, setSelectedState] = useState(false);
  const { recipePreferences, recipeFilters } = useRecipesContext();

  useEffect(() => {
    setSelectedState((prevSelectedState) => {
      if (filterType === "cuisine_ethnicity") {
        return filters === "recipePreferences"
          ? recipePreferences.cuisine_ethnicity.some(
              (cuisine) => cuisine === propValue,
            )
          : recipeFilters.cuisine_ethnicity.some(
              (cuisine) => cuisine === propValue,
            );
      } else if (
        filterType === "caloric_apport" ||
        filterType === "preparation_time" ||
        filterType === "difficulty"
      ) {
        return filters === "recipePreferences"
          ? recipePreferences[filterType] === propValue
          : recipeFilters[filterType] === propValue;
      } else {
        return prevSelectedState; // Ritorna lo stato precedente se nessuna delle condizioni è verificata
      }
    });
  }, [recipePreferences, recipeFilters]);

  return {
    selectedState,
  };
}
