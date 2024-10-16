import { useEffect, useState } from "react";
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext";
import { useSnackbar } from "../Snackbar/useSnackbar";
import { useRecipesContext } from "../../contexts/RecipesContext";

export function useIngredientCard(ing) {
  // extract eact property into its own constant
  const {
    id,
    name,
    bg_color,
    is_blacklisted,
    is_selected,
    is_gluten_free,
    is_vegetarian,
    is_vegan,
  } = ing;

  // create a state for the ingredient card initialised with the above constants
  const [cardState, setCardState] = useState({
    name,
    id,
    bg_color,
    is_selected,
    is_blacklisted,
    is_gluten_free,
    is_vegetarian,
    is_vegan,
  });

  const { recipePreferences } = useRecipesContext();
  const { handleOpenSnackbar } = useSnackbar();
  const { toggle_is_selected, handleIngDecrement, ingredients } =
    useManageIngredients();

  useEffect(() => {
    setCardState(() => {
      return {
        name,
        id,
        bg_color,
        is_blacklisted,
        is_gluten_free,
        is_vegetarian,
        is_vegan,
        is_selected,
      };
    });
  }, [ing]);

  function handleIngredientClick() {
    // if the ingredient is blacklisted, open the snackbar with warning message
    if (cardState.is_blacklisted && !cardState.is_selected) {
      handleOpenSnackbar(`You have blacklisted ${cardState.name}!`);
      return;
    }

    const is_ingredient_filtered_out = !ingredients?.filtered.some(
      (ing) => ing.id === cardState.id,
    );

    // if the ingredient is filtered out, open the snackbar with a message based on the active filters
    if (is_ingredient_filtered_out && !cardState.is_selected) {
      const glutenFree =
        recipePreferences.is_gluten_free && !cardState.is_gluten_free
          ? "gluten free"
          : "";

      const vegetarian =
        recipePreferences.is_vegetarian && !cardState.is_vegetarian
          ? glutenFree
            ? ", vegetarian"
            : " vegetarian"
          : "";

      const vegan =
        recipePreferences.is_vegan && !cardState.is_vegan
          ? vegetarian || glutenFree
            ? ", vegan"
            : " vegan"
          : "";

      handleOpenSnackbar(
        `You have filtered non ${glutenFree}${vegetarian}${vegan} ingredeints!`,
      );

      return;
    }

    // if none of the above happens, just update the card state
    toggle_is_selected(cardState);
  }

  function handleXClick(e) {
    e.stopPropagation();
    if (cardState.is_selected) {
      handleIngredientClick();
    } else {
      handleIngDecrement(cardState.id, e);
    }
  }

  return {
    handleIngredientClick,
    handleXClick,
    setCardState,
    cardState,
  };
}
