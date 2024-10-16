import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { useRecipesContext } from "../../contexts/RecipesContext";

// Creazione del contesto
const RecipesFetchContext = createContext();

// Provider del contesto
export const RecipesFetchProvider = ({ children }) => {
  const [state, setState] = useState({
    error: false,
    loading: false,
  });
  const { setRecipes } = useRecipesContext();

  const handleRecipesFetch = useCallback(
    async (
      ingredients,
      prepTime,
      caloricApport,
      cuisineEthnicity,
      is_vegetarian,
      is_vegan,
      is_gluten_free,
      difficulty,
    ) => {
      setState({ error: false, loading: true });

      try {
        const response = await axios.post(
          "http://localhost:3000/api/generate-recipes",
          {
            ingredients,
            prepTime,
            caloricApport,
            cuisineEthnicity,
            difficulty,
            preferences: {
              is_vegan,
              is_vegetarian,
              is_gluten_free,
            },
          },
        );

        const parsedData = JSON.parse(response.data);

        setRecipes((prev) => {
          const updatedRecipes = {
            ...prev,
            results: parsedData?.meals,
          };

          // Salva le ricette aggiornate nel local storage
          try {
            const jsonRecipes = JSON.stringify(updatedRecipes);
            localStorage.setItem("recipes", jsonRecipes);
          } catch (error) {
            console.error("Failed to save recipes to local storage:", error);
          }

          return updatedRecipes;
        });

        setState({ loading: false, error: false });
      } catch (error) {
        console.error("An error occurred while fetching recipes:", error);
        setState({ error: error, loading: false });
      }
    },
    [setRecipes],
  );

  return (
    <RecipesFetchContext.Provider value={{ handleRecipesFetch, state }}>
      {children}
    </RecipesFetchContext.Provider>
  );
};

// Hook personalizzato per utilizzare il contesto
export const useRecipesFetch = () => {
  return useContext(RecipesFetchContext);
};
