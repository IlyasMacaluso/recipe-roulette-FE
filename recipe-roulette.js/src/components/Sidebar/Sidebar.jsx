import { useMemo } from "react"
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext"
import { FilterChip } from "../FilterChip/FilterChip"
import { Switch } from "../Switch/Switch"
import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { Button } from "../Buttons/Button/Button"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { filterChipsArray } from "../../assets/arrays/filterChipsArray.js"
import { InlineMessage } from "../InlineMessage/InlineMessage.jsx"

import CloseIcon from "@mui/icons-material/Close"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"

import { useNavigate } from "@tanstack/react-router"
import { Snackbar } from "../Snackbar/Snackbar.jsx"
import { useSnackbar } from "../Snackbar/useSnackbar.jsx"
import { useLocationHook } from "../../hooks/useLocationHook.jsx"
import { useAnimate } from "../../hooks/animatePages/useAnimate.jsx"

import classes from "./Sidebar.module.scss"
import animation from "../../assets/scss/pageLayout/pageTransition.module.scss"
import { Skeleton } from "@mui/material"
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider.jsx"
import { useAuth } from "../../hooks/Auth/useAuth.jsx"

export function Sidebar({
    removeBgOverlay = false,
    positionUnfixed = false,
    showBlacklist = false,

    discardPrefChanges = null,
    discardBLChanges = null,
    filtersName = "recipeFilters",
    sidebarState = null,
}) {
    const {
        deselectIngredients,
        ingredients,
        blacklistedLoading,
        updateDBBlacklist,
        blacklistUpdateErr,
        blacklistUpdateLoading,
        setIngredients,
    } = useManageIngredients()

    const {
        updateFilters,
        updateDBFilters,
        deselectFilters,
        setRecipeFilters,
        setRecipePreferences,
        recipeFilters,
        recipePreferences,
        preferencesUpdateLoading,
        preferencesUpdateError,
    } = useRecipesContext()

    const { cuisineEthnicityChips, difficultyChips, prepTimeChips, caloricApportChips } = filterChipsArray()
    const { setFilterSidebar, setPrefSidebar, prefSidebar, filterSidebar } = useSidebar()
    const { handleOpenSnackbar } = useSnackbar()
    const { isAuthenticated } = useAuth()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    const navigate = useNavigate()

    const filters = useMemo(() => {
        if (filtersName === "recipeFilters") {
            return recipeFilters
        } else {
            return recipePreferences
        }
    }, [filtersName, recipeFilters, recipePreferences])

    const setFilters = filtersName === "recipeFilters" ? setRecipeFilters : setRecipePreferences

    !sidebarState && (sidebarState = filtersName === "recipeFilters" ? filterSidebar : prefSidebar)
    const setSidebarState = filtersName === "recipeFilters" ? setFilterSidebar : setPrefSidebar

    return (
        <>
            <div
                onClick={() => setSidebarState(false)}
                className={`${classes.backgroundOverlay} ${removeBgOverlay && classes.removeBgOverlay} ${sidebarState && classes.backgroundOverlayToggled}`}
            ></div>
            <div
                className={`
                    ${positionUnfixed ? (animate ? animation.animationEnd : animation.animationStart) : null}
                    ${classes.sidebar} ${positionUnfixed && classes.noOutline} ${positionUnfixed && classes.positionUnfixed} ${sidebarState && classes.sidebarToggled}`}
            >
                {!positionUnfixed && (
                    <header>
                        <h2>{filtersName === "recipeFilters" ? "Filters" : "Preferences"}</h2>
                        <div className={classes.rightItems}>
                            <Button
                                label="Reset All"
                                iconLeft={<RotateLeftOutlinedIcon fontSize="small" />}
                                size={18}
                                action={() => {
                                    deselectFilters({ filters: filtersName, setFilters: setFilters })
                                    deselectIngredients("is_blacklisted")
                                }}
                            />
                            <IcoButton action={() => setSidebarState(false)} style="transparent" icon={<CloseIcon fontSize="small" />} />
                        </div>
                    </header>
                )}

                <section className={classes.sidebarBody}>
                    {positionUnfixed && (
                        <div className={`${classes.section} ${classes.rowSection}`}>
                            <InlineMessage
                                message={
                                    "Preferences you set here will be used as defaults. You can temporarily change preferences before generating a recipe"
                                }
                            />
                        </div>
                    )}

                    {showBlacklist && (
                        <div className={classes.blackListedWrapper}>
                            <h4>Blacklist ingredients</h4>
                            <div className={classes.blackListed}>
                                <IngredientSearch searchCriteria="is_blacklisted" sidebarState={sidebarState} />
                                {/* // blacklisted ingredients ===================================================================== */}

                                {blacklistedLoading && (
                                    // loading skeleton
                                    <div className={classes.filterChipWrapper}>
                                        {[...Array(3)].map(() => (
                                            <Skeleton
                                                className={classes.skeleton}
                                                key={Math.random()}
                                                sx={{ bgcolor: "#c5e4c9" }}
                                                variant="rounded"
                                                width={"25%"}
                                                height={"32px"}
                                            />
                                        ))}
                                    </div>
                                )}
                                {!blacklistedLoading && ingredients?.blacklisted && ingredients?.blacklisted.length > 0 && (
                                    // blacklisted ingredients
                                    <div className={classes.filterChipWrapper}>
                                        {ingredients?.blacklisted.map((ing) => {
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
                                )}
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
                                    updateFilters({
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
                                    updateFilters({
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
                                    updateFilters({
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

                {
                    //footer visible only in FoodPreferences
                    positionUnfixed && (
                        <footer className={classes.footer}>
                            {(preferencesUpdateLoading || blacklistUpdateLoading || blacklistUpdateErr || preferencesUpdateError) && (
                                <InlineMessage
                                    loading={preferencesUpdateLoading || blacklistUpdateLoading}
                                    error={preferencesUpdateError || blacklistUpdateErr}
                                />
                            )}

                            <div className={classes.buttonsWrapper}>
                                <Button
                                    label="Discard"
                                    iconLeft={<DeleteOutlineOutlinedIcon fontSize="small" />}
                                    action={() => {
                                        setRecipePreferences(discardPrefChanges)
                                        setIngredients((prev) => {
                                            const blIDs = discardBLChanges?.map((ing) => ing.id)
                                            return {
                                                ...prev,
                                                all: prev.all?.map((ing) => ({
                                                    ...ing,
                                                    is_blacklisted: blIDs?.some((id) => id === ing.id),
                                                })),
                                                blacklisted: discardBLChanges,
                                            }
                                        })

                                        handleOpenSnackbar("Changes were discarded", 1500)
                                        navigate({ to: "/settings" })
                                    }}
                                />
                                <Button
                                    label="Save"
                                    iconLeft={<DoneAllOutlinedIcon fontSize="small" />}
                                    style="primary"
                                    action={() => {
                                        updateDBFilters()
                                        updateDBBlacklist()

                                        const intervalId = setInterval(() => {
                                            if (
                                                (!preferencesUpdateLoading && !preferencesUpdateError && !blacklistUpdateErr,
                                                !blacklistUpdateLoading)
                                            ) {
                                                navigate({ to: "/settings" })
                                                clearInterval(intervalId)

                                                if (isAuthenticated) {
                                                    handleOpenSnackbar("Your preferences were successfully updated", 2000)
                                                } else {
                                                    handleOpenSnackbar("Preferences updated for this session. Login to save changes", 3500)
                                                }
                                            }
                                        }, 350) // Controllo ogni 350ms (c'è il debounce di 300)
                                    }}
                                />
                            </div>
                        </footer>
                    )
                }
            </div>
        </>
    )
}
