import { PropsWithChildren, createContext, useContext, useState } from "react"

const AppContext = createContext({} as AppContextValues)
AppContext.displayName = "AppContext"

export const AppProvider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState({
        isFullScreen: false,
    })

    const toggleFullScreen = () => {
        if (state.isFullScreen) document.exitFullscreen()
        else document.querySelector("#root")?.requestFullscreen()

        setState((old) => ({
            ...old,
            isFullScreen: !old.isFullScreen,
        }))
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                toggleFullScreen,
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
}
