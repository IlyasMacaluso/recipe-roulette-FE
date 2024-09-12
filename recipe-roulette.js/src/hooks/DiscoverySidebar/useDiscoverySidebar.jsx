import { useState } from "react"

export function useDiscoverySidebar() {
    const [preferencesSidebar, setsidebarState] = useState(false)

    function setPreferencesSidebar() {
        setsidebarState((b) => !b)
    }

    return {
        preferencesSidebar,
        setPreferencesSidebar,
    }
}
