import { createFileRoute } from "@tanstack/react-router"
import { FoodPreferences } from "../../../pages/Settings/FoodPreferences/FoodPreferences"

export const Route = createFileRoute("/(settings)/(foodPreferences)/settings/food-preferences")({
    component: () => <FoodPreferences />,
})
