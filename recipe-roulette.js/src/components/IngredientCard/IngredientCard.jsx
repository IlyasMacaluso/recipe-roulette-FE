import { useIngredientCard } from "./useIngredientCard"

import LockOpenIcon from "@mui/icons-material/LockOpen"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import CloseIcon from "@mui/icons-material/Close"

import classes from "./IngredientCard.module.scss"

export function IngredientCard({ ing }) {
    const { handleIngredientClick, handleXClick, cardState } = useIngredientCard(ing)
    const bg = {
        backgroundColor: cardState.bg_color,
    }
    return (
        <div
            onClick={handleIngredientClick}
            style={bg}
            className={`${classes.ingredientCard} ${cardState.is_selected ? classes.selected : classes.unselected}`}
        >
            <div className={classes.itemsLeft}>
                {!cardState.is_selected ? (
                    <LockOpenIcon className={classes.checkIco} />
                ) : (
                    <LockOutlinedIcon className={classes.checkIco} />
                )}
                <p>{ing.name}</p>
            </div>
            <div className={classes.itemsRight}>
                <CloseIcon onClick={(e) => handleXClick(e)} className={classes.rightIco} />
            </div>
        </div>
    )
}
