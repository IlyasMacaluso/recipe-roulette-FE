import { useLocation, useNavigate } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import TuneIcon from "@mui/icons-material/Tune"
import LockResetIcon from "@mui/icons-material/LockReset"
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"

import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"
import { BaseSearch } from "../Search/BaseSearch/BaseSearch"

import classes from "./Header.module.scss"
import { useAuth } from "../../hooks/Auth/useAuth"

export function Header({ handleMenuToggle, handleSidebarToggle, handleRecipesSidebarToggle }) {
    const [title, setTitle] = useState("/")
    const { recipes, setRecipes, setInputValue, inputValue } = useRecipesContext()
    const { handleDeselectAll } = useManageIngredients()
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
            case "/settings":
                setTitle("Settings")
                break
            case "/preferences":
                setTitle("preferences")
                break
            case "/recipe-results":
                setTitle("Results")
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

    return (
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && (
            <header className={classes.header}>
                <div className={classes.topItem}>
                    <div className={classes.leftItems}>
                        {location.pathname === "/recipes-results" ? (
                            <IcoButton navigateTo="/Roulette" icon={<ArrowBackIcon fontSize="small" />} style="transparent" />
                        ) : null}
                        {location.pathname === "/recipe" ? (
                            <IcoButton
                                action={() => {
                                    try {
                                        const path = localStorage.getItem("prevPath")
                                        if (path) {
                                            navigate({ to: path })
                                        } else {
                                            navigate({ to: "/" })
                                        }
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
                {location.pathname === "/favorited" && isAuthenticated && recipes.favorited.length > 0 && (
                    <section className={classes.globalActions}>
                        <BaseSearch data={recipes.searched} inputValue={inputValue} setInputValue={setInputValue} />
                        <IcoButton action={handleRecipesSidebarToggle} label="Filters" icon={<TuneOutlinedIcon fontSize="small" />} />
                    </section>
                )}
                {location.pathname === "/roulette" && (
                    <div className={classes.globalActions}>
                        <IngredientSearch searchCriteria="is_selected" />
                        <IcoButton action={() => handleDeselectAll("is_selected")} icon={<LockResetIcon fontSize={"medium"} />} />
                        <IcoButton action={() => handleSidebarToggle && handleSidebarToggle()} icon={<TuneIcon fontSize={"small"} />} />
                    </div>
                )}
            </header>
        )
    )
}
