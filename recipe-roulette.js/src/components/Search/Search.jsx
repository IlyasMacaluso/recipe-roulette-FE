import { MaterialSymbol } from "react-material-symbols"
import classes from "./Search.module.scss"
import { useSearch } from "./useSearch"
import { SearchSuggestions } from "./SearchSuggestions"

export function Search({searchCriteria = "isBlackListed"}) {
    const {
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handleSuggestionClick,
        handlePressEnter,
        handleXClick,
        handleReset,
        inputValues,
        searchState,
        suggestions,
    } = useSearch()

    return (
        <div className={classes.search}>
            <div
                className={`${classes.searchBar} ${searchState.inputActive ? classes.inputActive : classes.inputInactive}`}
            >
                <input
                    className={classes.header}
                    onClick={handleInputActivation}
                    placeholder="Search an ingredient"
                    name="search"
                    type="text"
                    onBlur={(e) =>
                        setTimeout(() => {
                            handleInputDeactivation(e)
                        }, 25)
                    }
                    onKeyDown={handlePressEnter}
                    onChange={handleInputChange}
                    value={inputValues.current}
                />
                {!searchState.inputActive && (
                    <MaterialSymbol
                        className={`${classes.ico} ${classes.searchIco}`}
                        icon="search"
                        weight={400}
                        size={18}
                        grade={18}
                    />
                )}

                {searchState.inputActive && (
                    <MaterialSymbol
                        onClick={(e) => handleXClick(e)}
                        className={`${classes.ico} ${classes.closeIco}`}
                        icon="close"
                        weight={400}
                        size={18}
                        grade={18}
                    />
                )}
            </div>
            <SearchSuggestions
                inputActive={searchState.inputActive}
                searchCriteria={searchCriteria}
            />
        </div>
    )
}
