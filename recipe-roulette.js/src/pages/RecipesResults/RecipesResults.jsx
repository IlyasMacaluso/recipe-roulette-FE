import { useRecipesContext } from "../../contexts/RecipesContext";
import { useSnackbar } from "../../components/Snackbar/useSnackbar";
import { useRecipesFetch } from "../../hooks/useRecipesFetch/useRecipesFetch";

import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { BlocksShuffleThree } from "react-svg-spinners";
import { Placeholder } from "../../components/Placeholder/Placeholder";
import { Header } from "../../components/Header/Header";
import { InlineMessage } from "../../components/InlineMessage/InlineMessage";

import loadingImage from "../../assets/images/healthy food-bro.svg";
import layout from "../../assets/scss/pageLayout/pageWScroll.module.scss";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function RecipeResults() {
  const { recipes } = useRecipesContext();
  const { handleClickLoginSnackBar } = useSnackbar();
  const { state } = useRecipesFetch();

  if (state.error) {
    return <InlineMessage error={state.error} />;
  }
  return (
    <div className={layout.scrollPage}>
      <div style={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <Header pageTitle="New Recipes" />
      </div>
      {!state.loading ? (
        <section className={layout.recipesWrapper}>
          {state.error && <InlineMessage error={state.error} />}
          {recipes.results &&
            recipes.results.map((recipe) => {
              return (
                <RecipeCard
                  handleClickLoginSnackBar={handleClickLoginSnackBar}
                  key={`${recipe.id}_${recipe.title}`}
                  recipe={recipe}
                />
              );
            })}
        </section>
      ) : (
        <Placeholder
          topPadding={true}
          bottomPadding={true}
          text="Generating Your Recipes, "
          hightlitedText="This could take a few minutes"
          topImage={loadingImage}
          loadingAnimation={<BlocksShuffleThree color="#449a50" />}
        />
      )}
    </div>
  );
}
