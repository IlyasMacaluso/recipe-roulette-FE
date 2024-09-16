import { useEffect } from "react"
import { useLocation } from "@tanstack/react-router"
import { Sidebar } from "../../../components/Sidebar/Sidebar"
import { useRecipesContext } from "../../../contexts/RecipesContext"

import layout from "../../../assets/scss/pageLayout/pageFH.module.scss"
import styles from "./FoodPreferences.module.scss"
import { useManageIngredients } from "../../Roulette/IngredientsContext"

export function FoodPreferences() {
    const { discardPrefChanges, setDiscardChanges, recipePreferences } = useRecipesContext()
    const { discardBLChanges, setDiscardBLChanges, ingredients } = useManageIngredients()
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname === "/settings/food-preferences") {
            console.log("hello")
            setDiscardChanges(recipePreferences)
            setDiscardBLChanges(ingredients.blacklisted)
        }
    }, [pathname])

    return (
        <div className={`${layout.pageFH}  ${layout.noPadding} ${styles.body}`}>
            <Sidebar
                discardPrefChanges={discardPrefChanges}
                discardBLChanges={discardBLChanges}
                showBlacklist={true}
                positionUnfixed={true}
                removeBgOverlay={true}
                filtersName="recipePreferences"
                sidebarState={true}
            />
        </div>
    )
}
