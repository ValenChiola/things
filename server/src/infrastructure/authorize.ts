import { ContextConfig } from "./plugins/auth.plugin"

export const roles = ["admin", "user", "public"] as const

export type Roles = typeof roles

export type Role = Roles[number]

export type AuthorizationRequest = {
    sub: string
    role: Role
    iat: number
    exp: number
}

/**
 * @param roles: An array from authorized roles in this route
 */
export const authorize = (config: ContextConfig) => ({
    config,
})
