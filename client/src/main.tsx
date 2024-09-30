import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AppProvider } from "./contexts/AppContext"
import { AppRouter } from "./routes/AppRouter"
import { AuthProvider } from "./contexts/AuthContext"
import { StrictMode } from "react"
import { UIProvider } from "./contexts/UIContext"
import { createRoot } from "react-dom/client"

const queryClient = new QueryClient()


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <UIProvider>
                <AuthProvider>
                    <AppProvider>
                        <AppRouter />
                    </AppProvider>
                </AuthProvider>
            </UIProvider>
        </QueryClientProvider>
    </StrictMode>,
)
