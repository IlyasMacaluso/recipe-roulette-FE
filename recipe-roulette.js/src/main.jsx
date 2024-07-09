import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import { Root } from "./Root.jsx"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <Root />
        </RouterProvider>
    </React.StrictMode>
)
