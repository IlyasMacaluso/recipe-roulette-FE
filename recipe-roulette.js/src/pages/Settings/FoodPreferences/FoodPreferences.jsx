import { useEffect } from "react"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { Sidebar } from "../../../components/Sidebar/Sidebar"
import { useRecipesContext } from "../../../contexts/RecipesContext"

import layout from "../../../assets/scss/pageLayout/pageFH.module.scss"
import styles from "./FoodPreferences.module.scss"
import { useManageIngredients } from "../../Roulette/IngredientsContext"
import { Header } from "../../../components/Header/Header"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import { Button } from "../../../components/Buttons/Button/Button"

export function FoodPreferences() {
    const { discardPrefChanges, setDiscardChanges, recipePreferences, deselectFilters, setRecipePreferences } = useRecipesContext()
    const { discardBLChanges, setDiscardBLChanges, ingredients, deselectIngredients } = useManageIngredients()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname === "/settings/food-preferences") {
            console.log("hello")
            setDiscardChanges(recipePreferences)
            setDiscardBLChanges(ingredients.blacklisted)
        }
    }, [pathname])

    return (
        <div className={`${layout.pageFH}  ${layout.noPadding} ${styles.body}`}>
            <Header
                rightIcons={[
                    {
                        icon: (
                            <Button
                                label="Reset All"
                                action={() => {
                                    deselectFilters({ filters: "recipePreferences", setFilters: setRecipePreferences })
                                    deselectIngredients("is_blacklisted")
                                }}
                                iconLeft={<RotateLeftIcon fontSize="small" />}
                            />
                        ),
                    },
                ]}
                leftIcons={[{ icon: <ArrowBackIcon fontSize="small" />, iconFn: () => navigate({ to: "/settings" }) }]}
                pageTitle="Food Preferences"
            />
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
