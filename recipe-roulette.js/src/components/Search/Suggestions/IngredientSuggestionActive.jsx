import { useIngredientSearch } from "../SearchBar/useIngredientSearch";
import { useIngredientSuggestion } from "./useIngredientSuggestion";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import classes from "./IngredientSuggestions.module.scss";

export function IngredientSuggestionActive({
  inputRef = null,
  ing,
  prop,
  setInputState,
  handleNavigation,
  setInputValues,
}) {
  const { ingState, setIngState } = useIngredientSuggestion(ing);
  const { handleSuggestionClick, handleBlur } = useIngredientSearch();

  return (
    <>
      <p
        tabIndex={0}
        onKeyDown={(e) =>
          handleNavigation(e, ingState, inputRef, setInputState)
        }
        className={`${classes.ingredientSuggestion}  ${ing.is_selected && location.pathname === "/roulette" ? classes.lockedSuggestion : classes.unlockedSuggestion}`}
        onClick={() => {
          setInputValues((prev) => ({ ...prev, current: "" })); // reset input
          handleSuggestionClick(prop, ingState, setIngState);
          handleBlur(inputRef, setInputState);
        }}
      >
        <LockOpenOutlinedIcon fontSize="small" />
        {ing.name}
      </p>
    </>
  );
}
