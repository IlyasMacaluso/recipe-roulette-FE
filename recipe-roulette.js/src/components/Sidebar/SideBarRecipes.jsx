import { Switch } from "../Switch/Switch"
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes"

import CloseIcon from "@mui/icons-material/Close"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"

import { Button } from "../Buttons/Button/Button"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"

import classes from "../Sidebar/Sidebar.module.scss"
import { useLocation } from "@tanstack/react-router"

export function SideBarRecipes({ state, toggleSidebarRecipes }) {
    const { toggleRecipeFilter, recipeFilter, handleDeselectRecipeFilters } = useRecipesContext()
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
                                    handleDeselectRecipeFilters()
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
                                <FilterChipRecipes filterType={"preparationTime"} label="All" />
                                <FilterChipRecipes filterType={"preparationTime"} numericValue={30} label="30m or less" />
                                <FilterChipRecipes filterType={"preparationTime"} numericValue={45} label="45m or less" />
                                <FilterChipRecipes filterType={"preparationTime"} numericValue={60} label="60m or less" />
                            </div>
                        </div>

                        <div className={classes.section}>
                            <h4>Preferences</h4>
                            <div className={classes.switchesWrapper}>
                                <Switch
                                    state={recipeFilter.is_gluten_free}
                                    action={() => {
                                        toggleRecipeFilter("is_gluten_free")
                                    }}
                                    label={"Gluten free"}
                                />
                                <Switch
                                    state={recipeFilter.is_vegetarian}
                                    action={() => {
                                        toggleRecipeFilter("is_vegetarian")
                                    }}
                                    label={"Vegetarian"}
                                />
                                <Switch
                                    state={recipeFilter.is_vegan}
                                    action={() => {
                                        toggleRecipeFilter("is_vegan")
                                    }}
                                    label={"Vegan"}
                                />
                            </div>
                        </div>
                        <div className={classes.section}>
                            <h4>Cousine Etnicity</h4>
                            <div className={classes.filterChipWrapper}>
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="All" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Italian" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="French" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Chinese" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Japanese" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Indian" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Greek" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Spanish" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Mexican" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Thai" />
                                <FilterChipRecipes filterType={"cuisineEthnicity"} label="Middle Eastern" />
                            </div>
                        </div>
                        <div className={classes.section}>
                            <h4>Caloric Apport</h4>
                            <div className={classes.filterChipWrapper}>
                                <FilterChipRecipes filterType={"caloricApport"} label="All" />
                                <FilterChipRecipes numericValue={250} filterType={"caloricApport"} label="250 kcal or less" />
                                <FilterChipRecipes numericValue={350} filterType={"caloricApport"} label="350 kcal of less" />
                                <FilterChipRecipes numericValue={550} filterType={"caloricApport"} label="550 kcal or less" />
                            </div>
                        </div>

                        <div className={classes.section}>
                            <h4>Difficulty</h4>
                            <div className={classes.filterChipWrapper}>
                                <FilterChipRecipes numericValue={"all"} filterType={"difficulty"} label="All" />
                                <FilterChipRecipes numericValue={"easy"} filterType={"difficulty"} label="Easy" />
                                <FilterChipRecipes numericValue={"medium"} filterType={"difficulty"} label="Medium" />
                                <FilterChipRecipes numericValue={"hard"} filterType={"difficulty"} label="Hard" />
                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
}
