import { BaseSearchSuggestion } from "./BaseSearchSuggestion"

import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"

import classes from "./BaseSearch.module.scss"
import { useIngredientSearch } from "../SearchBar/useIngredientSearch"
import { useHandleBackButton } from "../../../hooks/useHandleBackBtn/useHandleBackBtn"
import { Placeholder } from "../../Placeholder/Placeholder"

export function BaseSearch({ data = [], inputValue = "", setInputValue }) {
    const { handlePressEnter, handleInputActivation, handleBlur, setSearchState, setFixedPosition, searchState } = useIngredientSearch()
    const { inputRef } = useHandleBackButton(searchState, setSearchState, setFixedPosition, handleBlur)

    return (
        <div className={`${classes.baseSearch} ${searchState && classes.baseSearchActive}`}>
            <div className={classes.searchBar}>
                <input
                    ref={inputRef}
                    autoComplete="off"
                    className={classes.input}
                    onKeyDown={(e) => handlePressEnter(e, inputRef, { setCondition: setSearchState, setComponent: setFixedPosition })}
                    onClick={handleInputActivation}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    type="text"
                    placeholder="Search a recipe"
                />
                <div
                    onMouseDown={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        if (searchState && inputValue !== "") {
                            setInputValue("")
                        } else if (searchState && inputValue === "") {
                            handleBlur(inputRef, { setCondition: setSearchState, setComponent: setFixedPosition })
                        } else if (!searchState && inputValue !== "") {
                            setInputValue("")
                        }
                    }}
                    className={classes.ico}
                >
                    {searchState || inputValue !== "" ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
                </div>
            </div>
            <div className={classes.suggestionsWrapper}>
                {data && data.length > 0 ? (
                    data.map((recipe) => (
                        <BaseSearchSuggestion
                            inputRef={inputRef}
                            key={recipe.id}
                            id={recipe.id}
                            handleBlur={handleBlur}
                            setInputValue={setInputValue}
                            setState={{ setCondition: setSearchState, setComponent: setFixedPosition }}
                            title={recipe.title}
                        />
                    ))
                ) : (
                    <Placeholder
                    bottomImage={"searching.svg"}
                    text="Your search has  "
                    hightlitedText="no matching results"
                    highlightColor="#dd3e46"
                    spacious={true}
                     />
                )}
            </div>
        </div>
    )
}
