import classes from "./Placeholder.module.scss"

export function Placeholder({
    highlightColor = null,
    topImage = null,
    bottomImage = null,
    text = "text",
    hightlitedText = "highligh",
    buttons = [],
    spacious = null,
    loadingAnimation = null,
}) {
    return (
        <div className={`${classes.mainContent} ${spacious && classes.spacious}`}>
            {topImage && <img src={`../src/assets/images/${topImage}`} alt="" />}

            {loadingAnimation && loadingAnimation}
            
            <h2>
                {text}
                <span style={{ backgroundColor: highlightColor }}> {hightlitedText} </span>
            </h2>

            {bottomImage && <img src={`../src/assets/images/${bottomImage}`} alt="" />}

            <div className={classes.buttonsWrapper}>{buttons.length > 0 && buttons.map((button) => button)}</div>
        </div>
    )
}
