import { jwtDecode } from "jwt-decode"
import { setNewToken } from "../api/api"
import { useNavigate } from "react-router-dom"

export const useToken = () => {
    const navigate = useNavigate()
    let payload = {} as TokenPayload
    const token = localStorage.getItem("token")

    try {
        if (token) {
            payload = jwtDecode(token)
            setNewToken(token)
        }
    } catch (error) {
        navigate("/login")
    }

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
