import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import AgoraRTC from "agora-rtc-sdk-ng"
import { AgoraRTCProvider } from "agora-rtc-react"
import { AppProvider } from "./contexts/AppContext"
import { AppRouter } from "./routes/AppRouter"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SocketProvider } from "./contexts/SocketContext"
import { StrictMode } from "react"
import { UIProvider } from "./contexts/UIContext"
import { createRoot } from "react-dom/client"
;

(function () {
    const originalSetItem = localStorage.setItem
    const originalRemoveItem = localStorage.removeItem

    // Custom event for local storage changes
    const localStorageChangeEvent = new Event("localStorageChange")

    // Override setItem
    localStorage.setItem = function (key: string, value: string) {
        originalSetItem.apply(this, [key, value])
        window.dispatchEvent(localStorageChangeEvent)
    }

    // Override removeItem
    localStorage.removeItem = function (key: string) {
        originalRemoveItem.apply(this, [key])
        window.dispatchEvent(localStorageChangeEvent)
    }
})()
const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AgoraRTCProvider
            // @ts-ignore
            client={agoraClient}
        >
            <QueryClientProvider client={queryClient}>
                <UIProvider>
                    <AppProvider>
                        <SocketProvider>
                            <AppRouter />
                        </SocketProvider>
                    </AppProvider>
                </UIProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AgoraRTCProvider>
    </StrictMode>
)
