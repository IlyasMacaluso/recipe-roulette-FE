import { useEffect, useMemo, useState } from "react";
import { useManageIngredients } from "../../../pages/Roulette/IngredientsContext";
import { useSnackbar } from "../../Snackbar/useSnackbar";
import { useLocation } from "@tanstack/react-router";

import styles from "../../Header/Header.module.scss"; // used to select html elements using these styles

export function useIngredientSearch(
  searchCriteria,
  preferencesSidebar = false,
) {
  const {
    ingredients,
    deselectIngredients,
    toggle_is_selected,
    toggle_is_blacklisted,
  } = useManageIngredients();

  const { handleOpenSnackbar } = useSnackbar();
  const [fixedPosition, setFixedPosition] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const { pathname } = useLocation();
  const [inputValues, setInputValues] = useState({ initial: "", current: "" });
  const [suggestions, setSuggestions] = useState(ingredients?.all);

  // chiudo la barra di ricerca se la sidebar viene aperta o chiusa
  useEffect(() => {
    setFixedPosition(false);
    setSearchState(false);

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

  // aggiornamento dei suggerimenti
  useEffect(() => {
    setSuggestions(ingredients?.all);
  }, [searchState, ingredients?.all]);

  // functions

  const handleInputActivation = (e) => {
    e.stopPropagation();
    setFixedPosition(true);
    setSearchState(true);
  };

  const handleBlur = (inputRef, setState) => {
    if (pathname !== "/history" && pathname !== "/favorited") {
      setInputValues((prev) => ({ ...prev, current: "" }));
    }

    inputRef?.current.blur();
    setState?.setCondition(false);
    setState?.setComponent(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();

    setInputValues((prev) => ({ ...prev, current: e.target.value }));

    setSuggestions(
      ingredients?.all.filter((ing) =>
        ing.name.toUpperCase().includes(inputValue),
      ),
    );
  };

  const handleSuggestionClick = (prop, cardState) => {
    setInputValues((prev) => ({ ...prev, current: "" })); // resetta il valore dell'input

    switch (prop) {
      case "is_blacklisted": {
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

        // if the above "if" doesn't happen, select the new item
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
  };

  // const handleInputDeactivation = (prop) => {
  //     // // Filtra gli ingredienti selezionati attualmente nella visualizzazione
  //     // const selectedIngs = ingredients?.displayed.filter((ing) => ing.is_selected)

  //     // // Filtra gli ingredienti nel database che corrispondono alla ricerca corrente
  //     // const isInDatabase = ingredients?.filtered.filter(
  //     //     (ing) => ing.name.toUpperCase().includes(inputValues.current.toUpperCase()) && !ing.is_selected && !ing.is_blacklisted
  //     // )

  //     // let firstAvailableIngredient = null

  //     // if (prop === "is_blacklisted") {
  //     //     // Filtra gli ingredienti già presenti nella lista nera
  //     //     const notAlreadyBL = ingredients?.blacklisted.filter((blIngredient) =>
  //     //         isInDatabase.some(
  //     //             (dbIngredient) =>
  //     //                 dbIngredient.id === blIngredient.id || dbIngredient.name.toUpperCase() === blIngredient.name.toUpperCase()
  //     //         )
  //     //     )

  //     //     // Trova il primo ingrediente disponibile che non è già nella lista nera
  //     //     firstAvailableIngredient = isInDatabase.find(
  //     //         (dbIngredient) => !notAlreadyBL.some((blIngredient) => blIngredient.id === dbIngredient.id)
  //     //     )
  //     // } else if (prop === "is_selected") {
  //     //     // Filtra gli ingredienti già selezionati nella visualizzazione
  //     //     const notAlreadySelected = selectedIngs.filter((onDisplay) =>
  //     //         isInDatabase.some(
  //     //             (dbIngredient) => dbIngredient.id === onDisplay.id || dbIngredient.name.toUpperCase() === onDisplay.name.toUpperCase()
  //     //         )
  //     //     )

  //     //     // Verifica se il numero massimo di ingredienti selezionati è stato raggiunto
  //     //     if (selectedIngs.length === 8) {
  //     //         handleOpenSnackbar("You've reached the maximum number of ingredients!")
  //     //     } else {
  //     //         // Trova il primo ingrediente disponibile che non è già stato selezionato
  //     //         firstAvailableIngredient = isInDatabase.find(
  //     //             (dbIngredient) => !notAlreadySelected.some((selIngredient) => selIngredient.id === dbIngredient.id)
  //     //         )
  //     //     }
  //     // }

  //     // // Resetta il valore corrente dell'input e lo stato della ricerca
  //     // setInputValues((prev) => ({ ...prev, current: "" }))

  //     // // Se è stato trovato un ingrediente disponibile, aggiorna lo stato della carta e mostra una notifica
  //     // if (firstAvailableIngredient) {
  //     //     handleIngUpdate(prop, firstAvailableIngredient, setCardState)
  //     //     prop === "is_selected" && handleOpenSnackbar(`${firstAvailableIngredient.name} was locked!`, 1500)
  //     // }
  // }

  const handlePressEnter = (e, inputRef, setState, blur = false) => {
    if (e.key === "Enter") {
      e.preventDefault();
      blur && handleBlur(inputRef, setState);
    } else if (e.key === "Escape") {
      handleBlur(inputRef, setState);
    }
  };

  const handleReset = (prop, cardState, setCardState) => {
    deselectIngredients(prop, cardState, setCardState);
  };

  return {
    handleInputActivation,
    handleInputChange,
    handleSuggestionClick,
    handlePressEnter,
    handleReset,
    setInputValues,
    handleBlur,
    setFixedPosition,
    setSearchState,
    inputValues,
    searchState,
    suggestions,
    fixedPosition,
  };
}
