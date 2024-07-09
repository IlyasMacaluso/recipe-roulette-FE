import { useState } from "react"

export function useSideMenu() {
    const [menuState, setMenuState] = useState(false)
    console.log(menuState);
    function handleMenuToggle() {
        if (menuState) {
            setTimeout(() => {
                setMenuState((b) => !b)
            }, 50)
        } else {
            setMenuState((b) => !b)
        }
    }

    return { handleMenuToggle, menuState }
}
