import { createFileRoute } from "@tanstack/react-router"
import { Roulette } from "../pages/Roulette/Roulette"

export const Route = createFileRoute("/roulette")({
    component: () => <Roulette />
})
