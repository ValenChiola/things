import { PropsWithChildren, createContext, useContext, useState } from "react"

import { SplitProps } from "../components/SplitPane"

const AppContext = createContext({} as AppContextValues)
AppContext.displayName = "AppContext"

export const AppProvider = ({ children }: PropsWithChildren) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const [split, setSplit] = useState<SplitProps["split"]>("vertical")

    const toggleMenuOpen = () => setIsMenuOpen((old) => !old)
    const toggleSplit = () =>
        setSplit((old) => (old === "vertical" ? "horizontal" : "vertical"))

    return (
        <AppContext.Provider
            value={{
                isMenuOpen,
                toggleMenuOpen,
                split,
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
    isMenuOpen: boolean
    toggleMenuOpen: () => void
    split: SplitProps["split"]
    toggleSplit: () => void
}
