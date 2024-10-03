import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { NotFound404 } from "./pages/NotFound404/NotFound404"

const router = createRouter({ routeTree,
    defaultNotFoundComponent: () => <NotFound404 /> })

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
//comment
export default App
