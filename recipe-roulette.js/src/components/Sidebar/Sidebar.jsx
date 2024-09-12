import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"
import { FilterChip } from "../FilterChip/FilterChip"
import { Switch } from "../Switch/Switch"
import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { Button } from "../Buttons/Button/Button"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocation } from "@tanstack/react-router"
import { filterChipsArray } from "../../assets/arrays/filterChipsArray.js"

import CloseIcon from "@mui/icons-material/Close"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"

import classes from "./Sidebar.module.scss"
import { useMemo } from "react"
import { InlineMessage } from "../InlineMessage/InlineMessage.jsx"

export function Sidebar({
    removeBgOverlay = false,
    positionUnfixed = false,

    filtersName = "recipeFilters",

    showBlacklist = false,

    sidebarState = false,
    setSidebarState,
}) {
    const { handleDeselectAll, ingredients } = useManageIngredients()
    const { handleRecipeFilters, handleDeselectRecipeFilters, setRecipeFilters, setRecipePreferences, recipeFilters, recipePreferences } =
        useRecipesContext()
    const { cuisineEthnicityChips, difficultyChips, prepTimeChips, caloricApportChips } = filterChipsArray()
    const location = useLocation()

    const filters = useMemo(() => {
        if (filtersName === "recipeFilters") {
            return recipeFilters
        } else {
            return recipePreferences
        }
    }, [filtersName, recipeFilters, recipePreferences])

    const setFilters = filtersName === "recipeFilters" ? setRecipeFilters : setRecipePreferences

    if (filtersName === "recipePreferences" && location.pathname !== "/roulette" && location.pathname !== "/settings/food-preferences") {
        return
    }

    if (filtersName === "recipeFilters" && location.pathname === "/roulette") {
        return
    }

    if (
        location.pathname !== "/favorited" &&
        location.pathname !== "/history" &&
        location.pathname !== "/roulette" &&
        location.pathname !== "/settings/food-preferences"
    ) {
        return
    }

    return (
        <>
            <div
                onClick={setSidebarState}
                className={`${classes.backgroundOverlay} ${removeBgOverlay && classes.removeBgOverlay} ${sidebarState && classes.backgroundOverlayToggled}`}
            ></div>
            <div className={`${classes.sidebar} ${positionUnfixed && classes.positionUnfixed} ${sidebarState && classes.sidebarToggled}`}>
                {!positionUnfixed && (
                    <header>
                        <h2>Filters</h2>
                        <div className={classes.rightItems}>
                            <Button
                                label="Reset All"
                                iconLeft={<RotateLeftOutlinedIcon fontSize="small" />}
                                size={18}
                                action={() => {
                                    handleDeselectRecipeFilters({ filters: filtersName, setFilters: setFilters })
                                    handleDeselectAll("is_blacklisted")
                                }}
                            />
                            <IcoButton action={setSidebarState} style="transparent" icon={<CloseIcon fontSize="small" />} />
                        </div>
                    </header>
                )}

                <section className={classes.sidebarBody}>
                    {positionUnfixed && (
                        <div className={classes.section}>
                            <InlineMessage
                                message={"Note: Preferences you set here will be used as defaults for all generated recipes"}
                            />
                        </div>
                    )}

                    {showBlacklist && (
                        <div className={classes.blackListedWrapper}>
                            <h4>Blacklist ingredients</h4>
                            <div className={classes.blackListed}>
                                <IngredientSearch searchCriteria="is_blacklisted" sidebarState={sidebarState} />
                                {
                                    // blacklisted ingredients =====================================================================
                                    ingredients?.blacklisted && ingredients?.blacklisted.length > 0 && (
                                        <div className={classes.filterChipWrapper}>
                                            {ingredients?.blacklisted
                                                // .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                                                .map((ing) => {
                                                    return (
                                                        <FilterChip
                                                            key={ing.id}
                                                            id={ing.id}
                                                            label={ing.name}
                                                            bg_color={ing.bg_color}
                                                            is_blacklisted={ing.is_blacklisted}
                                                            is_selected={ing.is_selected}
                                                        />
                                                    )
                                                })}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}

                    <div className={classes.section}>
                        <h4>Preparation Time</h4>
                        <div className={classes.filterChipWrapper}>
                            {
                                // prepTime chips =====================================================================
                                prepTimeChips &&
                                    prepTimeChips.map((chip, index) => {
                                        return (
                                            <FilterChipRecipes
                                                filters={filtersName}
                                                key={index}
                                                filterType={"preparationTime"}
                                                propValue={chip.propValue}
                                                label={chip.label}
                                            />
                                        )
                                    })
                            }
                        </div>
                    </div>

                    <div className={classes.section}>
                        <h4>Preferences</h4>
                        <div className={classes.switchesWrapper}>
                            <Switch
                                state={filters.is_gluten_free}
                                action={() => {
                                    handleRecipeFilters({
                                        filters: filtersName,
                                        setFilters: setFilters,
                                        propToUpdate: "is_gluten_free",
                                    })
                                }}
                                label={"Gluten free"}
                            />

                            <Switch
                                state={filters.is_vegetarian}
                                action={() => {
                                    handleRecipeFilters({
                                        filters: filtersName,
                                        setFilters: setFilters,
                                        propToUpdate: "is_vegetarian",
                                    })
                                }}
                                label={"Vegetarian"}
                            />

                            <Switch
                                state={filters.is_vegan}
                                action={() => {
                                    handleRecipeFilters({
                                        filters: filtersName,
                                        setFilters: setFilters,
                                        propToUpdate: "is_vegan",
                                    })
                                }}
                                label={"Vegan"}
                            />
                        </div>
                    </div>

                    <div className={classes.section}>
                        <h4>Cousine Etnicity</h4>
                        <div className={classes.filterChipWrapper}>
                            {
                                // cuisineEthnicity chips =====================================================================
                                cuisineEthnicityChips &&
                                    cuisineEthnicityChips.map((chip, index) => {
                                        return (
                                            <FilterChipRecipes
                                                filters={filtersName}
                                                key={index}
                                                propValue={chip.propValue}
                                                filterType={"cuisineEthnicity"}
                                                label={chip.label}
                                            />
                                        )
                                    })
                            }
                        </div>
                    </div>

                    <div className={classes.section}>
                        <h4>Caloric Apport</h4>
                        <div className={classes.filterChipWrapper}>
                            {
                                // caloricApport chips =====================================================================
                                caloricApportChips &&
                                    caloricApportChips.map((chip, index) => {
                                        return (
                                            <FilterChipRecipes
                                                filters={filtersName}
                                                key={index}
                                                propValue={chip.propValue}
                                                filterType={"caloricApport"}
                                                label={chip.label}
                                            />
                                        )
                                    })
                            }
                        </div>
                    </div>

                    <div className={classes.section}>
                        <h4>Difficulty</h4>
                        <div className={classes.filterChipWrapper}>
                            {
                                // recipe difficulty chips =====================================================================
                                difficultyChips &&
                                    difficultyChips.map((chip, index) => {
                                        return (
                                            <FilterChipRecipes
                                                filters={filtersName}
                                                key={index}
                                                propValue={chip.propValue}
                                                filterType={"difficulty"}
                                                label={chip.label}
                                            />
                                        )
                                    })
                            }
                        </div>
                    </div>
                </section>
                <footer></footer>
            </div>
        </>
    )
}
