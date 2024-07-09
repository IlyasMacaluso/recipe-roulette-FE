import { Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { IngredientsProvider } from "../pages/Roulette/IngredientsContext";
import { RecipesProvider } from "../contexts/RecipesContext";
import { AuthProvider } from "../components/authentication/AuthContext";
import { RecipesFetchProvider } from "../hooks/useRecipesFetch/useRecipesFetch";
import { SnackbarProvider } from "../components/Snackbar/useSnackbar";
import { Header } from "../components/Header/Header";
import { SideMenu } from "../components/SideMenu/SideMenu";
import { SideBarRecipes } from "../components/Sidebar/SideBarRecipes";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useDiscoverySidebar } from "../hooks/DiscoverySidebar/useDiscoverySidebar";
import { useSideMenu } from "../hooks/SideMenu/useSideMenu";
import { useRecipesResultsSideBar } from "../hooks/RecipesResultsSideBar/useRecipesResultsSideBar";
import { Snackbar } from "../components/Snackbar/Snackbar";

export const Route = createRootRoute({
    component: () => {
        const { handleSidebarToggle, sidebarState } = useDiscoverySidebar();
        const { handleMenuToggle, path, menuState } = useSideMenu();
        const { toggleSidebarRecipes, sideBarState } = useRecipesResultsSideBar();

        return (
            <>
                <AuthProvider>
                    <RecipesProvider>
                        <IngredientsProvider>
                            <RecipesFetchProvider>
                                <SnackbarProvider>
                                    <SideMenu handleMenuToggle={handleMenuToggle} menuState={menuState} path={path} />
                                    <SideBarRecipes state={sideBarState} toggleSidebarRecipes={toggleSidebarRecipes} />
                                    <Sidebar sidebarState={sidebarState} handleSidebarToggle={handleSidebarToggle} />

                                    <Header
                                        handleRecipesSidebarToggle={toggleSidebarRecipes}
                                        handleSidebarToggle={handleSidebarToggle}
                                        handleMenuToggle={handleMenuToggle}
                                    />

                                    <Outlet />
                                    <Snackbar />
                                    <TanStackRouterDevtools />
                                </SnackbarProvider>
                            </RecipesFetchProvider>
                        </IngredientsProvider>
                    </RecipesProvider>
                </AuthProvider>
            </>
        );
    },
});
