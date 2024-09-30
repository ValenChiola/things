import {
    refreshTokenCookieName,
    refreshTokenCookieOptions,
} from "../../../domain/services/auth/auth.set.refresh.cookie.service"

import { createController } from "../../../infrastructure/createController"
import { sendError } from "../../../domain/error"

export default createController(null, async ({ log }, reply) => {
    try {
        reply.clearCookie(refreshTokenCookieName, refreshTokenCookieOptions)

        return {
            message: "Successfully logged out",
        }
    } catch (error) {
        log.error(error)
        sendError("Error logging out", 500)
        return {}
    }
})
