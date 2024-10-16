import { useState } from "react";
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext";

export function useFilterChips(
  id,
  label,
  bg_color,
  is_selected,
  is_blacklisted,
) {
  const [ingState, setIngState] = useState({
    id,
    label,
    bg_color,
    is_selected,
    is_blacklisted,
  });

  const { toggle_is_selected, toggle_is_blacklisted } = useManageIngredients();

  function handleDeselectChip() {
    toggle_is_blacklisted(ingState);
  }

  return {
    handleDeselectChip,
  };
}
