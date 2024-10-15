import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { useAuth } from "../hooks/Auth/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage/useLocalStorage";
import { useRecipesUpdate } from "./useRecipeUpdate/useRecipesUpdate";
import { useRecipeFilter } from "./useRecipeFilter/useRecipeFilter";
import { useQuery } from "@tanstack/react-query";
import { useGetRequest } from "../hooks/useGetRequest/useGetRequest";

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState({
    results: [],
    favorited: [],
    filteredFavorites: [],
    searchFavorites: [],
    history: [],
    filteredHistory: [],
    searchHistory: [],
    targetedRecipe: null,
  }); //stato delle ricette
  const location = useLocation();

  const [inputValue, setInputValue] = useState(""); // Valore dell'input che filtra i risultati
  const [recipeAnimation, setRecipeAnimation] = useState(true); // Stato per animare le recipeCard quando vengono modificati i filtri

  const { isAuthenticated } = useAuth(); // Stato di autenticazione
  const { getValue, setValue } = useLocalStorage();
  const { getRequest } = useGetRequest();

  // funzioni di gestione filtri ricetta
  const {
    recipePreferences,
    setRecipePreferences,
    recipeFilters,
    setRecipeFilters,
    discardPrefChanges,
    setDiscardChanges,

    updateFilters,
    deselectFilters,
    updateDBFilters,

    preferencesUpdateLoading,
    preferencesUpdateError,
  } = useRecipeFilter(isAuthenticated);

  // funzioni per aggiornare le ricette
  const { handleRecipesUpdate, handleTargetedRecipe } = useRecipesUpdate(
    recipes,
    setRecipes,
  );
  //fetch ricette preferite
  const {
    data: DBFAvorited,
    error: favoritedError,
    isLoading: favoritedLoading,
    isFetching: favoritedFetching,
    refetch: refetchFav,
  } = useQuery({
    queryKey: ["get-favorited-recipes"],
    queryFn: async () => {
      const { id = null } = getValue("userData");
      if (!id) return;
      const res = await getRequest(
        `http://localhost:3000/api/preferences/get-favorited-recipes/${id}`,
      );
      return res;
    },
    enabled: isAuthenticated,
  });

  //fetch preferenze dietetiche
  const {
    data: DBFoodPref,
    error: foodPrefError,
    isLoading: foodPrefLoading,
    isFetching: foodPrefFetching,
    refetch: refetchFoodPrefs,
  } = useQuery({
    queryKey: ["get-food-preferences"],
    queryFn: async () => {
      const { id = null } = getValue("userData");
      if (!id) return;
      const res = await getRequest(
        `http://localhost:3000/api/preferences/get-preferences/${id}`,
      );
      return res;
    },
    enabled: isAuthenticated,
  });

  //fetch cronologia ricette
  const {
    data: DBHistory,
    error: historyError,
    isLoading: historyLoading,
    isFetching: historyFetching,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ["get-recipes-history"],
    queryFn: async () => {
      const { id = null } = getValue("userData");
      if (!id) return;
      const res = await getRequest(
        `http://localhost:3000/api/preferences/get-recipes-history/${id}`,
      );
      return res;
    },
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (favoritedLoading || historyLoading || foodPrefLoading) {
      return;
    }

    if (historyFetching || favoritedFetching || foodPrefFetching) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    const localRecipes = getValue("recipes");
    const DBRecipes = {
      results: localRecipes.results || [],
      favorited: DBFAvorited || [],
      filteredFavorites: DBFAvorited || [],
      searchFavorites: DBFAvorited || [],
      history: DBHistory || [],
      filteredHistory: DBHistory || [],
      searchHistory: DBHistory || [],
      targetedRecipe: localRecipes?.targetedRecipe || null,
    };

    DBFoodPref && setRecipePreferences(DBFoodPref);
    DBRecipes && setRecipes(DBRecipes);

    DBFoodPref && setValue("recipePreferences", DBFoodPref);
    DBRecipes && setValue("recipes", DBRecipes);
  }, [
    isAuthenticated,
    favoritedLoading,
    historyLoading,
    foodPrefLoading,
    favoritedFetching,
    historyFetching,
    foodPrefFetching,
  ]);

  // Animazione recipeCard
  useEffect(() => {
    if (
      location.pathname === "/favorited" ||
      location.pathname === "/history"
    ) {
      recipeAnimation && setTimeout(() => setRecipeAnimation(false), 0); // Se è già in corso, resetta
      setTimeout(() => setRecipeAnimation(true), 300);
    }
  }, [recipeFilters]);

  // When the path changes reset inputValue (global value)
  useEffect(() => {
    (location.pathname === "history" || "/favorited") && setInputValue("");
  }, [location.pathname]);

  // Filtro i risultati quando viene modificato l'input
  useEffect(() => {
    if (favoritedLoading || foodPrefLoading || historyLoading) return;

    setRecipes((prevRecipes) => {
      let newSearchFavorite;
      let newSearchHistory;

      if (prevRecipes.filteredFavorites.length > 0) {
        newSearchFavorite = prevRecipes.filteredFavorites.filter((rec) =>
          rec.title.toLowerCase().includes(inputValue.toLowerCase()),
        );
      }

      if (prevRecipes.filteredHistory.length > 0) {
        newSearchHistory = prevRecipes.filteredHistory.filter((rec) =>
          rec.title.toLowerCase().includes(inputValue.toLowerCase()),
        );
      }

      return {
        ...prevRecipes,
        searchFavorites: newSearchFavorite
          ? newSearchFavorite
          : prevRecipes.searchFavorites,
        searchHistory: newSearchHistory
          ? newSearchHistory
          : prevRecipes.searchHistory,
      };
    });
  }, [
    inputValue,
    favoritedLoading,
    historyLoading,
    foodPrefLoading,
    recipes.filteredFavorites,
    recipes.filteredHistory,
  ]);

  // Aggiorno le ricette visualizzate quando vengono modificati i filtri o aggiunti preferiti
  useEffect(() => {
    if (favoritedLoading || foodPrefLoading || historyLoading) return;

    const filterRecipes = (array) => {
      return array.filter((rec) => {
        return (
          rec.caloric_apport <= recipeFilters.caloric_apport &&
          rec.preparation_time <= recipeFilters.preparation_time &&
          (recipeFilters.is_gluten_free ? rec.is_gluten_free : true) &&
          (recipeFilters.is_vegetarian ? rec.is_vegetarian : true) &&
          (recipeFilters.is_vegan ? rec.is_vegan : true) &&
          (recipeFilters.cuisine_ethnicity.includes("all") ||
            recipeFilters.cuisine_ethnicity.includes(
              rec.cuisine_ethnicity.toLowerCase(),
            )) &&
          (recipeFilters.difficulty === "all" ||
            recipeFilters.difficulty.toLowerCase() ===
              rec.difficulty.toLowerCase())
        );
      });
    };

    setRecipes((prevRecipes) => {
      const newFilteredFavorites = filterRecipes(prevRecipes.favorited);
      const newFilteredHistory = filterRecipes(prevRecipes.history);
      return {
        ...prevRecipes,
        filteredFavorites: newFilteredFavorites,
        filteredHistory: newFilteredHistory,
      };
    });
  }, [
    recipeFilters,
    recipes.favorited,
    recipes.history,
    favoritedLoading,
    historyLoading,
    foodPrefLoading,
  ]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        inputValue,
        recipeAnimation,

        favoritedLoading,
        foodPrefLoading,
        historyLoading,
        preferencesUpdateLoading,

        favoritedFetching,
        historyFetching,
        foodPrefFetching,

        favoritedError,
        historyError,
        preferencesUpdateError,
        foodPrefError,

        recipePreferences,
        setRecipePreferences,

        recipeFilters,
        setRecipeFilters,

        discardPrefChanges,
        setDiscardChanges,

        handleRecipesUpdate,
        handleTargetedRecipe,
        setInputValue,
        updateFilters,
        updateDBFilters,
        deselectFilters,
        setRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipesContext = () => {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error("useRecipesContext must be used within a RecipesProvider");
  }

  return context;
};
