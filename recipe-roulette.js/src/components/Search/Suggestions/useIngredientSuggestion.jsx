import { useEffect, useState } from "react";

export function useIngredientSuggestion(
  id,
  name,
  bg_color,
  is_selected,
  is_blacklisted,
) {
  const [ingState, setIngState] = useState({
    id,
    name,
    bg_color,
    is_selected,
    is_blacklisted,
  });

  useEffect(() => {
    setIngState((prev) => ({
      id,
      name,
      bg_color,
      is_selected,
      is_blacklisted,
    }));
  }, [id, name, bg_color, is_selected, is_blacklisted]);

  return {
    ingState,
    setIngState,
  };
}
