import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import CachedIcon from "@mui/icons-material/Cached"
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import classes from "./InlineMessage.module.scss"

export function InlineMessage({ error = null, loading = false, message = null }) {
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
            {message && (
                <div className={`${classes.inlineMsg}`}>
                    {<InfoOutlinedIcon fontSize="small" />}
                    {message.message}
                </div>
            )}
        </>
    )
}
