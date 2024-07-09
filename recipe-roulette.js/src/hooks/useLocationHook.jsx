import { useLocation } from "@tanstack/react-router"

export const useLocationHook = () => {
    const location = useLocation()
    return { location: location.pathname }
}
