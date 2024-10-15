import { BaseSearchSuggestion } from "./BaseSearchSuggestion";
import { useIngredientSearch } from "../SearchBar/useIngredientSearch";
import { useHandleBackButton } from "../../../hooks/useHandleBackBtn/useHandleBackBtn";
import { Placeholder } from "../../Placeholder/Placeholder";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import placeholderImage from "../../../assets/images/Shrug-bro.svg";
import classes from "./BaseSearch.module.scss";

export function BaseSearch({ data = [], inputValue = "", setInputValue }) {
  const {
    handlePressEnter,
    handleInputActivation,
    handleBlur,
    setSearchState,
    setFixedPosition,
    searchState,
  } = useIngredientSearch();
  const { inputRef } = useHandleBackButton(
    searchState,
    setSearchState,
    setFixedPosition,
    handleBlur,
  );

  return (
    <div
      className={`${classes.baseSearch} ${searchState && classes.baseSearchActive}`}
    >
      <div className={classes.searchBar}>
        <input
          ref={inputRef}
          autoComplete="off"
          className={classes.input}
          onKeyDown={(e) => {
            handlePressEnter(
              e,
              inputRef,
              { setCondition: setSearchState, setComponent: setFixedPosition },
              true,
            );
            if (e.key === "Escape") {
              setInputValue("");
            }
          }}
          onClick={handleInputActivation}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="Search a recipe"
        />
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (searchState && inputValue !== "") {
              setInputValue("");
            } else if (searchState && inputValue === "") {
              handleBlur(inputRef, {
                setCondition: setSearchState,
                setComponent: setFixedPosition,
              });
            } else if (!searchState && inputValue !== "") {
              setInputValue("");
            }
          }}
          className={classes.ico}
        >
          {searchState || inputValue !== "" ? (
            <CloseIcon fontSize="small" />
          ) : (
            <SearchIcon fontSize="small" />
          )}
        </div>
      </div>
      <div className={classes.suggestionsWrapper}>
        {data && data.length > 0 ? (
          data.map((recipe) => (
            <BaseSearchSuggestion
              inputRef={inputRef}
              key={`${recipe.recipe_id}_${recipe.title}`}
              id={recipe.recipe_id}
              handleBlur={handleBlur}
              setInputValue={setInputValue}
              setState={{
                setCondition: setSearchState,
                setComponent: setFixedPosition,
              }}
              title={recipe.title}
            />
          ))
        ) : (
          <Placeholder
            topImage={placeholderImage}
            text="Your search has  "
            hightlitedText="no matching results"
            highlightColor="#f9dde0"
            spacious={true}
          />
        )}
      </div>
    </div>
  );
}
