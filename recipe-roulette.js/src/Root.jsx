import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from "./App"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Disabilita il refetch su focus globale
        },
    },
})

export function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
}
