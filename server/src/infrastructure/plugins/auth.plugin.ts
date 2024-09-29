import { AuthorizationRequest, Role, Roles, roles } from "../authorize"

import { config } from "dotenv"
import { createPlugin } from "./plugin"
import fastifyJwt from "@fastify/jwt"
import { sendError } from "../../domain/error"

config()

const { JWT_SECRET } = process.env

const messages = {
    badRequestErrorMessage: "The format is `Authorization: Bearer [token]`",
    badCookieRequestErrorMessage: "Cookie could not be parsed in request",
    noAuthorizationInHeaderMessage:
        "No Authorization was found in request.headers",
    noAuthorizationInCookieMessage:
        "No Authorization was found in request.cookies",
    authorizationTokenExpiredMessage: "Authorization token expired",
    authorizationTokenUntrusted: "Untrusted authorization token",
    authorizationTokenUnsigned: "Unsigned authorization token",
    authorizationTokenInvalid: ({ message }: { message: string }) =>
        `Authorization token is invalid: ${message}`,
    userNotAuthorized: "The user is not authorized to make the request",
}

const authPlugin = createPlugin(
    async (instance) => {
        instance.register(fastifyJwt, {
            secret: JWT_SECRET,
            messages,
        })

        instance.addHook("preHandler", async (request, reply) => {
            const {
                log,
                headers: { authorization },
                routeOptions,
            } = request
            const { minRole = "public" } = routeOptions.config ?? {}

            request.jwt = { ...request.jwt, decode: instance.jwt.decode } // Add JWT decoder function to request

            try {
                if (minRole === "public") return

                if (!authorization)
                    return sendError(messages.userNotAuthorized, 401)

                const payload = await request.jwtVerify<AuthorizationRequest>()

                request.jwt = { ...request.jwt, payload }
                const userRole = payload?.role

                if (roles.indexOf(userRole) > roles.indexOf(minRole))
                    return sendError(messages.userNotAuthorized, 401)
            } catch (error: any) {
                reply.code(401).send({
                    message: error.message ?? messages.userNotAuthorized,
                    code: 401,
                    success: false,
                    data: null,
                })

                log.error(
                    `Error on auth.plugin ${JSON.stringify({
                        error,
                        minRole,
                        authorization,
                    })}`
                )
            }
        })
    },
    { name: "auth-plugin" }
)

declare module "fastify" {
    export interface FastifyContextConfig extends ContextConfig {}

    export interface FastifyRequest {
        apiKey?: string
        jwt: {
            payload: AuthorizationRequest
            decode: FastifyInstance["jwt"]["decode"]
        }
    }
}

export type ContextConfig = {
    minRole: Role
}

export default authPlugin
