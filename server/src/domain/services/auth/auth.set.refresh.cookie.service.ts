import { CookieSerializeOptions } from "@fastify/cookie"
import DayJs from "../../../helpers/DayJS"
import { FastifyReply } from "fastify"
import { log } from "../../../infrastructure/logger"
import { signPayload } from "./auth.sign.payload.service"

const { JWT_REFRESH_TOKEN_EXP = "3d" } = process.env
const [_, ...rest] = JWT_REFRESH_TOKEN_EXP.match(/^(\d+)([a-zA-Z]+)$/) || [
    0,
    0,
    "",
]
export const refreshTokenData = rest as [number, DayJs.ManipulateType]
export const refreshTokenCookieName = "refresh_token"
export const refreshTokenCookieOptions: CookieSerializeOptions = {
    path: "/",
    expires: DayJs()
        .add(...refreshTokenData)
        .toDate(),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
}

export const setRefreshTokenCookie = async (
    sub: string,
    reply: FastifyReply
) => {
    try {
        const refreshToken = signPayload(
            { sub },
            { expiresIn: JWT_REFRESH_TOKEN_EXP }
        )

        reply.setCookie(
            refreshTokenCookieName,
            refreshToken,
            refreshTokenCookieOptions
        )
    } catch (error) {
        log.error(error)
    }
}
