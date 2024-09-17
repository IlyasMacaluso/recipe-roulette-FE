import React, { createContext, useContext, useState } from "react"

// Crea il contesto per la sidebar
const SidebarContext = createContext()

// Crea un provider per il contesto della sidebar
export const SidebarProvider = ({ children }) => {
    const [navSidebar, setNavSidebar] = useState(false)
    const [filterSidebar, setFilterSidebar] = useState(false)
    const [prefSidebar, setPrefSidebar] = useState(false)

    return (
        <SidebarContext.Provider
            value={{
                navSidebar,
                setNavSidebar,
                filterSidebar,
                setFilterSidebar,
                prefSidebar,
                setPrefSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}

// Hook per utilizzare il contesto della sidebar
export const useSidebar = () => {
    return useContext(SidebarContext)
}
