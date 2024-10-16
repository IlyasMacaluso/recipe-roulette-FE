import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage";

export const useDisplayedIngredients = (ingredients, setIngredients) => {
  const { setValue } = useLocalStorage();

  const generateIngredients = () => {
    setIngredients((prev) => {
      // Filtra gli ingredienti per ottenere gli id degli ingredienti non selezionati e non in blacklist
      const ingredientIds = prev?.filtered
        .filter((ing) => !ing.is_selected && !ing.is_blacklisted)
        .map((item) => item.id);

      // Genera 5 ID casuali senza duplicati
      const randomIds = [];
      while (randomIds.length < 5) {
        const randomId =
          ingredientIds[Math.floor(Math.random() * ingredientIds.length)];
        if (ingredientIds.includes(randomId) && !randomIds.includes(randomId)) {
          randomIds.push(randomId);
        }
      }

      // Filtra gli ingredienti per ottenere gli ingredienti corrispondenti agli ID casuali generati
      const randomIngs = prev?.filtered.filter((item) =>
        randomIds.includes(item.id),
      );

      // Crea il nuovo stato degli ingredienti
      const newIngredients = { ...prev, displayed: randomIngs };

      // Aggiorna il valore degli ingredienti
      setValue("ingredients", newIngredients);

      return newIngredients;
    });
  };

  const shuffleIng = () => {
    setIngredients((prev) => {
      const newData = [];
      let availableIngs = prev?.filtered.filter(
        (item) => !item.is_selected && !item.is_blacklisted,
      );

      prev?.displayed.forEach((ingredient) => {
        if (!ingredient.is_selected) {
          const ingredientIds = availableIngs.map((item) => item.id);
          let newRandomIng = null; // L'ingrediente che sostituirà quello non selezionato

          while (!newRandomIng) {
            const randomId =
              ingredientIds[Math.floor(Math.random() * ingredientIds.length)];
            const isUnique = prev?.displayed.find((ing) => ing.id === randomId);

            if (ingredient.id !== randomId && !isUnique) {
              newRandomIng = prev?.all.find((ing) => ing.id === randomId);
              newData.push(newRandomIng);
              availableIngs = availableIngs.filter(
                (ing) => ing.id !== newRandomIng.id,
              );
            }
          }
        } else {
          newData.push(ingredient);
        }
      });

      const newIngredients = { ...prev, displayed: newData };

      setValue("ingredients", newIngredients);
      return newIngredients;
    });
  };

  const handleIngIncrement = () => {
    setIngredients((prev) => {
      const currentDisplayed = [...prev?.displayed];
      const currentFiltered = [...prev?.filtered];

      // Filtraggio degli ingredienti disponibili che non sono selezionati o in blacklist
      let availableIngs = currentFiltered.filter(
        (ingredient) => !ingredient.is_selected && !ingredient.is_blacklisted,
      );

      // Verifica che ci siano meno di 8 ingredienti a schermo
      if (currentDisplayed.length < 8) {
        // Rimuovi gli ingredienti già presenti a schermo dalla lista degli ingredienti disponibili
        const displayedIds = currentDisplayed.map((ing) => ing.id);

        // Filtra gli ingredienti disponibili escludendo quelli già visualizzati
        availableIngs = availableIngs.filter(
          (ing) => !displayedIds.includes(ing.id),
        );

        // Trova il primo ingrediente disponibile rimasto
        const newIng = availableIngs.find((ingredient) => ingredient);

        setValue("ingredients", {
          ...prev,
          displayed: [...currentDisplayed, newIng],
        });
        return { ...prev, displayed: [...currentDisplayed, newIng] };
      }

      // Se non si verificano modifiche, ritorna lo stato corrente
      return prev;
    });
  };

  const handleIngDecrement = (id, e) => {
    e.stopPropagation();
    if (ingredients?.displayed.length > 3) {
      setIngredients((prev) => {
        setValue("ingredients", {
          ...prev,
          displayed: prev.displayed.filter((ing) => ing.id !== id),
        });
        return {
          ...prev,
          displayed: prev.displayed.filter((ing) => ing.id !== id),
        };
      });
    }
  };

  return {
    generateIngredients,
    handleIngDecrement,
    handleIngIncrement,
    shuffleIng,
  };
};
