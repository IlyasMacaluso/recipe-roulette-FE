import { useEffect, useState } from "react";

export function useIngredientSuggestion(ing) {
  const [ingState, setIngState] = useState(ing);

  // aggiornamento dello stato del suggerimento singolo
  useEffect(() => {
    if (!ing) {
      return;
    }
    setIngState(ing);
  }, [ing]);

  return {
    ingState,
    setIngState,
  };
}
