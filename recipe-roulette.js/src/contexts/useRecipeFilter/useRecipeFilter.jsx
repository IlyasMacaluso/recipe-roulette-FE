import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage";
import { usePostRequest } from "../../hooks/usePostRequest/usePostRequest";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";

// Costruttore per creare i filtri delle ricette
function RecipeFilter({
  is_vegetarian = false,
  is_gluten_free = false,
  is_vegan = false,
  cuisine_ethnicity = [
    "all",
    "italian",
    "french",
    "chinese",
    "japanese",
    "indian",
    "greek",
    "spanish",
    "mexican",
    "thai",
    "middle eastern",
  ],
  preparation_time = 9999,
  caloric_apport = 9999,
  difficulty = "all",
} = {}) {
  this.is_vegetarian = is_vegetarian;
  this.is_gluten_free = is_gluten_free;
  this.is_vegan = is_vegan;
  this.cuisine_ethnicity = cuisine_ethnicity;
  this.preparation_time = preparation_time;
  this.caloric_apport = caloric_apport;
  this.difficulty = difficulty;
}
export const useRecipeFilter = (isAuthenticated) => {
  const [recipePreferences, setRecipePreferences] = useState(
    new RecipeFilter(),
  );
  const [recipeFilters, setRecipeFilters] = useState(new RecipeFilter());
  const [updatedFilter, setUpdatedFilter] = useState(null);
  const [discardPrefChanges, setDiscardChanges] = useState(null);

  const { setValue, getValue } = useLocalStorage();
  const {
    handlePostRequest,
    loading: preferencesUpdateLoading,
    error: preferencesUpdateError,
  } = usePostRequest();
  const { debounceValue } = useDebounce(updatedFilter);

  // useEffect(() => {
  //     //chiamata di rete quando cambia il valore di debounce (ricetta da aggiornare)
  // if(!updatedFilter) {
  //     return
  // }
  //     if (isAuthenticated) {
  //         const userData = getValue("userData")

  //         if (updatedFilter) {
  //             handlePostRequest({
  //                 url: "http://localhost:3000/api/preferences/set-preferences",
  //                 payload: { newPreferences: updatedFilter, userId: userData.id },
  //                 mutationId: "filtersToggleUpdate", //mutationId
  //             })
  //         }
  //     }
  // }, [debounceValue])

  useEffect(() => {
    if (!isAuthenticated) {
      setRecipeFilters(new RecipeFilter());
      setRecipePreferences(new RecipeFilter());
    }
  }, [isAuthenticated]);

  const updateDBFilters = async () => {
    const userData = getValue("userData");

    if (!userData.id) {
      return;
    }

    if (!updatedFilter) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    await handlePostRequest({
      url: "http://localhost:3000/api/preferences/set-preferences",
      payload: { newPreferences: recipePreferences, userId: userData.id },
      mutationId: "filtersToggleUpdate", //mutationId
    });
  };

  // Gestione delle proprietà non booleane di recipePreferences
  const updateFilters = ({
    filters,
    setFilters,
    propToUpdate,
    propValue,
    isPropSelected,
  }) => {
    if (!setFilters || !propToUpdate || !filters) return;

    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };

      if (
        propToUpdate === "is_vegetarian" ||
        propToUpdate === "is_vegan" ||
        propToUpdate === "is_gluten_free"
      ) {
        // aggiornamento prop booleane
        const newState = !prevFilters[propToUpdate];
        updatedFilters = { ...prevFilters, [propToUpdate]: newState };
      } else {
        // aggiornamento prop non booleane
        if (!propValue) return;

        // -> "caloric_apport", "preparation_time" e "difficulty"
        if (
          propToUpdate === "caloric_apport" ||
          propToUpdate === "preparation_time" ||
          propToUpdate === "difficulty"
        ) {
          const newValue = !isPropSelected
            ? propValue
            : propToUpdate === "difficulty"
              ? "all"
              : 9999;
          updatedFilters = { ...updatedFilters, [propToUpdate]: newValue };
        }

        // -> "cuisine_ethnicity"
        if (propToUpdate === "cuisine_ethnicity") {
          let updatedEthnicity = [...prevFilters.cuisine_ethnicity];
          const isAlreadyThere = updatedEthnicity.find(
            (cuisine) => cuisine === propValue,
          );

          if (propValue === "all") {
            updatedEthnicity = prevFilters.cuisine_ethnicity.includes("all")
              ? []
              : new RecipeFilter().cuisine_ethnicity;
          } else {
            if (isAlreadyThere) {
              updatedEthnicity = updatedEthnicity.filter(
                (item) => item !== propValue && item !== "all",
              );
            } else {
              updatedEthnicity.push(propValue);
              if (updatedEthnicity.length === 10) {
                updatedEthnicity.push("all");
              }
            }
          }
          updatedFilters = {
            ...updatedFilters,
            cuisine_ethnicity: updatedEthnicity,
          };
        }
      }

      if (filters === "recipePreferences") {
        setValue("recipePreferences", updatedFilters); // Aggiorna il valore nel local storage
        setUpdatedFilter(updatedFilters); // post request triggher quando si modificano le preferences
      }

      return updatedFilters; // Ritorna il nuovo stato aggiornato
    });
  };

  // Reset dei filtri recipePreferences
  const deselectFilters = ({ filters, setFilters }) => {
    setFilters(new RecipeFilter());

    if (filters === "recipePreferences") {
      setUpdatedFilter(new RecipeFilter()); // post request triggher
      setValue("recipePreferences", new RecipeFilter());
    }
  };

  return {
    recipePreferences,
    setRecipePreferences,
    recipeFilters,
    setRecipeFilters,
    discardPrefChanges,
    setDiscardChanges,

    preferencesUpdateLoading,
    preferencesUpdateError,

    updateFilters,
    deselectFilters,
    updateDBFilters,
  };
};
