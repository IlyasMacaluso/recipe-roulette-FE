import { useLocation, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import classes from "./Header.module.scss"
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function Header({
    pageTitle = "Welcome!",
    path,
    itemsLeft = [{ item: null, itemFn: null }],
    itemsRight = [{ item: null, itemFn: null }],
    itemsBottom = null,
}) {
    const navigate = useNavigate()
    const location = useLocation()
    const { setNavSidebar } = useSidebar()
    const { setRecipes } = useRecipesContext()

    useEffect(() => {
        if (location.pathname === "/recipe") {
            try {
                const { targetedRecipe } = JSON.parse(localStorage.getItem("recipes"))
                if (targetedRecipe) {
                    setRecipes((prev) => {
                        return {
                            ...prev,
                            targetedRecipe: targetedRecipe,
                        }
                    })
                    pageTitle = targetedRecipe.title
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    return (
        <header className={classes.header}>
            <div className={classes.topItems}>
                <div className={classes.itemsLeft}>
                    {itemsLeft[0].item &&
                        itemsLeft?.map((itemLeft, index) => {
                            return (
                                <div key={index} onClick={itemLeft?.itemFn} className={classes.icoWrapper}>
                                    {itemLeft.item}
                                </div>
                            )
                        })}

                    <h1>{pageTitle}</h1>
                </div>

                <div className={classes.itemsRight}>
                    {itemsRight[0].item &&
                        itemsRight?.map((itemRight, index) => {
                            return (
                                <div key={index} onClick={itemRight.itemFn} className={classes.icoWrapper}>
                                    {itemRight.item}
                                </div>
                            )
                        })}

                    <div onClick={() => setNavSidebar((b) => !b)} className={classes.icoWrapper}>
                        <MenuOpenIcon />
                    </div>
                </div>
            </div>

            {itemsBottom && <div className={classes.itemsBottom}>{itemsBottom?.map((item) => item)}</div>}
        </header>
    )
}
