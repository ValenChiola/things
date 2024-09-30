import {
    refreshTokenCookieName,
    setRefreshTokenCookie,
} from "../../../domain/services/auth/auth.set.refresh.cookie.service"

import { createController } from "../../../infrastructure/createController"
import { getUserToken } from "../../../domain/services/auth/auth.get.user.token.service"
import { log } from "../../../infrastructure/logger"
import { sendError } from "../../../domain/error"

export const authenticateError = {
    message: "Error getting required user data for authentication",
    code: 403,
}

export default createController(null, async ({ jwt, cookies }, reply) => {
    try {
        const cookieToken = cookies[refreshTokenCookieName]
        if (!cookieToken) return authenticateError

        const decoded = jwt.decode<RefreshTokenPayload>(cookieToken)
        if (!decoded || !decoded.sub) return authenticateError

        const { sub, exp } = decoded

        const now = Date.now()
        const isExpired = exp * 1000 <= now
        if (isExpired) return authenticateError

        const token = await getUserToken(sub)
        await setRefreshTokenCookie(sub, reply)

        return { token }
    } catch (error) {
        log.error(error)
        sendError(authenticateError.message, authenticateError.code)
        return {}
    }
})

interface RefreshTokenPayload {
    sub: string
    iat: number
    exp: number
}
