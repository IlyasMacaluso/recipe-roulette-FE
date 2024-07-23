import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import CachedIcon from "@mui/icons-material/Cached"

import classes from "./InlineMessage.module.scss"

export function InlineMessage({ error = null, loading = false }) {
    
    return (
        <>
            {error && (
                <div className={`${classes.inlineMsg} ${classes.red}`}>
                    <ErrorOutlineIcon fontSize="small" />
                    {error.message}
                </div>
            )}
            {loading && (
                <div className={classes.inlineMsg}>
                    {<CachedIcon fontSize="small" />}
                    Loading...
                </div>
            )}
        </>
    )
}
