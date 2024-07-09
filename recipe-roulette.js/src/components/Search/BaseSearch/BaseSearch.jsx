import { useCallback, useEffect, useRef } from "react"
import { BaseSearchSuggestion } from "./BaseSearchSuggestion"

import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"

import classes from "./BaseSearch.module.scss"
import { useIngredientSearch } from "../SearchBar/useIngredientSearch"

export function BaseSearch({ data = [], inputValue = "", setInputValue }) {
    const {
        handlePressEnter,
        setCondition,
        condition,
        handleInputActivation,
        handleBlur,
        setSearchState,
        setFixedPosition,
        searchState,
    } = useIngredientSearch(true)

    const inputRef = useRef(null)

    // Handle back button when fixedPosition is true
    const handleBackButton = useCallback(
        (event) => {
            if (searchState.inputActive) {
                event.preventDefault()
                setCondition(true)
                if (inputRef.current) {
                    handleBlur(inputRef, { setSearchState, setFixedPosition }) // Update the focus state
                }
            }
        },
        [searchState.inputActive]
    )

    useEffect(() => {
        if (searchState.inputActive && condition) {
            window.history.pushState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
            setCondition(false)
        } else if (searchState.inputActive) {
            window.history.replaceState(null, document.title, window.location.href)
            window.addEventListener("popstate", handleBackButton)
        } else {
            window.removeEventListener("popstate", handleBackButton)
        }

        return () => {
            window.removeEventListener("popstate", handleBackButton)
        }
    }, [searchState.inputActive, handleBackButton])

    return (
        <div className={`${classes.baseSearch} ${searchState.inputActive && classes.baseSearchActive}`}>
            <div className={classes.searchBar}>
                <input
                    ref={inputRef}
                    autoComplete="off"
                    className={classes.input}
                    onKeyDown={(e) => handlePressEnter(e, inputRef, { setSearchState, setFixedPosition })}
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
                        if (searchState.inputActive && inputValue !== "") {
                            setInputValue("")
                        } else if (searchState.inputActive && inputValue === "") {
                            handleBlur(inputRef, { setSearchState, setFixedPosition })
                        } else if (!searchState.inputActive && inputValue !== "") {
                            setInputValue("")
                        }
                    }}
                    className={classes.ico}
                >
                    {searchState.inputActive || inputValue !== "" ? (
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
                            key={recipe.id}
                            id={recipe.id}
                            handleBlur={handleBlur}
                            setInputValue={setInputValue}
                            setState={{ setSearchState, setFixedPosition }}
                            title={recipe.title}
                        />
                    ))
                ) : (
                    <div className={classes.placeholder}>
                        <h2>
                            There is <span>no recipe</span> <br />
                            matching your search!
                        </h2>
                        <div className={classes.placeholderImage}>
                            <img src="../src/assets/images/undraw_cancel_re_pkdm 1.svg" alt="" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
