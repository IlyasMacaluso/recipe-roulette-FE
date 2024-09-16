import { useCenterItem } from "../../hooks/useCenterItem/useCenterItem"

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"

import classes from "./Input.module.scss"

export function Input({
    type = "text",
    id = null, // se c'è un "id", il click su label effettua il focus dell'input
    name = "Input name",
    label = null,
    placeholder = null,
    required = false,
    handleInputChange = null,
    showText = false,
    handleShowText = false,
    error = null,
    value = undefined,
    hasIcons = false,
}) {
    const { scrollToCenter, refs } = useCenterItem(1)

    return (
        <div className={`${type === "checkbox" ? classes.checkbox : classes.inputComponent}`}>
            {label && <label htmlFor={id}> {label} </label>}

            <div
                // input style
                className={`${type === "checkbox" ? classes.checkboxWrapper : classes.inputWrapper}`}
            >
                <input
                    // style to appy when there is an error
                    className={`${error && classes.inputError}`}
                    // settings
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    // input content
                    value={type !== "checkbox" ? value : undefined}
                    checked={type === "checkbox" ? value : null}
                    // ref & actions
                    ref={refs[0]}
                    onChange={(e) => handleInputChange && handleInputChange(e)}
                    onFocus={(e) => {
                        // refs[0].current = e.target
                        scrollToCenter(refs[0])
                    }}
                />

                {hasIcons && (
                    <div className={classes.inputIcons}>
                        {showText ? (
                            <VisibilityOffIcon onClick={handleShowText} className={classes.icon} fontSize="small" />
                        ) : (
                            <VisibilityIcon onClick={handleShowText} className={classes.icon} fontSize="small" />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
