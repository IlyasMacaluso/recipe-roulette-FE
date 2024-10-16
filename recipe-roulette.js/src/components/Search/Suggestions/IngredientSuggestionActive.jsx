import { useIngredientSearch } from "../SearchBar/useIngredientSearch";
import { useIngredientSuggestion } from "./useIngredientSuggestion";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import classes from "./IngredientSuggestions.module.scss";

export function IngredientSuggestionActive({
  inputRef = null,
  ing,
  prop,
  setInputState,
}) {
  const { id, name, bg_color, is_selected, is_blacklisted } = ing;
  const { ingState, setIngState } = useIngredientSuggestion(
    id,
    name,
    bg_color,
    is_selected,
    is_blacklisted,
  );
  const { handleSuggestionClick, handleBlur } = useIngredientSearch();

  return (
    <>
      <p
        className={`${classes.ingredientSuggestion}  ${is_selected && location.pathname === "/roulette" ? classes.lockedSuggestion : classes.unlockedSuggestion}`}
        onClick={() => {
          if (is_selected && prop === "is_blacklisted") {
            // se l'ingredeinte è selezionato, prima eseguo la funzione passando la prop is_selected, in modo che l'ingrediente venga deselezionato,
            // e poi la eseguo una seconda volta passando la prop originale (is_blacklisted) ber aggiungerlo alla blacklist
            handleSuggestionClick("is_selected", ingState, setIngState);
            handleSuggestionClick(prop, ingState, setIngState);
            handleBlur(inputRef, setInputState);
            return;
          }
          handleSuggestionClick(prop, ingState, setIngState);
          handleBlur(inputRef, setInputState);
        }}
      >
        <LockOpenOutlinedIcon fontSize="small" />
        {name}
      </p>
    </>
  );
}
