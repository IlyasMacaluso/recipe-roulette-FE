import { useEffect, useState } from "react";
import { useRecipesContext } from "../../contexts/RecipesContext";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/Auth/useAuth";

export function useRecipeCard(recipe, isExpanded) {
  const location = useLocation();

  const [cardState, setCardState] = useState(recipe);
  const [expandedCard, setExpandedCard] = useState(isExpanded);
  const [expandedIngredients, setExpandedIngredients] = useState(true);
  const { handleRecipesUpdate, setRecipes, handleTargetedRecipe } =
    useRecipesContext();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setCardState((prevState) => ({
      ...prevState,
      is_favorited: recipe.is_favorited,
      id: recipe.recipe_id,
    }));
  }, [recipe.is_favorited, recipe.recipe_id, isAuthenticated]);

  function handleCardState(e) {
    e.preventDefault();
    e.stopPropagation();
    handleRecipesUpdate(cardState, setCardState, location.pathname);
  }

  function handleIngWrapperState(e) {
    e.stopPropagation();
    e.preventDefault();
    setExpandedIngredients((b) => !b);
  }

  function handleOpenRecipePage(recipe) {
    handleTargetedRecipe(recipe);
  }

  return {
    cardState,
    expandedCard,
    expandedIngredients,
    handleIngWrapperState,
    handleCardState,
    handleOpenRecipePage,
    setExpandedCard,
  };
}
