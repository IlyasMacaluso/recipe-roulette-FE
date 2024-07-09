import { createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./components/authentication/AuthContext";
import { RecipesProvider } from "./contexts/RecipesContext";
import { IngredientsProvider } from "./pages/Roulette/IngredientsContext";
import { RecipesFetchProvider } from "./hooks/useRecipesFetch/useRecipesFetch";
import { SnackbarProvider } from "./components/Snackbar/useSnackbar";
import { Header } from "./components/Header/Header";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { SideBarRecipes } from "./components/Sidebar/SideBarRecipes";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Snackbar } from "./components/Snackbar/Snackbar";
import { useDiscoverySidebar } from "./hooks/DiscoverySidebar/useDiscoverySidebar";
import { useSideMenu } from "./hooks/SideMenu/useSideMenu";
import { useRecipesResultsSideBar } from "./hooks/RecipesResultsSideBar/useRecipesResultsSideBar";
import { routeTree } from "./routeTree.gen";
import { Route } from "../src/routes/__root.jsx";

const router = createRouter({ routeTree });

function App() {
    const { handleSidebarToggle, sidebarState } = useDiscoverySidebar();
    const { handleMenuToggle, path, menuState } = useSideMenu();
    const { toggleSidebarRecipes, sideBarState } = useRecipesResultsSideBar();

    return (
        <div className="appContainer">
                <RouterProvider router={router}>
                <Route
                    contextProviders={
                        <AuthProvider>
                            <RecipesProvider>
                                <IngredientsProvider>
                                    <RecipesFetchProvider>
                                        <SnackbarProvider>
                                            <SideMenu
                                                handleMenuToggle={handleMenuToggle}
                                                menuState={menuState}
                                                path={path}
                                            />
                                            <SideBarRecipes
                                                state={sideBarState}
                                                toggleSidebarRecipes={toggleSidebarRecipes}
                                            />
                                            <Sidebar
                                                sidebarState={sidebarState}
                                                handleSidebarToggle={handleSidebarToggle}
                                            />
                                            <Header
                                                handleRecipesSidebarToggle={toggleSidebarRecipes}
                                                handleSidebarToggle={handleSidebarToggle}
                                                handleMenuToggle={handleMenuToggle}
                                            />
                                            <Outlet />
                                            <Snackbar />
                                        </SnackbarProvider>
                                    </RecipesFetchProvider>
                                </IngredientsProvider>
                            </RecipesProvider>
                        </AuthProvider>
                    }
                />
            </RouterProvider>
        </div>
    );
}

export default App;
