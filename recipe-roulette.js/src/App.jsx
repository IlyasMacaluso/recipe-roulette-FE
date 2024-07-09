import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

function App() {
    return (
        <div className="appContainer">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
