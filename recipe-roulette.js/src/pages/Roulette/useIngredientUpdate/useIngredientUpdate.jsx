import { useState } from "react";
import { useAuth } from "../../../hooks/Auth/useAuth";
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage";
import { usePostRequest } from "../../../hooks/usePostRequest/usePostRequest";

export const useIngredientUpdate = (ingredients, setIngredients) => {
  const [blacklistedIngredients, setBlacklistedIngredients] = useState(null);
  const [discardBLChanges, setDiscardBLChanges] = useState(null);
  const { setValue, getValue } = useLocalStorage();
  const { isAuthenticated } = useAuth();
  const {
    handlePostRequest,
    error: blacklistUpdateErr,
    loading: blacklistUpdateLoading,
  } = usePostRequest();

  async function updateDBBlacklist() {
    const userData = getValue("userData");

    if (!userData.id) {
      return;
    }
    if (!blacklistedIngredients) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    await handlePostRequest({
      url: "http://localhost:3000/api/preferences/set-blacklisted-ingredients",
      payload: { newBlacklist: blacklistedIngredients, userId: userData.id },
      mutationId: "blacklistUpdate",
    });
  }

  function toggle_is_blacklisted(ingredient) {
    const is_blacklisted = !ingredient.is_blacklisted; // newState === !oldState (toggle)

    function mapArray(array) {
      return array.map((item) =>
        item.id === ingredient.id ? { ...item, is_blacklisted } : item,
      );
    }

    setIngredients((prev) => {
      setBlacklistedIngredients(() => {
        return mapArray(prev.all).filter((item) => item.is_blacklisted);
      });

      return {
        ...prev,
        all: mapArray(prev.all),
        displayed: mapArray(prev.displayed),
        blacklisted: mapArray(prev.all).filter((item) => item.is_blacklisted),
        filtered: mapArray(prev.filtered),
      };
    });
  }

  function toggle_is_selected(ingredient) {
    const is_selected = !ingredient.is_selected; // newState === !oldState (toggle)

    function mapArray(array) {
      return array.map((item) =>
        item.id === ingredient.id ? { ...item, is_selected } : item,
      );
    }

    setIngredients((prev) => {
      let newIngredients;

      // define those that are the same across all cases
      newIngredients = {
        ...prev,
        all: mapArray(prev.all),
        blacklisted: mapArray(prev.blacklisted),
        filtered: mapArray(prev.filtered),
      };

      const isDisplayed = prev.displayed.some(
        (item) => item.id === ingredient.id,
      );

      switch (isDisplayed) {
        case true: {
          newIngredients = {
            ...newIngredients,
            displayed: mapArray(prev.displayed),
          };
          break;
        }

        case false: {
          // define the new ingredient (will be added in ingredients.displayed array)
          const updatedIngredient = { ...ingredient, is_selected };

          if (prev.displayed.length < 8) {
            newIngredients = {
              ...newIngredients,
              displayed: [updatedIngredient, ...prev.displayed],
            };
          }

          if (prev.displayed.length === 8) {
            const itemToRemove = prev.displayed.find(
              (item) => !item.is_selected,
            ); // firnd the first unselected ing to replace it with the new selected ingredient

            newIngredients = {
              ...newIngredients,
              displayed: [
                updatedIngredient,
                ...prev.displayed.filter((item) => item.id !== itemToRemove.id),
              ],
            };
          }
          break;
        }
      }

      setValue("ingredients", newIngredients);
      return newIngredients;
    });
    return;
  }

  //Nota: deleseziona anche gli elementi blacklistati a seconda della prop passata!!
  function deselectIngredients(prop) {
    // Funzione per mappare l'array e impostare il valore della proprietà a false
    const mapArray = (array) =>
      array &&
      array.length > 0 &&
      array.map((item) => ({ ...item, [prop]: false }));

    setIngredients((prev) => {
      const newIngredients = mapArray(prev?.all);
      let newDisplayed = mapArray(prev.displayed);
      let newBlacklisted = prop === "is_blacklisted" ? [] : prev.blacklisted;

      setBlacklistedIngredients(newBlacklisted);

      // Ritorna il nuovo stato degli ingredienti
      return {
        ...prev,
        all: newIngredients,
        displayed: newDisplayed,
        blacklisted: newBlacklisted,
      };
    });
  }

  return {
    toggle_is_selected,
    toggle_is_blacklisted,
    deselectIngredients,
    updateDBBlacklist,
    blacklistUpdateErr,
    blacklistUpdateLoading,
    discardBLChanges,
    setDiscardBLChanges,
  };
};
