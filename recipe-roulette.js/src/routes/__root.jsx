import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router"
import { IngredientsProvider } from "../pages/Roulette/IngredientsContext"
import { RecipesProvider } from "../contexts/RecipesContext"
import { AuthProvider } from "../components/authentication/AuthContext"
import { RecipesFetchProvider } from "../hooks/useRecipesFetch/useRecipesFetch"
import { SnackbarProvider } from "../components/Snackbar/useSnackbar"
import { SideMenu } from "../components/SideMenu/SideMenu"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { Snackbar } from "../components/Snackbar/Snackbar"
import { SidebarProvider, } from "../contexts/SidebarProvider/SidebarProvider"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { ImageProvider } from "../contexts/imagesContext/ImageContext"

export const Route = createRootRoute({
    component: () => {
        const { pathname } = useLocation()

        return (
            <div className="appContainer">
                <AuthProvider>
                    <RecipesProvider>
                        <IngredientsProvider>
                            <RecipesFetchProvider>
                                <SnackbarProvider>
                                    <ImageProvider>
                                        <SidebarProvider>
                                            <SideMenu />

                                            <div className="centerContent">
                                                <Outlet />
                                                <Snackbar />
                                            </div>

                                            {pathname === "/settings/food-preferences" ? null : (
                                                <>
                                                    {pathname === "/roulette" && (
                                                        <Sidebar
                                                            showBlacklist={true}
                                                            filtersName="recipePreferences"
                                                        />
                                                    )}

                                                    {(pathname === "/favorited" || pathname === "/history") && (
                                                        <Sidebar
                                                            filtersName="recipeFilters"
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </SidebarProvider>
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
