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

export function Sidebar({ sidebarState = false, handleSidebarToggle }) {
    const { handleDeselectAll, ingredients } = useManageIngredients()
    const { handleRecipeFilters, recipePreferences, handleDeselectRecipeFilters, setRecipePreferences } = useRecipesContext()
    const { cuisineEthnicityChips, difficultyChips, prepTimeChips, caloricApportChips } = filterChipsArray()
    const location = useLocation()

    if (location.pathname === "/roulette") {
        return (
            <>
                <div
                    onClick={handleSidebarToggle}
                    className={`${classes.backgroundOverlay} ${sidebarState && classes.backgroundOverlayToggled}`}
                ></div>
                <div className={`${classes.sidebar} ${sidebarState && classes.sidebarToggled}`}>
                    <header>
                        <h2>Filters</h2>
                        <div className={classes.rightItems}>
                            <Button
                                label="Reset All"
                                iconLeft={<RotateLeftOutlinedIcon fontSize="small" />}
                                size={18}
                                action={() => {
                                    handleDeselectRecipeFilters({ filters: "recipePreferences", setFilters: setRecipePreferences })
                                    handleDeselectAll("is_blacklisted")
                                }}
                            />
                            <IcoButton action={handleSidebarToggle} style="transparent" icon={<CloseIcon fontSize="small" />} />
                        </div>
                    </header>
                    <section className={classes.sidebarBody}>
                        <div className={classes.blackListedWrapper}>
                            <h4>Add ingredeints to black list</h4>
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

                        <div className={classes.section}>
                            <h4>Preferences</h4>
                            <div className={classes.switchesWrapper}>
                                <Switch
                                    state={recipePreferences.is_gluten_free}
                                    action={() => {
                                        handleRecipeFilters({
                                            filters: "recipePreferences",
                                            setFilters: setRecipePreferences,
                                            propToUpdate: "is_gluten_free",
                                        })
                                    }}
                                    label={"Gluten free"}
                                />

                                <Switch
                                    state={recipePreferences.is_vegetarian}
                                    action={() => {
                                        handleRecipeFilters({
                                            filters: "recipePreferences",
                                            setFilters: setRecipePreferences,
                                            propToUpdate: "is_vegetarian",
                                        })
                                    }}
                                    label={"Vegetarian"}
                                />

                                <Switch
                                    state={recipePreferences.is_vegan}
                                    action={() => {
                                        handleRecipeFilters({
                                            filters: "recipePreferences",
                                            setFilters: setRecipePreferences,
                                            propToUpdate: "is_vegan",
                                        })
                                    }}
                                    label={"Vegan"}
                                />
                            </div>
                        </div>

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
                            <h4>Cousine Etnicity</h4>
                            <div className={classes.filterChipWrapper}>
                                {
                                    // cuisineEthnicity chips =====================================================================
                                    cuisineEthnicityChips &&
                                        cuisineEthnicityChips.map((chip, index) => {
                                            return (
                                                <FilterChipRecipes
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
}
