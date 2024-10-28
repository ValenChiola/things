import { useEffect, useState } from "react"

import { jwtDecode } from "jwt-decode"
import { setNewToken } from "../api/api"

export const useToken = () => {
    let payload = {} as TokenPayload
    const [token, setToken] = useState(() => localStorage.getItem("token"))

    useEffect(() => {
        try {
            if (token) {
                payload = jwtDecode(token)
                setNewToken(token)
            }
        } catch (error) {
            window.location.href = "/login"
        }
    }, [token])

    // Listen for changes in localStorage
    useEffect(() => {
        const onChange = () => setToken(localStorage.getItem("token"))
        window.addEventListener("localStorageChange", onChange)
        return () => window.removeEventListener("localStorageChange", onChange)
    }, [])

    const expiresAt = payload.exp * 1000
    const now = Date.now()
    const isExpired = now > expiresAt

    return {
        token,
        isExpired,
        ...payload,
    }
}

interface TokenPayload {
    sub: string
    role: string
    iat: number
    exp: number
}
