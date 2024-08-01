import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import CachedIcon from "@mui/icons-material/Cached"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

import classes from "./InlineMessage.module.scss"

export function InlineMessage({ error = false, loading = false, message = null, loadingMessage = "Loading..." }) {
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
                    {loadingMessage}
                </div>
            )}
            {message && (
                <div className={`${classes.inlineMsg}`}>
                    {<InfoOutlinedIcon fontSize="small" />}
                    {message}
                </div>
            )}
        </>
    )
}
