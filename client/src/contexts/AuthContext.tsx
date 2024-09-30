import { PropsWithChildren, createContext, useContext } from "react"

const AuthContext = createContext({} as AuthContextValues)
AuthContext.displayName = "AuthContext"

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const login = async (data: LoginData) => {
        console.log("login", data)
    }

    return (
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) throw new Error("useAuth must use within AuthProvider")

    return context
}

type AuthContextValues = {
    login: (props: { email: string; password: string }) => Promise<void>
}

export type LoginData = {
    email: string
    password: string
}
