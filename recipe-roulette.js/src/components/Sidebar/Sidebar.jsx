import { useMemo } from "react";
import { useManageIngredients } from "../../pages/Roulette/IngredientsContext";
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider.jsx";
import { useRecipesContext } from "../../contexts/RecipesContext";

import { filterChipsArray } from "../../assets/arrays/filterChipsArray.js";

import { FilterChip } from "../FilterChip/FilterChip";
import { Switch } from "../Switch/Switch";
import { IngredientSearch } from "../Search/SearchBar/IngredientSearch";
import { Button } from "../Buttons/Button/Button";
import { IcoButton } from "../Buttons/IcoButton/IcoButton";
import { FilterChipRecipes } from "../FilterChip/FilterChipRecipes";
import { InlineMessage } from "../InlineMessage/InlineMessage.jsx";
import { Skeleton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";

import classes from "./Sidebar.module.scss";

export function Sidebar({
  showBlacklist = false,
  filtersName = "recipeFilters",
}) {
  const {
    deselectIngredients,
    ingredients,
    blacklistedLoading,
    blacklistedError,
  } = useManageIngredients();
  const {
    cuisineEthnicityChips,
    difficultyChips,
    prepTimeChips,
    caloricApportChips,
  } = filterChipsArray();
  const { setFilterSidebar, setPrefSidebar, prefSidebar, filterSidebar } =
    useSidebar();
  const {
    updateFilters,
    deselectFilters,
    setRecipeFilters,
    setRecipePreferences,
    recipeFilters,
    recipePreferences,
    foodPrefError,
  } = useRecipesContext();

  const filters = useMemo(() => {
    if (filtersName === "recipeFilters") {
      return recipeFilters;
    } else {
      return recipePreferences;
    }
  }, [filtersName, recipeFilters, recipePreferences]);

  const setFilters =
    filtersName === "recipeFilters" ? setRecipeFilters : setRecipePreferences;
  const setSidebarState =
    filtersName === "recipeFilters" ? setFilterSidebar : setPrefSidebar;
  const sidebarState =
    filtersName === "recipeFilters" ? filterSidebar : prefSidebar;

  return (
    <>
      <div
        onClick={() => setSidebarState(false)}
        className={`${classes.backgroundOverlay} ${sidebarState && classes.backgroundOverlayToggled}`}
      />

      <div
        className={`
                    ${classes.sidebar} ${sidebarState && classes.sidebarToggled}`}
      >
        <header>
          <div className={classes.contentWrapper}>
            <div className={classes.topItems}>
              <h2>
                {filtersName === "recipeFilters" ? "Filters" : "Preferences"}
              </h2>

              <div className={classes.itemsRight}>
                <IcoButton
                  action={() => setSidebarState(false)}
                  style="transparent"
                  icon={<CloseIcon fontSize="small" />}
                />
              </div>
            </div>

            <div className={classes.bottomItems}>
              <Button
                width="fill"
                label="Reset All"
                iconLeft={<RotateLeftOutlinedIcon fontSize="small" />}
                size={18}
                action={() => {
                  deselectFilters({
                    filters: filtersName,
                    setFilters: setFilters,
                  });
                  deselectIngredients("is_blacklisted");
                }}
              />
            </div>
          </div>
        </header>

        <section className={classes.sidebarBody}>
          {blacklistedError && (
            <div style={{ padding: "0 16px" }}>
              <InlineMessage error={blacklistedError} />
            </div>
          )}

          {
            // blacklisted ingredients
            showBlacklist && (
              <div className={classes.blackListedWrapper}>
                <h4>Blacklist ingredients</h4>
                <div className={classes.blackListed}>
                  <IngredientSearch
                    searchCriteria="is_blacklisted"
                    sidebarState={sidebarState}
                  />
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

                  {!blacklistedLoading &&
                    ingredients?.blacklisted?.length > 0 && (
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
                          );
                        })}
                      </div>
                    )}
                </div>
              </div>
            )
            //end of blacklisted ingredients
          }

          {foodPrefError && (
            <div style={{ padding: "0 16px" }}>
              <InlineMessage error={foodPrefError} />
            </div>
          )}

          <div className={classes.section}>
            <h4>Preparation Time</h4>
            <div className={classes.filterChipWrapper}>
              {
                // prep_time chips =====================================================================
                prepTimeChips?.map((chip, index) => {
                  return (
                    <FilterChipRecipes
                      filters={filtersName}
                      key={index}
                      filterType={"preparation_time"}
                      propValue={chip.propValue}
                      label={chip.label}
                    />
                  );
                })
              }
            </div>
          </div>

          <div className={classes.section}>
            <h4>Dietary preferences</h4>
            <div className={classes.switchesWrapper}>
              <Switch
                state={filters.is_gluten_free}
                action={() => {
                  updateFilters({
                    filters: filtersName,
                    setFilters: setFilters,
                    propToUpdate: "is_gluten_free",
                  });
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
                  });
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
                  });
                }}
                label={"Vegan"}
              />
            </div>
          </div>

          <div className={classes.section}>
            <h4>Cousine Etnicity</h4>
            <div className={classes.filterChipWrapper}>
              {
                // cuisine_ethnicity chips =====================================================================
                cuisineEthnicityChips?.map((chip, index) => {
                  return (
                    <FilterChipRecipes
                      filters={filtersName}
                      key={index}
                      propValue={chip.propValue}
                      filterType={"cuisine_ethnicity"}
                      label={chip.label}
                    />
                  );
                })
              }
            </div>
          </div>

          <div className={classes.section}>
            <h4>Caloric Apport</h4>
            <div className={classes.filterChipWrapper}>
              {
                // caloric_apport chips =====================================================================
                caloricApportChips?.map((chip, index) => {
                  return (
                    <FilterChipRecipes
                      filters={filtersName}
                      key={index}
                      propValue={chip.propValue}
                      filterType={"caloric_apport"}
                      label={chip.label}
                    />
                  );
                })
              }
            </div>
          </div>

          <div className={classes.section}>
            <h4>Difficulty</h4>
            <div className={classes.filterChipWrapper}>
              {
                // recipe difficulty chips =====================================================================
                difficultyChips?.map((chip, index) => {
                  return (
                    <FilterChipRecipes
                      filters={filtersName}
                      key={index}
                      propValue={chip.propValue}
                      filterType={"difficulty"}
                      label={chip.label}
                    />
                  );
                })
              }
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
