import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

export const useToken = () => {
    const navigate = useNavigate()
    let payload = {} as TokenPayload
    const token = localStorage.getItem("token")

    try {
        if (token) payload = jwtDecode(token)
    } catch (error) {
        navigate("/login")
    }

    return {
        token,
        ...payload,
    }
}

interface TokenPayload {
    sub: string
    role: string
    iat: number
    exp: number
}
