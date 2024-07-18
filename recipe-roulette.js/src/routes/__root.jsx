import { Outlet, createRootRoute, createRouter } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { IngredientsProvider } from "../pages/Roulette/IngredientsContext"
import { RecipesProvider } from "../contexts/RecipesContext"
import { AuthProvider } from "../components/authentication/AuthContext"
import { RecipesFetchProvider } from "../hooks/useRecipesFetch/useRecipesFetch"
import { SnackbarProvider } from "../components/Snackbar/useSnackbar"
import { Header } from "../components/Header/Header"
import { SearchProvider } from "../contexts/InputStateContext"
import { useDiscoverySidebar } from "../hooks/DiscoverySidebar/useDiscoverySidebar"
import { useSideMenu } from "../hooks/SideMenu/useSideMenu"
import { useRecipesResultsSideBar } from "../hooks/RecipesResultsSideBar/useRecipesResultsSideBar"
import { SideMenu } from "../components/SideMenu/SideMenu"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { SideBarRecipes } from "../components/Sidebar/SideBarRecipes"
import { Snackbar } from "../components/Snackbar/Snackbar"

export const Route = createRootRoute({
    component: () => {
        const { handleSidebarToggle, sidebarState } = useDiscoverySidebar()
        const { handleMenuToggle, path, menuState } = useSideMenu()
        const { toggleSidebarRecipes, sideBarState } = useRecipesResultsSideBar()
        
        return (
            <div className="appContainer">
                <AuthProvider>
                    <RecipesProvider>
                        <IngredientsProvider>
                            <RecipesFetchProvider>
                                <SnackbarProvider>
                                    <SearchProvider>
                                        <SideMenu handleMenuToggle={handleMenuToggle} menuState={menuState} path={path} />
                                        <SideBarRecipes state={sideBarState} toggleSidebarRecipes={toggleSidebarRecipes} />
                                        <Sidebar sidebarState={sidebarState} handleSidebarToggle={handleSidebarToggle} />
                                        <Header
                                            handleRecipesSidebarToggle={toggleSidebarRecipes}
                                            handleSidebarToggle={handleSidebarToggle}
                                            handleMenuToggle={handleMenuToggle}
                                        />
                                        <Snackbar />
                                        <Outlet />
                                        <TanStackRouterDevtools />
                                    </SearchProvider>
                                </SnackbarProvider>
                            </RecipesFetchProvider>
                        </IngredientsProvider>
                    </RecipesProvider>
                </AuthProvider>
            </div>
        )
    },
})
