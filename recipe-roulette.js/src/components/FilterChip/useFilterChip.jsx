import { useState } from "react";
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext";
import { useSnackbar } from "../Snackbar/useSnackbar";

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

  const { handleOpenSnackbar } = useSnackbar();
  const { toggle_is_blacklisted } = useManageIngredients();

  function handleDeselectChip() {
    toggle_is_blacklisted(ingState);
    handleOpenSnackbar(`${ingState.label} was removed from blacklist`, 1500);
  }

  return {
    handleDeselectChip,
  };
}
