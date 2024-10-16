import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import NoMealsOutlinedIcon from "@mui/icons-material/NoMealsOutlined";

import classes from "./IngredientSuggestions.module.scss";

export function IngredientSuggestionInactive({ ing }) {
  const { name, is_blacklisted } = ing;

  return (
    <>
      {is_blacklisted ? (
        <p
          className={`${classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}
        >
          <BlockOutlinedIcon fontSize="small" />
          {name}
        </p>
      ) : (
        <p
          className={`${classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}
        >
          <NoMealsOutlinedIcon fontSize="small" />
          {name}
        </p>
      )}
    </>
  );
}
