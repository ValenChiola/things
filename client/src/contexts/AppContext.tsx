import { PropsWithChildren, createContext, useContext, useState } from "react"

import { SplitProps } from "../components/SplitPane"

const AppContext = createContext({} as AppContextValues)
AppContext.displayName = "AppContext"

export const AppProvider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState({
        isFullScreen: false,
        split: "vertical" as SplitProps["split"],
    })

    const toggleFullScreen = () => {
        if (state.isFullScreen) document.exitFullscreen()
        else document.querySelector("#root")?.requestFullscreen()

        setState((old) => ({
            ...old,
            isFullScreen: !old.isFullScreen,
        }))
    }

    const toggleSplit = () =>
        setState((old) => ({
            ...old,
            split: old.split === "vertical" ? "horizontal" : "vertical",
        }))

    return (
        <AppContext.Provider
            value={{
                ...state,
                toggleFullScreen,
                toggleSplit,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
    const context = useContext(AppContext)

    if (!context) throw new Error("useApp must use within AppProvider")

    return context
}

type AppContextValues = {
    isFullScreen: boolean
    toggleFullScreen: () => void
    split: SplitProps["split"]
    toggleSplit: () => void
}
