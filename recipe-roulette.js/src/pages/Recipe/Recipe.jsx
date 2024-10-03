import { RecipeCard } from "../../components/RecipeCard/RecipeCard"

import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useRecipesContext } from "../../contexts/RecipesContext"

import layout from "./Recipe.module.scss"

import { Header } from "../../components/Header/Header"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate } from "@tanstack/react-router"
import { Skeleton } from "@mui/material"
import { useMemo } from "react"

export function Recipe() {
    const { recipes, favoritedLoading, foodPrefLoading, historyLoading } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()
    const navigate = useNavigate()

    const skeletonStyle = useMemo(()=> {
        return { bgcolor: "#f8fff8", border: "1px solid #d9e9dc", borderRadius: "16px" }
    },[])
    
    return (
        <div className={layout.recipePage}>
            {favoritedLoading || historyLoading || foodPrefLoading ? (
                <div className={layout.skeletonWrapper}>
                    <Skeleton key={Math.random()} sx={ skeletonStyle} variant="rounded" width={"100%"} height={"48px"} />
                    <Skeleton key={Math.random()} sx={skeletonStyle} variant="rounded" width={"100%"} height={"20vw"} />
                    <Skeleton key={Math.random()} sx={skeletonStyle} variant="rounded" width={"100%"} height={"100%"} />
                </div>
            ) : (
                recipes.targetedRecipe && (
                    <>
                        <Header
                            pageTitle={recipes?.targetedRecipe?.title || "Recipe"}
                            itemsLeft={[
                                {
                                    item: <ArrowBackIcon fontSize="small" />,
                                    itemFn: () => {
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
                )
            )}
        </div>
    )
}
