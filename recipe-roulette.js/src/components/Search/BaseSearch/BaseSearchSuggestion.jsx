import classes from "./BaseSearchSuggestion.module.scss"

export function BaseSearchSuggestion({ inputRef = null, handleBlur = null, title = "", setInputValue, setState }) {
    
    function handleSuggestionClick(e) {
        e.preventDefault()
        e.stopPropagation()
        setInputValue(title)
    }

    return (
        <div
            onMouseDown={(e) => {
                handleSuggestionClick(e)
                handleBlur(inputRef, setState)
            }}
            className={classes.suggestion}
        >
            <p>{title}</p>
        </div>
    )
}
