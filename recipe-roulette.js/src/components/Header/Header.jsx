import { useLocation, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import classes from "./Header.module.scss"
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function Header({
    pageTitle = "Welcome!",
    path,
    leftIcons = [{ icon: null, iconFn: null }],
    rightIcons = [{ icon: null, iconFn: null }],
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

    /*     const searchHistory = useMemo(() => {
        return recipes.filteredHistory.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filteredHistory, recipes.history, recipeFilters])

    const searchFavorites = useMemo(() => {
        return recipes.filteredFavorites.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filteredFavorites, recipes.favorited, recipeFilters]) */

    return (
        <header className={classes.header}>
            <div className={classes.leftItems}>
                {leftIcons[0].icon &&
                    leftIcons?.map((leftIcon, index) => {
                        return (
                            <div key={index} onClick={leftIcon?.iconFn} className={classes.icoWrapper}>
                                {leftIcon.icon}
                            </div>
                        )
                    })}

                <h1>{pageTitle}</h1>
            </div>

            <div className={classes.rightItems}>
                {rightIcons[0].icon &&
                    rightIcons?.map((rightIcon, index) => {
                        return (
                            <div key={index} onClick={rightIcon.iconFn} className={classes.icoWrapper}>
                                {rightIcon.icon}
                            </div>
                        )
                    })}
                    
                <div onClick={() => setNavSidebar((b) => !b)} className={classes.icoWrapper}>
                    <MenuOpenIcon />
                </div>
            </div>
        </header>
    )
}
