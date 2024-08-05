import classes from "./Placeholder.module.scss"

export function Placeholder({
    highlightColor = null,
    topImage = null,
    bottomImage = null,
    text = "",
    hightlitedText = "",
    buttons = [],
    loadingAnimation = null,
    bottomPadding = null,
    topPadding = null,
    spaceBetween = null,
}) {
    return (
        <div
            className={`
                ${classes.mainContent}
                ${bottomPadding && classes.bottomPadding}
                ${topPadding && classes.topPadding}`}
        >
            <div className={`${classes.centerItems} ${spaceBetween && classes.spaceBetween}`}>
                {topImage && <img src={`../src/assets/images/${topImage}`} alt="" />}

                {loadingAnimation && loadingAnimation}

                {(text || hightlitedText) && (
                    <h2>
                        {text}
                        <span style={{ backgroundColor: highlightColor }}> {hightlitedText} </span>
                    </h2>
                )}

                {bottomImage && <img src={`../src/assets/images/${bottomImage}`} alt="" />}
            </div>

            <div className={classes.buttonsWrapper}>{buttons.length > 0 && buttons.map((button) => button)}</div>
        </div>
    )
}
