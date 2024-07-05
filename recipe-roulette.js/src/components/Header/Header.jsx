import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import TuneIcon from "@mui/icons-material/Tune"
import LockResetIcon from "@mui/icons-material/LockReset"
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"

import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
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
            case "/discovery":
                setTitle("Roulette")
                break
            case "/favorited":
                setTitle("Favorited")
                break
            case "/settings":
                setTitle("Settings")
                break
            case "/food-preferences":
                setTitle("preferences")
                break
            case "/recipes-results":
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
                console.log(targetedRecipe)
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
                            <IcoButton navigateTo="/discovery" icon={<ArrowBackIcon fontSize="small" />} style="transparent" />
                        ) : null}
                        {location.pathname === "/recipe" ? (
                            <IcoButton
                                action={() => {
                                    try {
                                        const path = localStorage.getItem("prevPath")
                                        if (path) {
                                            navigate(path)
                                        } else {
                                            navigate("/")
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
                {/*                 {location.pathname === "/recipes-results" && (
                    <section className={classes.globalActions}>
                        <BaseSearch data={recipes.results} inputValue={inputValue} setInputValue={setInputValue} />
                        <IcoButton
                            action={handleRecipesSidebarToggle}
                            label="Filters"
                            icon={<TuneOutlinedIcon fontSize="small" />}
                        />
                    </section>
                )} */}
                {location.pathname === "/favorited" && isAuthenticated && recipes.favorited.length > 0 && (
                    <section className={classes.globalActions}>
                        <BaseSearch data={recipes.searched} inputValue={inputValue} setInputValue={setInputValue} />
                        <IcoButton
                            action={handleRecipesSidebarToggle}
                            label="Filters"
                            icon={<TuneOutlinedIcon fontSize="small" />}
                        />
                    </section>
                )}
                {location.pathname === "/discovery" && (
                    <div className={classes.globalActions}>
                        <IngredientSearch isFixed={true} searchCriteria="isSelected" />
                        <IcoButton action={() => handleDeselectAll("isSelected")} icon={<LockResetIcon fontSize={"medium"} />} />
                        <IcoButton action={() => handleSidebarToggle()} icon={<TuneIcon fontSize={"small"} />} />
                    </div>
                )}
            </header>
        )
    )
}
