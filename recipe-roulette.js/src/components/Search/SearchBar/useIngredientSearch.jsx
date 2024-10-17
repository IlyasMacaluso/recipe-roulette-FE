import { useEffect, useRef, useState } from "react";
import { useManageIngredients } from "../../../pages/Roulette/IngredientsContext";
import { useSnackbar } from "../../Snackbar/useSnackbar";
import { useLocation } from "@tanstack/react-router";

import classes from "../Suggestions/IngredientSuggestions.module.scss";
import styles from "../../Header/Header.module.scss"; // used to select html elements using these styles
import searchStyles from "./IngredientSearch.module.scss";

export function useIngredientSearch(
  searchCriteria,
  preferencesSidebar = false,
) {
  const [fixedPosition, setFixedPosition] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [inputValues, setInputValues] = useState({ initial: "", current: "" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const suggestionsRef = useRef([]);

  const { ingredients, toggle_is_selected, toggle_is_blacklisted } =
    useManageIngredients();
  const [suggestions, setSuggestions] = useState(ingredients?.all);
  const { handleOpenSnackbar } = useSnackbar();
  const { pathname } = useLocation();

  // aggiornamento dello stato di tutti i suggerimenti
  useEffect(() => {
    setSuggestions(ingredients?.all);
  }, [ingredients?.all]);

  // select suggestions items for suggestions navigation (keyup/keydown)
  useEffect(() => {
    const search = document.querySelectorAll(`.${searchStyles.positionFixed}`);

    const activeSearch = Array.from(search).find((item) => {
      const input = item.querySelector("input"); // Assicurati di usare il selettore corretto per l'input
      if (input === document.activeElement) return item;
    });

    if (!activeSearch) {
      return;
    }

    suggestionsRef.current = activeSearch.querySelectorAll(
      `
      .${classes.active} .${classes.unlockedSuggestion},
      .${classes.active} .${classes.lockedSuggestion}
      `,
    );
  }, [searchState, suggestions]);

  // chiudo la barra di ricerca se la sidebar viene aperta o chiusa
  useEffect(() => {
    setFixedPosition(false);
    setSearchState(false);

    // disattivo gli altri input per evitare che il tasto "go" del telefono passi all'input successivo
    const input = document.querySelector(
      `.${styles.header} .${styles.globalActions} input`,
    );

    if (!input) {
      return;
    }

    if (preferencesSidebar === true) {
      input.disabled = true;
    } else {
      input.disabled = false;
    }
  }, [preferencesSidebar]);

  function handleInputActivation(e) {
    e.stopPropagation();
    setFixedPosition(true);
    setSearchState(true);
  }

  function handleBlur(inputRef, setState) {
    if (pathname !== "/history" && pathname !== "/favorited") {
      setInputValues((prev) => ({ ...prev, current: "" }));
    }

    inputRef?.current.blur();
    setState?.setCondition(false);
    setState?.setComponent(false);
  }

  function handleInputChange(e) {
    const inputValue = e.target.value.toLowerCase();

    setInputValues((prev) => ({ ...prev, current: e.target.value }));

    setSuggestions(
      ingredients?.all.filter((ing) =>
        ing.name.toLowerCase().includes(inputValue),
      ),
    );
  }

  useEffect(() => {
    const inputValue = inputValues.current.toLowerCase();
    setSuggestions(
      ingredients?.all.filter((ing) =>
        ing.name.toLowerCase().includes(inputValue),
      ),
    );
  }, [inputValues, ingredients.all]);

  function handleSuggestionClick(prop, cardState) {
    switch (prop) {
      //
      case "is_blacklisted": {
        handleOpenSnackbar(
          `${cardState.name} was added to the blacklist`,
          1500,
        );

        if (cardState.is_selected) {
          toggle_is_selected(cardState);
          toggle_is_blacklisted(cardState);
          return;
        }

        toggle_is_blacklisted(cardState);
        break;
      }

      case "is_selected": {
        const selectedIngs = ingredients?.displayed.filter(
          (ing) => ing.is_selected,
        );

        // se sono già selezionati 8 elementi e si prova ad aggiungerne un altro apriamo un messaggio di avviso
        if (selectedIngs.length === 8 && !cardState.is_selected) {
          handleOpenSnackbar(
            "You've reached the maximum number of ingredients!",
          );
          return;
        }

        // if the above "if" statement doesn't happen, select the new item
        toggle_is_selected(cardState);

        // and open a snackbar message if we are in the /roulette page
        if (pathname === "/roulette") {
          !cardState.is_selected
            ? handleOpenSnackbar(`${cardState.name} was locked!`, 1500)
            : handleOpenSnackbar(`${cardState.name} was unlocked`, 1500);
        }
        break;
      }

      default: {
        break;
      }
    }
  }

  function handlePressEnter(e, inputRef, setState, blur = false) {
    if (e.key === "Enter") {
      e.preventDefault();
      blur && handleBlur(inputRef, setState);
    } else if (e.key === "Escape") {
      handleBlur(inputRef, setState);
    }
  }

  function handleNavigation(e, ingredient, inputRef, setSearchState) {
    e.preventDefault();
    if (suggestionsRef.current.length === 0) return;

    const has_focus = Array.from(suggestionsRef.current).some(
      (item) => item === document.activeElement,
    );

    switch (has_focus) {
      case true: {
        if (e.key === "ArrowUp") {
          if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            suggestionsRef.current[prevIndex].focus();
            setCurrentIndex(prevIndex);
          }
          return;
        }

        if (e.key === "ArrowDown") {
          if (currentIndex < suggestionsRef.current.length - 1) {
            const nextIndex = currentIndex + 1;
            suggestionsRef.current[nextIndex].focus();
            setCurrentIndex(nextIndex);
          }
          return;
        }

        if (e.key === "Enter") {
          const prop_to_update = searchCriteria;
          handleSuggestionClick(prop_to_update, ingredient);
          handleBlur(inputRef, setSearchState);
          return;
        }

        break;
      }

      case false: {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          // Se non c'è nessun elemento in focus, metti il focus sul primo
          suggestionsRef.current[0].focus();
          setCurrentIndex(0);
        }
        break;
      }
      default:
        break;
    }
  }

  return {
    handleInputActivation,
    handleInputChange,
    handleSuggestionClick,
    handlePressEnter,
    setInputValues,
    handleBlur,
    setFixedPosition,
    setSearchState,
    inputValues,
    searchState,
    fixedPosition,
    handleNavigation,
    suggestions,
    setSuggestions,
  };
}
