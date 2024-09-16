import { Outlet, createRootRoute, createRouter, useLocation } from "@tanstack/react-router"
import { IngredientsProvider } from "../pages/Roulette/IngredientsContext"
import { RecipesProvider, useRecipesContext } from "../contexts/RecipesContext"
import { AuthProvider } from "../components/authentication/AuthContext"
import { RecipesFetchProvider } from "../hooks/useRecipesFetch/useRecipesFetch"
import { SnackbarProvider } from "../components/Snackbar/useSnackbar"
import { Header } from "../components/Header/Header"
import { useDiscoverySidebar } from "../hooks/DiscoverySidebar/useDiscoverySidebar"
import { useSideMenu } from "../hooks/SideMenu/useSideMenu"
import { useRecipesResultsSideBar } from "../hooks/RecipesResultsSideBar/useRecipesResultsSideBar"
import { SideMenu } from "../components/SideMenu/SideMenu"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { Snackbar } from "../components/Snackbar/Snackbar"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { ImageProvider } from "../contexts/imagesContext/ImageContext"

export const Route = createRootRoute({
    component: () => {
        const { setPreferencesSidebar, preferencesSidebar } = useDiscoverySidebar()
        const { handleMenuToggle, setMenuState, path, menuState } = useSideMenu()
        const { setFiltersSidebar, filtersSidebar } = useRecipesResultsSideBar()
        const headerActions = { handleMenuToggle, setPreferencesSidebar, setFiltersSidebar }
        const { pathname } = useLocation()

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
                                                handleRecipesSidebarToggle={setFiltersSidebar}
                                                setPreferencesSidebar={setPreferencesSidebar}
                                                handleMenuToggle={handleMenuToggle}
                                            />
                                            <Outlet />
                                            <Snackbar />
                                        </div>
                                        {pathname === "/settings/food-preferences" ? null : (
                                            <>
                                                {pathname === "/roulette" && (
                                                    <Sidebar
                                                        showBlacklist={true}
                                                        filtersName="recipePreferences"
                                                        sidebarState={preferencesSidebar}
                                                        setSidebarState={setPreferencesSidebar}
                                                    />
                                                )}

                                                {(pathname === "/favorited" || pathname === "/history") && (
                                                    <Sidebar
                                                        filtersName="recipeFilters"
                                                        sidebarState={filtersSidebar}
                                                        setSidebarState={setFiltersSidebar}
                                                    />
                                                )}
                                            </>
                                        )}
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
