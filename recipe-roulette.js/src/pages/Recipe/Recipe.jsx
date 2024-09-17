import { RecipeCard } from "../../components/RecipeCard/RecipeCard"

import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import layout from "../../assets/scss/pageLayout/pageFH.module.scss"

import transition from "../../assets/scss/pageLayout/pageTransition.module.scss"
import { Header } from "../../components/Header/Header"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage"
import { useNavigate } from "@tanstack/react-router"

export function Recipe() {
    const { recipes } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()
    const { location } = useLocationHook()
    const { animate } = useAnimate(location)
    const { getValue } = useLocalStorage()

    const navigate = useNavigate()

    return (
        <div className={`${layout.pageFH} ${layout.noVerticalPadding} ${animate ? transition.animationEnd : transition.animationStart}`}>
            {recipes.targetedRecipe && (
                <>
                    <Header
                        pageTitle={recipes?.targetedRecipe?.title || "Recipe"}
                        leftIcons={[
                            {
                                icon: <ArrowBackIcon fontSize="small" />,
                                iconFn: () => {
                                    try {
                                        const prevPath = localStorage.getItem("prevPath")
                                        navigate({ to: prevPath ? prevPath : "/" })
                                    } catch (error) {
                                        console.log(error)
                                    }

                                },
                            },
                        ]}
                    />
                    <RecipeCard isExpanded={true} handleClickLoginSnackBar={handleClickLoginSnackBar} recipe={recipes.targetedRecipe} />
                </>
            )}
        </div>
    )
}
