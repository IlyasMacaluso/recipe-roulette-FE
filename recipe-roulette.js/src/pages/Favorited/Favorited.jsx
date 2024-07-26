<<<<<<< HEAD
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useAnimate } from "../../hooks/animatePages/useAnimate";
import { useRecipesContext } from "../../contexts/RecipesContext";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/Auth/useAuth";
import { Popup } from "../../components/Pop-up/Popup";
import { createPortal } from "react-dom";
import { Login } from "../../components/authentication/login/Login";
import { useLocationHook } from "../../hooks/useLocationHook";

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import LoginIcon from "@mui/icons-material/Login";

import classes from "./Favorite.module.scss";
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup";
import { Signup } from "../../components/authentication/signup/Signup";


export function Favorited() {
  const { setRecipes, recipes, inputValue } = useRecipesContext();
  const { isAuthenticated } = useAuth();
  const [showPopup, setShowPopup] = useState();
  const { changeToSignup, setChangeToSignup } = useLoginToSignup()
  const { location } = useLocationHook();
  const { animate } = useAnimate(location);
=======
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useMemo, useState } from "react"
import { useAuth } from "../../hooks/Auth/useAuth"
import { Popup } from "../../components/Pop-up/Popup"
import { createPortal } from "react-dom"
import { Login } from "../../components/authentication/login/Login"
import { useLocationHook } from "../../hooks/useLocationHook"
import { Button } from "../../components/Buttons/Button/Button"
import { Skeleton } from "@mui/material"
import { Placeholder } from "../../components/Placeholder/Placeholder"

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined"
import LoginIcon from "@mui/icons-material/Login"
import classes from "./Favorite.module.scss"

export function Favorited() {
    const { recipes, inputValue, handleDeselectRecipeFilters, setInputValue, favoritedLoading, historyLoading, foodPrefLoading } =
        useRecipesContext()
    const { isAuthenticated } = useAuth()
    const [showPopup, setShowPopup] = useState()
>>>>>>> 2e0e9382559818376710367e466d87ebf1e74301

  const searchFavorites = useMemo(() => {
    return recipes.filtered.filter((recipe) =>
      recipe.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, recipes.filtered, recipes.favorited]);

  return (
    <div
      className={`${classes.favoritePage} ${
        animate && classes.animateFavorite
      }`}
    >
      {isAuthenticated && recipes.favorited.length > 0 ? (
        <>
          {searchFavorites && searchFavorites.length > 0 ? (
            <section className={classes.recipesWrapper}>
              {searchFavorites.map((recipe) => {
                return <RecipeCard recipe={recipe} key={recipe.id} />;
              })}
            </section>
          ) : (
            <div
              className={`${classes.placeholder} ${classes.placeholderSearch}`}
            >
              <h2>
                There is <span>no recipe</span> <br />
                matching your search!
              </h2>
              <div className={classes.placeholderImage}>
                <img
                  src="../src/assets/images/undraw_cancel_re_pkdm 1.svg"
                  alt=""
                />
              </div>
            </div>
          )}
        </>
      ) : isAuthenticated ? (
        <div className={classes.placeholder}>
          <div className={classes.placeholderImage}>
            <img
              src="../src/assets/images/undraw_add_files_re_v09.svg"
              alt=""
            />
          </div>
          <h2>
            <span>Your Favorited list is empty!</span> <br />
            Find and favorite your first recipe!
          </h2>

<<<<<<< HEAD
          <Link className={classes.cta} to={"/discovery"}>
            <LoopOutlinedIcon />
            <p>Start Ingredients Shuffle</p>
          </Link>
=======
    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            {favoritedLoading || foodPrefLoading || historyLoading ? (
                [...Array(3)].map(() => (
                    <Skeleton key={Math.random()} sx={{ bgcolor: "#c5e4c9" }} variant="rounded" width={"100%"} height={"280px"} />
                ))
            ) : isAuthenticated && recipes?.favorited.length > 0 ? (
                <>
                    {searchFavorites && searchFavorites.length > 0 ? (
                        <section className={classes.recipesWrapper}>
                            {searchFavorites.map((recipe) => (
                                <RecipeCard recipe={recipe} key={recipe.id + recipe.title} />
                            ))}
                        </section>
                    ) : (
                        <Placeholder
                            bottomImage={"searching.svg"}
                            text="Your search has  "
                            hightlitedText="no matching results"
                            highlightColor="#dd3e46"
                            spacious={true}
                            buttons={[
                                <Button
                                    icon={<RotateLeftOutlinedIcon fontSize="small"/>}
                                    height={"large"}
                                    label="Reset Filters"
                                    action={() => {
                                        setInputValue("")
                                        handleDeselectRecipeFilters()
                                    }}
                                />,
                            ]}
                        />
                    )}
                </>
            ) : isAuthenticated ? (
                <Placeholder
                    topImage={"undraw_add_files_re_v09.svg"}
                    text="Your Favorited list is empty!  "
                    hightlitedText="Favorite your first recipe!"
                    buttons={[
                        <Button
                            icon={<LoopOutlinedIcon fontSize="small" />}
                            height="large"
                            style="primary"
                            label="Start Ingredients Shuffle"
                            link={"/roulette"}
                        />,
                    ]}
                />
            ) : (
                <>
                    <Placeholder
                        topImage={"undraw_access_account_re_8spm.svg"}
                        text="Your Favorited list is empty,  "
                        hightlitedText="Favorite your first recipe!"
                        spacious={true}
                        buttons={[
                            <Button
                                icon={<LoginIcon fontSize="small" />}
                                style="primary"
                                height="large"
                                label="Login or Signup"
                                action={() => setShowPopup(true)}
                            />,
                        ]}
                    />
                    {showPopup &&
                        createPortal(
                            <Popup>
                                <Login setShowPopup={setShowPopup} />
                            </Popup>,
                            document.getElementById("popup-root")
                        )}
                </>
            )}
>>>>>>> 2e0e9382559818376710367e466d87ebf1e74301
        </div>
      ) : (
        <div className={classes.placeholder}>
          <div className={classes.placeholderImage}>
            <img
              src="../src/assets/images/undraw_access_account_re_8spm.svg"
              alt=""
            />
          </div>
          <h2>
            <span>You need to login</span> <br />
            To add or see your Favorited!
          </h2>
          {showPopup &&
            createPortal(
              <Popup handleClosePopup={() => setShowPopup(false)}>
                {!changeToSignup ? (
                  <Login
                    setChangeToSignup={setChangeToSignup}
                    setShowPopup={setShowPopup}
                  />
                ) : (
                  <Signup
                    setChangeToSignup={setChangeToSignup}
                    setShowPopup={setShowPopup}
                  />
                )}
              </Popup>,
              document.getElementById("popup-root")
            )}
          <Link className={classes.cta} onClick={() => setShowPopup(true)}>
            <LoginIcon fontSize="small" />
            <p>Signup or Login</p>
          </Link>
        </div>
      )}
    </div>
  );
}
