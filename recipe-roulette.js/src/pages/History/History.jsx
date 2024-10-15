import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { useRecipesContext } from "../../contexts/RecipesContext";
import { useMemo, useState } from "react";
import { useAuth } from "../../hooks/Auth/useAuth";
import { Popup } from "../../components/Pop-up/Popup";
import { createPortal } from "react-dom";
import { Skeleton } from "@mui/material";
import { Placeholder } from "../../components/Placeholder/Placeholder";
import { Button } from "../../components/Buttons/Button/Button";
import { InlineMessage } from "../../components/InlineMessage/InlineMessage";

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import LoginIcon from "@mui/icons-material/Login";
import FilterListIcon from "@mui/icons-material/FilterList";

import loginImage from "../../assets/images/Mobile login-bro.svg";
import addNoteImage from "../../assets/images/Add notes-bro.svg";
import shrugImage from "../../assets/images/Shrug-bro.svg";

import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss";
import searchWrapper from "../../assets/scss/searchWrapper.module.scss";

import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton";
import { BaseSearch } from "../../components/Search/BaseSearch/BaseSearch";
import { Header } from "../../components/Header/Header";
import { useSidebar } from "../../contexts/SidebarProvider/SidebarProvider";
import { AuthenticationPopup } from "../../components/authentication/login/AuthenticationPopup";

export function History() {
  const [showPopup, setShowPopup] = useState();

  const {
    deselectFilters,
    recipes,
    setInputValue,
    historyLoading,
    favoritedLoading,
    foodPrefLoading,
    historyError,
    recipeFilters,
    inputValue,
    setRecipeFilters,
  } = useRecipesContext();
  const { isAuthenticated } = useAuth();
  const { setFilterSidebar } = useSidebar();

  const searchHistory = useMemo(() => {
    return recipes.filteredHistory.filter((rec) =>
      rec.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, recipes.filteredHistory, recipes.history, recipeFilters]);

  const skeletonStyle = useMemo(() => {
    return {
      bgcolor: "#f8fff8",
      border: "1px solid #d9e9dc",
      borderRadius: "16px",
    };
  }, []);

  if (historyError) {
    return (
      <div className={layout.scrollPage}>
        <Header pageTitle="History" />
        <InlineMessage error={historyError} />
        <Placeholder
          topImage={shrugImage}
          text="Oops >.< something went wrong!"
        />
      </div>
    );
  } else {
    return (
      <div className={layout.scrollPage}>
        <div style={{ paddingLeft: "8px", paddingRight: "8px" }}>
          <Header pageTitle="History" />

          {isAuthenticated &&
            recipes?.history &&
            recipes?.history.length > 0 && (
              <section className={searchWrapper.globalActions}>
                <BaseSearch
                  data={searchHistory}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <IcoButton
                  action={() => setFilterSidebar((b) => !b)}
                  label="Filters"
                  icon={<FilterListIcon fontSize="small" />}
                />
              </section>
            )}
        </div>

        {favoritedLoading || foodPrefLoading || historyLoading ? (
          <section className={layout.recipesWrapper}>
            {[...Array(3)].map(() => (
              <Skeleton
                key={Math.random()}
                sx={skeletonStyle}
                variant="rounded"
                width={"100%"}
                height={"280px"}
              />
            ))}
          </section>
        ) : isAuthenticated && recipes?.history.length > 0 ? (
          <>
            {searchHistory && searchHistory.length > 0 ? (
              <section className={layout.recipesWrapper}>
                {searchHistory.map((recipe) => (
                  <RecipeCard
                    recipe={recipe}
                    key={`${recipe.recipe_id}_${recipe.title}`}
                  />
                ))}
              </section>
            ) : (
              <Placeholder
                text="Your search has  "
                hightlitedText="no matching results"
                bottomImage={shrugImage}
                bottomPadding={true}
                buttons={[
                  <Button
                    iconLeft={<RotateLeftOutlinedIcon fontSize="small" />}
                    cta={true}
                    label="Reset Search"
                    key="Reset Search"
                    action={() => {
                      deselectFilters({
                        filters: "recipeFilters",
                        setFilters: setRecipeFilters,
                      });
                      setInputValue("");
                    }}
                  />,
                ]}
              />
            )}
          </>
        ) : isAuthenticated ? (
          <Placeholder
            text="Your History is empty! "
            hightlitedText=" Recipes will be stored here!"
            topImage={addNoteImage}
            bottomPadding={true}
            buttons={[
              <Button
                style="primary"
                key="Start Ingredients Shuffle"
                link="roulette"
                label="Start Ingredients Shuffle"
                iconLeft={<LoopOutlinedIcon />}
                cta={true}
              />,
            ]}
          />
        ) : (
          <>
            <Placeholder
              text="You need to login "
              hightlitedText="To see your History!"
              topImage={loginImage}
              bottomPadding={true}
              buttons={[
                <Button
                  key={"Login or Signup"}
                  action={() => setShowPopup(true)}
                  style="primary"
                  label="Login"
                  iconLeft={<LoginIcon fontSize="small" />}
                  cta={true}
                />,
              ]}
            />
            {showPopup &&
              createPortal(
                <Popup>
                  <AuthenticationPopup
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                  />
                </Popup>,
                document.getElementById("root"),
              )}
          </>
        )}
      </div>
    );
  }
}
