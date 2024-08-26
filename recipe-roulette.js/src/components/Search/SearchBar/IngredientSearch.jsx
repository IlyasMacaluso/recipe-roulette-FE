import React from "react"
import { useIngredientSearch } from "./useIngredientSearch"
import { IngredientSuggestions } from "../Suggestions/IngredientSuggestions"
import { useHandleBackButton } from "../../../hooks/useHandleBackBtn/useHandleBackBtn"

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

import classes from "./IngredientSearch.module.scss"

export function IngredientSearch({searchCriteria = "is_blacklisted", sidebarState = false }) {
    const {
        suggestions,
        inputValues,
        searchState,
        fixedPosition,
        handlePressEnter,
        handleInputChange,
        handleInputActivation,
        handleBlur,
        setSearchState,
        setFixedPosition,
    } = useIngredientSearch(searchCriteria, sidebarState)
    
    const { inputRef } = useHandleBackButton(searchState, setSearchState, setFixedPosition, handleBlur)

    return (
        <div
            className={`${fixedPosition && classes.positionFixed} ${classes.search}`}
        >
            <div className={`${classes.searchBar} ${searchState ? classes.inputActive : classes.inputInactive}`}>
                <input
                    ref={inputRef}
                    autoComplete="off"
                    className={classes.header}
                    onClick={handleInputActivation}
                    placeholder={`${searchCriteria === "is_selected" ? "Add an ingredient" : "Blacklist an ingredient"}`}
                    name="search"
                    type="text"
                    onKeyUp={(e) => handlePressEnter(e, inputRef, { setCondition: setSearchState, setComponent: setFixedPosition })}
                    onChange={handleInputChange}
                    value={inputValues.current}
                />
                {!searchState && (
                    <div className={`${classes.ico} ${classes.searchIco}`}>
                        <SearchOutlinedIcon fontSize="small" />
                    </div>
                )}

                {searchState && (
                    <div
                        onClick={() => handleBlur(inputRef, { setCondition: setSearchState, setComponent: setFixedPosition })}
                        className={`${classes.ico} ${classes.closeIco}`}
                    >
                        <CloseOutlinedIcon fontSize="small" />
                    </div>
                )}
            </div>
            <IngredientSuggestions
                inputActive={searchState}
                searchCriteria={searchCriteria}
                suggestions={suggestions}
                inputRef={inputRef}
                setInputState={{ setCondition: setSearchState, setComponent: setFixedPosition }}
            />
        </div>
    )
}
