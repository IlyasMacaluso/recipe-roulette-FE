import { Switch } from "../Switch/Switch"
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes"
import { filterChipsArray } from "../../assets/arrays/filterChipsArray.js"

import CloseIcon from "@mui/icons-material/Close"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"

import { Button } from "../Buttons/Button/Button"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { useLocation } from "@tanstack/react-router"

import classes from "../Sidebar/Sidebar.module.scss"

export function SideBarRecipes({ state, toggleSidebarRecipes }) {
    const { handleRecipeFilters, recipeFilters, handleDeselectRecipeFilters, setRecipeFilters } = useRecipesContext()
    const { cuisineEthnicityChips, difficultyChips, prepTimeChips, caloricApportChips } = filterChipsArray()
    const location = useLocation()

    function handleSidebarClick(e) {
        e.stopPropagation()
    }

    if (location.pathname === "/favorited" || location.pathname === "/history") {
        return (
            <>
                <div
                    onClick={toggleSidebarRecipes}
                    className={`${classes.backgroundOverlay} ${state && classes.backgroundOverlayToggled}`}
                ></div>
                <div className={`${classes.sidebar} ${state && classes.sidebarToggled}`} onClick={handleSidebarClick}>
                    <header>
                        <h2>Filters</h2>
                        <div className={classes.rightItems}>
                            <Button
                                label="Reset All"
                                action={() => {
                                    handleDeselectRecipeFilters({ filters: "recipeFilters", setFilters: setRecipeFilters })
                                }}
                                iconLeft={<RotateLeftOutlinedIcon className={classes.ico} fontSize="small" />}
                            />
                            <IcoButton action={toggleSidebarRecipes} style="transparent" icon={<CloseIcon fontSize="small" />} />
                        </div>
                    </header>

                    <section className={classes.sidebarBody}>
                        
                        <div className={classes.section}>
                            <h4>Preparation Time</h4>
                            <div className={classes.filterChipWrapper}>
                                {
                                    // prepTime chips =====================================================================
                                    prepTimeChips &&
                                        prepTimeChips.map((chip, index) => {
                                            return (
                                                <FilterChipRecipes
                                                    key={index}
                                                    filters="recipeFilters"
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
                                    state={recipeFilters.is_gluten_free}
                                    action={() => {
                                        handleRecipeFilters({
                                            filters: "recipeFilters", // preferences (used to generate recipes) / filters (used to filter recipe arrays)
                                            setFilters: setRecipeFilters,
                                            propToUpdate: "is_gluten_free",
                                        })
                                    }}
                                    label={"Gluten free"}
                                />
                                <Switch
                                    state={recipeFilters.is_vegetarian}
                                    action={() => {
                                        handleRecipeFilters({
                                            filters: "recipeFilters", // preferences (used to generate recipes) / filters (used to filter recipe arrays)
                                            setFilters: setRecipeFilters,
                                            propToUpdate: "is_vegetarian",
                                        })
                                    }}
                                    label={"Vegetarian"}
                                />
                                <Switch
                                    state={recipeFilters.is_vegan}
                                    action={() => {
                                        handleRecipeFilters({
                                            filters: "recipeFilters", // preferences (used to generate recipes) / filters (used to filter recipe arrays)
                                            setFilters: setRecipeFilters,
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
                                                    key={index}
                                                    filters="recipeFilters"
                                                    filterType={"cuisineEthnicity"}
                                                    propValue={chip.propValue}
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
                                                    key={index}
                                                    filters="recipeFilters"
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
                                                    key={index}
                                                    filters="recipeFilters"
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
                </div>
            </>
        )
    }
}
