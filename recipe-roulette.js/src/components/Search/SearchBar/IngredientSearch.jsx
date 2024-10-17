import { useIngredientSearch } from "./useIngredientSearch";
import { useHandleBackButton } from "../../../hooks/useHandleBackBtn/useHandleBackBtn";

import { IngredientSuggestions } from "../Suggestions/IngredientSuggestions";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import classes from "./IngredientSearch.module.scss";

export function IngredientSearch({
  searchCriteria = "is_blacklisted",
  preferencesSidebar = false,
}) {
  const {
    inputValues,
    setInputValues,
    searchState,
    fixedPosition,
    handlePressEnter,
    handleInputChange,
    handleInputActivation,
    handleBlur,
    setSearchState,
    setFixedPosition,
    handleNavigation,
    suggestions,
  } = useIngredientSearch(searchCriteria, preferencesSidebar);

  const { inputRef } = useHandleBackButton(
    searchState,
    setSearchState,
    setFixedPosition,
    handleBlur,
  );

  return (
    <div
      className={`${fixedPosition && classes.positionFixed} ${classes.search}`}
    >
      <div
        className={`${classes.searchBar} ${searchState ? classes.inputActive : classes.inputInactive}`}
      >
        <input
          value={inputValues.current}
          ref={inputRef}
          autoComplete="off"
          className={classes.header}
          onClick={handleInputActivation}
          placeholder={`${searchCriteria === "is_selected" ? "Add an ingredient" : "Blacklist an ingredient"}`}
          name="search"
          type="text"
          onKeyUp={(e) => {
            handleNavigation(e, inputRef, {
              setCondition: setSearchState,
              setComponent: setFixedPosition,
            });
            handlePressEnter(e, inputRef, {
              setCondition: setSearchState,
              setComponent: setFixedPosition,
            });
          }}
          onChange={handleInputChange}
        />
        {!searchState && (
          <div className={`${classes.ico} ${classes.searchIco}`}>
            <SearchOutlinedIcon fontSize="small" />
          </div>
        )}

        {searchState && (
          <div
            onClick={() =>
              handleBlur(inputRef, {
                setCondition: setSearchState,
                setComponent: setFixedPosition,
              })
            }
            className={`${classes.ico} ${classes.closeIco}`}
          >
            <CloseOutlinedIcon fontSize="small" />
          </div>
        )}
      </div>
      <IngredientSuggestions
        setInputValues={setInputValues}
        suggestions={suggestions}
        handleNavigation={handleNavigation}
        inputActive={searchState}
        searchCriteria={searchCriteria}
        inputRef={inputRef}
        setInputState={{
          setCondition: setSearchState,
          setComponent: setFixedPosition,
        }}
      />
    </div>
  );
}
