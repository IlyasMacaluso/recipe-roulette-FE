import { createFileRoute } from "@tanstack/react-router"
import { VerifyEmailPage } from "../pages/VerifyEmailPage/VerifyEmailPage"

export const Route = createFileRoute("/verify-email")({
    component: () => <VerifyEmailPage />,
})
