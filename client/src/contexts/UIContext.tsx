import { PropsWithChildren, createContext, useContext } from "react"
import { ToastOptions, Toaster, toast } from "react-hot-toast"

const UIContext = createContext({} as UIContextValues)
UIContext.displayName = "UIContext"

export const UIProvider = ({ children }: PropsWithChildren) => {
    const showToast = toast

    const showError = (error: string, options?: ToastOptions) =>
        toast.error(error, options)

    return (
        <UIContext.Provider
            value={{
                showToast,
                showError,
            }}
        >
            <Toaster
                toastOptions={{
                    style: {
                        maxWidth: "max-content",
                    },
                }}
            />
            {children}
        </UIContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => {
    const context = useContext(UIContext)

    if (!context) throw new Error("useUI must use within UIProvider")

    return context
}

type UIContextValues = {
    showToast: typeof toast
    showError: (error: string, options?: ToastOptions) => string
}
