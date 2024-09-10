import { Outlet, createRootRoute, createRouter } from "@tanstack/react-router"
import { IngredientsProvider } from "../pages/Roulette/IngredientsContext"
import { RecipesProvider } from "../contexts/RecipesContext"
import { AuthProvider } from "../components/authentication/AuthContext"
import { RecipesFetchProvider } from "../hooks/useRecipesFetch/useRecipesFetch"
import { SnackbarProvider } from "../components/Snackbar/useSnackbar"
import { Header } from "../components/Header/Header"
import { useDiscoverySidebar } from "../hooks/DiscoverySidebar/useDiscoverySidebar"
import { useSideMenu } from "../hooks/SideMenu/useSideMenu"
import { useRecipesResultsSideBar } from "../hooks/RecipesResultsSideBar/useRecipesResultsSideBar"
import { SideMenu } from "../components/SideMenu/SideMenu"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { SideBarRecipes } from "../components/Sidebar/SideBarRecipes"
import { Snackbar } from "../components/Snackbar/Snackbar"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { ImageProvider } from "../contexts/imagesContext/ImageContext"

export const Route = createRootRoute({
    component: () => {
        const { handleSidebarToggle, sidebarState } = useDiscoverySidebar()
        const { handleMenuToggle, setMenuState, path, menuState } = useSideMenu()
        const { toggleSidebarRecipes, sideBarState } = useRecipesResultsSideBar()
        const headerActions = { handleMenuToggle, handleSidebarToggle, toggleSidebarRecipes }

        return (
            <div className="appContainer">
                <AuthProvider>
                    <RecipesProvider>
                        <IngredientsProvider>
                            <RecipesFetchProvider>
                                <SnackbarProvider>
                                        <ImageProvider>
                                            <SideMenu handleMenuToggle={setMenuState} menuState={menuState} path={path} />
                                            <div className="centerContent">
                                                <Header
                                                    handleRecipesSidebarToggle={toggleSidebarRecipes}
                                                    handleSidebarToggle={handleSidebarToggle}
                                                    handleMenuToggle={handleMenuToggle}
                                                />
                                                <Outlet />
                                                <Snackbar />
                                            </div>
                                            <SideBarRecipes state={sideBarState} toggleSidebarRecipes={toggleSidebarRecipes} />
                                            <Sidebar sidebarState={sidebarState} handleSidebarToggle={handleSidebarToggle} />
                                        </ImageProvider>
                                        <>
                                            {/* <TanStackRouterDevtools />
                                            <ReactQueryDevtools /> */}
                                        </>
                                </SnackbarProvider>
                            </RecipesFetchProvider>
                        </IngredientsProvider>
                    </RecipesProvider>
                </AuthProvider>
            </div>
        )
    },
})
