import { useLocation, useNavigate } from "@tanstack/react-router"
import { useState, useEffect, useMemo } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import LockResetIcon from "@mui/icons-material/LockReset"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import FilterListIcon from "@mui/icons-material/FilterList"

import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"
import { BaseSearch } from "../Search/BaseSearch/BaseSearch"

import classes from "./Header.module.scss"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Button } from "../Buttons/Button/Button"
import { RotateLeftOutlined } from "@mui/icons-material"

export function Header({ handleMenuToggle, setPreferencesSidebar, handleRecipesSidebarToggle }) {
    const [title, setTitle] = useState("/")
    const { recipes, setRecipes, setInputValue, inputValue, recipeFilters } = useRecipesContext()
    const { deselectIngredients } = useManageIngredients()
    const { isAuthenticated } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setTitle("Welcome!")
                break
            case "/roulette":
                setTitle("Roulette")
                break
            case "/favorited":
                setTitle("Favorited")
                break
            case "/history":
                setTitle("History")
                break
            case "/settings":
                setTitle("Settings")
                break
            case "/preferences":
                setTitle("preferences")
                break
            case "/recipe-results":
                setTitle("Results")
                break
            case "/settings/food-preferences":
                setTitle("Food Preferences")
                break
            case "/recipe":
                if (recipes.targetedRecipe) {
                    setTitle(recipes.targetedRecipe.title)
                } else {
                    try {
                        const { targetedRecipe } = JSON.parse(localStorage.getItem("recipes"))
                        if (targetedRecipe) {
                            setTitle(targetedRecipe.title)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                break
            default:
                setTitle("Page not found")
                break
        }
    }, [location.pathname])

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
                    setTitle(targetedRecipe.title)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    const searchHistory = useMemo(() => {
        return recipes.filteredHistory.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filteredHistory, recipes.history, recipeFilters])

    const searchFavorites = useMemo(() => {
        return recipes.filteredFavorites.filter((rec) => rec.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [inputValue, recipes.filteredFavorites, recipes.favorited, recipeFilters])

    return (
        <header className={classes.header}>
            <div className={classes.topItem}>
                <div className={classes.leftItems}>
                    {location.pathname === "/recipes-results" ? (
                        <IcoButton link="/roulette" icon={<ArrowBackIcon fontSize="small" />} style="transparent" />
                    ) : null}
                    {location.pathname === "/recipe" ? (
                        <IcoButton
                            action={() => {
                                try {
                                    const path = localStorage.getItem("prevPath")
                                    navigate({ to: path || "/" })
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                            icon={<ArrowBackIcon fontSize="small" />}
                            style="transparent"
                        />
                    ) : null}
                    <h1>{title}</h1>
                </div>

                <IcoButton action={handleMenuToggle} icon={<MenuOpenIcon />} style="transparent" />
            </div>
            {location.pathname === "/favorited" && isAuthenticated && recipes?.favorited && recipes?.favorited.length > 0 && (
                <section className={classes.globalActions}>
                    <BaseSearch data={searchFavorites} inputValue={inputValue} setInputValue={setInputValue} />
                    <IcoButton action={handleRecipesSidebarToggle} label="Filters" icon={<FilterListIcon fontSize="small" />} />
                </section>
            )}
            {location.pathname === "/history" && isAuthenticated && recipes?.history && recipes?.history.length > 0 && (
                <section className={classes.globalActions}>
                    <BaseSearch data={searchHistory} inputValue={inputValue} setInputValue={setInputValue} />
                    <IcoButton action={handleRecipesSidebarToggle} label="Filters" icon={<FilterListIcon fontSize="small" />} />
                </section>
            )}

            {location.pathname === "/roulette" && (
                <div className={classes.globalActions}>
                    <IngredientSearch searchCriteria="is_selected" />
                    <IcoButton action={() => deselectIngredients("is_selected")} icon={<LockResetIcon fontSize={"small"} />} />
                    <IcoButton
                        action={() => setPreferencesSidebar && setPreferencesSidebar()}
                        icon={<FilterListIcon fontSize={"small"} />}
                    />
                </div>
            )}
        </header>
    )
}
