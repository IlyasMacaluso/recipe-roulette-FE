import { createFileRoute } from "@tanstack/react-router"
import { Recipe } from "../pages/Recipe/Recipe"

export const Route = createFileRoute("/recipe")({
    component: () => <Recipe />
})
