import { useEffect } from "react"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { useRecipesContext } from "../../../contexts/RecipesContext"
import { useManageIngredients } from "../../Roulette/IngredientsContext"

import { filterChipsArray } from "../../../assets/arrays/filterChipsArray.js"

import { Header } from "../../../components/Header/Header"
import { Skeleton } from "@mui/material"
import { Button } from "../../../components/Buttons/Button/Button"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"

import styles from "./FoodPreferences.module.scss"
import classes from "../../../components/Sidebar/Sidebar.module.scss"

import { useSnackbar } from "../../../components/Snackbar/useSnackbar.jsx"
import { useAuth } from "../../../hooks/Auth/useAuth.jsx"
import { InlineMessage } from "../../../components/InlineMessage/InlineMessage.jsx"
import { IngredientSearch } from "../../../components/Search/SearchBar/IngredientSearch.jsx"
import { FilterChipRecipes } from "../../../components/FilterChip/FilterChipRecipes.jsx"
import { Switch } from "../../../components/Switch/Switch.jsx"
import { FilterChip } from "../../../components/FilterChip/FilterChip.jsx"

export function FoodPreferences() {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const {
        discardBLChanges,
        setDiscardBLChanges,
        deselectIngredients,
        ingredients,
        blacklistedLoading,
        blacklistedError,
        updateDBBlacklist,
        blacklistUpdateErr,
        blacklistUpdateLoading,
        setIngredients,
    } = useManageIngredients()

    const {
        updateFilters,
        updateDBFilters,
        preferencesUpdateLoading,
        preferencesUpdateError,
        foodPrefError,
        discardPrefChanges,
        setDiscardChanges,
        recipePreferences,
        deselectFilters,
        setRecipePreferences,
    } = useRecipesContext()

    const { cuisineEthnicityChips, difficultyChips, prepTimeChips, caloricApportChips } = filterChipsArray()
    const { handleOpenSnackbar } = useSnackbar()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (pathname === "/settings/food-preferences") {
            setDiscardChanges(recipePreferences)
            setDiscardBLChanges(ingredients.blacklisted)
        }
    }, [pathname])

    return (
        <div className={`${styles.foodPrefPage}`}>
            <Header
                itemsBottom={[
                    <Button
                        label="Reset All"
                        action={() => {
                            deselectFilters({ filters: "recipePreferences", setFilters: setRecipePreferences })
                            deselectIngredients("is_blacklisted")
                        }}
                        iconLeft={<RotateLeftIcon fontSize="small" />}
                    />,
                ]}
                itemsLeft={[{ item: <ArrowBackIcon fontSize="small" />, itemFn: () => navigate({ to: "/settings" }) }]}
                pageTitle="Food Preferences"
            />

            <section className={styles.pageBody}>
                <div className={`${classes.section} ${classes.rowSection}`}>
                    <InlineMessage
                        message={
                            "Preferences you set here will be used as defaults. You can temporarily change preferences before generating a recipe"
                        }
                    />
                </div>

                {blacklistedError && <InlineMessage error={blacklistedError} />}
                <div className={styles.blacklistWrapper}>
                    <h4>Blacklist ingredients</h4>
                    <div className={styles.blacklist}>
                        <IngredientSearch searchCriteria="is_blacklisted" sidebarState={true} />
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

                {foodPrefError && <InlineMessage error={foodPrefError} />}

                <div className={styles.section}>
                    <h4>Preparation Time</h4>
                    <div className={classes.filterChipWrapper}>
                        {
                            // prepTime chips =====================================================================
                            prepTimeChips?.map((chip, index) => {
                                return (
                                    <FilterChipRecipes
                                        filters={"recipePreferences"}
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

                <div className={styles.section}>
                    <h4>Dietary preferences</h4>
                    <div className={styles.switchesWrapper}>
                        <Switch
                            state={recipePreferences.is_gluten_free}
                            action={() => {
                                updateFilters({
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
                                updateFilters({
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
                                updateFilters({
                                    filters: "recipePreferences",
                                    setFilters: setRecipePreferences,
                                    propToUpdate: "is_vegan",
                                })
                            }}
                            label={"Vegan"}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h4>Cousine Etnicity</h4>
                    <div className={classes.filterChipWrapper}>
                        {
                            // cuisineEthnicity chips =====================================================================
                            cuisineEthnicityChips &&
                                cuisineEthnicityChips.map((chip, index) => {
                                    return (
                                        <FilterChipRecipes
                                            filters={"recipePreferences"}
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

                <div className={styles.section}>
                    <h4>Caloric Apport</h4>
                    <div className={classes.filterChipWrapper}>
                        {
                            // caloricApport chips =====================================================================
                            caloricApportChips &&
                                caloricApportChips.map((chip, index) => {
                                    return (
                                        <FilterChipRecipes
                                            filters={"recipePreferences"}
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

                <div className={styles.section}>
                    <h4>Difficulty</h4>
                    <div className={classes.filterChipWrapper}>
                        {
                            // recipe difficulty chips =====================================================================
                            difficultyChips &&
                                difficultyChips.map((chip, index) => {
                                    return (
                                        <FilterChipRecipes
                                            filters={"recipePreferences"}
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

            <footer className={styles.footer}>
                {(preferencesUpdateLoading || blacklistUpdateLoading || blacklistUpdateErr || preferencesUpdateError) && (
                    <InlineMessage
                        loading={preferencesUpdateLoading || blacklistUpdateLoading}
                        error={preferencesUpdateError || blacklistUpdateErr}
                    />
                )}

                <div className={styles.buttonsWrapper}>
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
                                    (!preferencesUpdateLoading && !preferencesUpdateError && !blacklistUpdateErr, !blacklistUpdateLoading)
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
        </div>
    )
}
