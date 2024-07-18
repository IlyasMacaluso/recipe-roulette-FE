import { useState } from "react"

export function useDiscoverySidebar() {
    const [sidebarState, setsidebarState] = useState(false)

    function handleSidebarToggle() {
        setsidebarState((b) => !b)
    }

    return {
        sidebarState,
        handleSidebarToggle,
    }
}
