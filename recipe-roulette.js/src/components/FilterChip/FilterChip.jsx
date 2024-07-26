import { useFilterChips } from "./useFilterChip"

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"

import classes from "./FilterChip.module.scss"

export function FilterChip({ id, label, bg_color, is_selected, is_blacklisted }) {
    const { handleDeselectChip } = useFilterChips(id, label, bg_color, is_selected, is_blacklisted)

    return (
        <div
            className={`${classes.filterChip} ${is_selected || is_blacklisted ? classes.active : classes.inactive} ${is_blacklisted && classes.blacklisted}`}
            onClick={() => handleDeselectChip && handleDeselectChip()}
        >
            {is_selected && <CheckOutlinedIcon className={classes.ico} fontSize="18px" />}
            {is_blacklisted && <BlockOutlinedIcon className={classes.ico} fontSize="18px" />}
            <p className={classes.label}>{label}</p>
        </div>
    )
}
