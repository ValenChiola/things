import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AppProvider } from "./contexts/AppContext"
import { AppRouter } from "./routes/AppRouter"
import { StrictMode } from "react"
import { UIProvider } from "./contexts/UIContext"
import { createRoot } from "react-dom/client"

const queryClient = new QueryClient()


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <UIProvider>
                <AppProvider>
                    <AppRouter />
                </AppProvider>
            </UIProvider>
        </QueryClientProvider>
    </StrictMode>,
)
