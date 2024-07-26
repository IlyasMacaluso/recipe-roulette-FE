import { createFileRoute } from "@tanstack/react-router"
import { RecipeResults } from "../pages/RecipesResults/RecipesResults"

export const Route = createFileRoute("/recipe-results")({
    component: () => <RecipeResults />,
})
